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

  let attempt = 0;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      const existingSize = (await fs.pathExists(tempPath))
        ? (await fs.stat(tempPath)).size
        : 0;

      const headers: Record<string, string> = {};
      if (existingSize > 0) {
        headers["Range"] = `bytes=${existingSize}-`;
      }

      const response = await fetch(url, { headers });
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
      
      // Si le fichier partiel existe et qu'on a une erreur SHA, on le supprime pour repartir de zéro
      if (err instanceof Error && err.message.includes("SHA256 mismatch") && await fs.pathExists(tempPath)) {
        console.log(`🔄 Suppression du fichier partiel corrompu pour ${fileName}, nouvelle tentative...`);
        await fs.remove(tempPath);
      }
      
      console.log(`⏳ Retry ${attempt}/${maxRetries} pour ${fileName} dans ${500 * attempt}ms...`);
      // backoff
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
