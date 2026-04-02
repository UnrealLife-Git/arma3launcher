import fs from "fs-extra";
import path from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import crypto from "node:crypto";

export type ProgressInfo = {
  downloadedBytes: number;
  totalBytes: number;
  percent: number;
  fileName?: string;
};

export async function calculateFileSha256(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash("sha256");
    const stream = fs.createReadStream(filePath);
    stream.on("data", (data) => hash.update(data));
    stream.on("end", () => resolve(hash.digest("hex")));
    stream.on("error", reject);
  });
}

export async function downloadFileWithResume(
  url: string,
  destinationPath: string,
  onProgress?: (p: ProgressInfo) => void,
  expectedSha256?: string,
  maxRetries = 3
): Promise<void> {
  const tempPath = `${destinationPath}.partial`;

  await fs.ensureDir(path.dirname(destinationPath));

  // Vérifier si le fichier existe déjà avec le bon hash
  if (expectedSha256 && await fs.pathExists(destinationPath)) {
    try {
      const existingHash = await calculateFileSha256(destinationPath);
      if (existingHash.toLowerCase() === expectedSha256.toLowerCase()) {
        const fileName = path.basename(destinationPath);
        console.log(`✅ ${fileName} déjà à jour, téléchargement ignoré`);
        // Nettoyer le fichier .partial orphelin si il existe
        if (await fs.pathExists(tempPath)) {
          await fs.remove(tempPath);
        }
        return;
      }
    } catch {
      // Erreur de lecture du hash, on continue le téléchargement
    }
  }

  let attempt = 0;
  let forceFullDownload = false; // Flag pour forcer un téléchargement complet
  
  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      const existingSize = (await fs.pathExists(tempPath))
        ? (await fs.stat(tempPath)).size
        : 0;

      const headers: Record<string, string> = {};
      // Ne tenter une reprise que si le fichier partiel existe et qu'on ne force pas un téléchargement complet
      if (existingSize > 0 && !forceFullDownload) {
        headers["Range"] = `bytes=${existingSize}-`;
      }

      // Ajouter un timeout de 60 secondes pour la requête initiale
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000);

      let response: Response;
      try {
        response = await fetch(url, { 
          headers,
          signal: controller.signal 
        });
        clearTimeout(timeoutId);
      } catch (fetchError) {
        clearTimeout(timeoutId);
        if (fetchError instanceof Error && fetchError.name === 'AbortError') {
          throw new Error('Timeout de connexion (60s)');
        }
        throw fetchError;
      }
      
      // Gérer l'erreur 416 Range Not Satisfiable
      if (response.status === 416) {
        const fileName = path.basename(destinationPath);
        console.warn(`⚠️ Erreur 416 pour ${fileName} - Le fichier partiel est invalide, redémarrage...`);
        
        // Supprimer le fichier partiel corrompu
        if (await fs.pathExists(tempPath)) {
          await fs.remove(tempPath);
        }
        
        // Forcer un téléchargement complet au prochain essai
        forceFullDownload = true;
        throw new Error(`HTTP 416 - Fichier partiel invalide`);
      }
      
      if (!response.ok && response.status !== 206) {
        throw new Error(`HTTP ${response.status}`);
      }

      const isPartial = response.status === 206;
      const contentLengthHeader = response.headers.get("content-length") || "0";
      const receivedLength = parseInt(contentLengthHeader, 10) || 0;
      const totalBytes = isPartial ? existingSize + receivedLength : receivedLength;

      const fileHandle = await fs.open(tempPath, isPartial ? "a" : "w");
      try {
        const reader = response.body?.getReader();
        if (!reader) throw new Error("No readable stream from response.body");

        let downloadedBytes = existingSize;
        // eslint-disable-next-line no-constant-condition
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          if (value) {
            await fs.write(fileHandle, Buffer.from(value));
            downloadedBytes += value.length;
            if (onProgress && totalBytes > 0) {
              onProgress({
                downloadedBytes,
                totalBytes,
                percent: Math.max(0, Math.min(100, (downloadedBytes / totalBytes) * 100)),
              });
            }
          }
        }
      } finally {
        // Forcer l'écriture des données sur le disque avant de fermer
        await fs.fsync(fileHandle);
        await fs.close(fileHandle);
      }

      // Vérification d'intégrité si fournie
      if (expectedSha256) {
        const computed = await calculateFileSha256(tempPath);
        if (computed.toLowerCase() !== expectedSha256.toLowerCase()) {
          const fileName = path.basename(destinationPath);
          console.error(`❌ SHA256 mismatch pour ${fileName}`);
          console.error(`   Attendu: ${expectedSha256}`);
          console.error(`   Reçu:    ${computed}`);
          console.error(`   Tentative ${attempt + 1}/${maxRetries}`);
          
          // Mauvais hash, on supprime le fichier partiel et on relance
          await fs.remove(tempPath);
          throw new Error(`SHA256 mismatch: ${fileName} (fichier corrompu, tentative ${attempt + 1}/${maxRetries})`);
        }
      }

      await fs.move(tempPath, destinationPath, { overwrite: true });
      return;
    } catch (err) {
      attempt += 1;
      const fileName = path.basename(destinationPath);
      
      if (attempt >= maxRetries) {
        console.error(`❌ Échec définitif après ${maxRetries} tentatives pour ${fileName}`);
        // Nettoyer les fichiers partiels corrompus
        if (await fs.pathExists(tempPath)) {
          await fs.remove(tempPath);
        }
        throw err;
      }
      
      // Déterminer si on doit supprimer le fichier partiel
      const shouldRemovePartial = 
        (err instanceof Error && err.message.includes("SHA256 mismatch")) ||
        (err instanceof Error && err.message.includes("HTTP 416")) ||
        (err instanceof Error && err.message.includes("HTTP 404")) ||
        (err instanceof Error && err.message.includes("HTTP 500"));
      
      // Si erreur critique, supprimer le fichier partiel pour repartir de zéro
      if (shouldRemovePartial && await fs.pathExists(tempPath)) {
        console.log(`🔄 Suppression du fichier partiel pour ${fileName}, redémarrage complet...`);
        await fs.remove(tempPath);
        forceFullDownload = true;
      }
      
      console.log(`⏳ Retry ${attempt}/${maxRetries} pour ${fileName} dans ${500 * attempt}ms...`);
      // backoff exponentiel
      await delay(500 * attempt);
    }
  }
}

export async function downloadManyFiles(
  files: Array<{ url: string; destinationPath: string; hash?: string; name?: string; size?: number }>,
  onFileProgress?: (file: string, p: ProgressInfo) => void,
  onGlobalProgress?: (p: ProgressInfo) => void,
  concurrency = 2
) {
  let totalBytes = 0;
  let downloadedBytes = 0;

  for (const f of files) {
    if (typeof f.size === "number" && f.size > 0) totalBytes += f.size;
  }

  const queue = [...files];
  const workers: Promise<void>[] = [];

  async function worker() {
    while (queue.length > 0) {
      const file = queue.shift();
      if (!file) break;
      const { url, destinationPath, hash, name } = file;
      await downloadFileWithResume(
        url,
        destinationPath,
        (p) => {
          if (onFileProgress) onFileProgress(name || path.basename(destinationPath), p);
          if (totalBytes > 0) {
            // Approx global progress from known sizes
            downloadedBytes = Math.min(totalBytes, downloadedBytes + (p.downloadedBytes - (p.totalBytes * (p.percent / 100 - 1))));
            if (onGlobalProgress) {
              onGlobalProgress({
                downloadedBytes,
                totalBytes,
                percent: Math.max(0, Math.min(100, (downloadedBytes / totalBytes) * 100)),
              });
            }
          }
        },
        hash
      );
    }
  }

  for (let i = 0; i < concurrency; i++) {
    workers.push(worker());
  }

  await Promise.all(workers);
}
