import fs from "fs-extra";
import path from "node:path";
import crypto from "node:crypto";

export interface ModFile {
  name: string;
  size: number;
  hash: string;
  lastModified: number;
  chunks?: string[]; // Pour les gros fichiers
}

export interface ServerManifest {
  version: string;
  timestamp: number;
  totalSize: number;
  files: ModFile[];
  deltaSupport: boolean;
}

export class ManifestService {
  private manifestUrl: string;
  private localManifestPath: string;

  constructor(manifestUrl: string, localPath: string) {
    this.manifestUrl = manifestUrl;
    this.localManifestPath = path.join(localPath, "manifest.json");
  }

  /**
   * Télécharge le manifest serveur (très rapide, ~1-5KB)
   */
  async fetchServerManifest(): Promise<ServerManifest | null> {
    try {
      console.log(`🔍 Récupération manifest depuis: ${this.manifestUrl}`);
      const response = await fetch(this.manifestUrl, { 
        signal: AbortSignal.timeout(30000) // 30 secondes timeout
      });
      
      if (!response.ok) {
        console.error(`❌ Erreur HTTP ${response.status}: ${response.statusText} pour ${this.manifestUrl}`);
        return null;
      }
      
      const manifest = await response.json();
      console.log(`✅ Manifest récupéré: ${manifest.files?.length || 0} fichiers`);
      return manifest;
    } catch (error) {
      if (error instanceof Error) {
        console.error(`❌ Erreur fetch manifest (${this.manifestUrl}):`, error.message);
      } else {
        console.error("❌ Erreur fetch manifest:", error);
      }
      return null;
    }
  }

  /**
   * Lit le manifest local s'il existe
   */
  async getLocalManifest(): Promise<ServerManifest | null> {
    try {
      if (await fs.pathExists(this.localManifestPath)) {
        return await fs.readJson(this.localManifestPath);
      }
    } catch (error) {
      console.error("Erreur lecture manifest local:", error);
    }
    return null;
  }

  /**
   * Sauvegarde le manifest local
   */
  async saveLocalManifest(manifest: ServerManifest): Promise<void> {
    await fs.ensureDir(path.dirname(this.localManifestPath));
    await fs.writeJson(this.localManifestPath, manifest, { spaces: 2 });
  }

  /**
   * Compare les manifests et retourne seulement les fichiers à télécharger
   * TRÈS RAPIDE - Compare seulement hash + size + lastModified
   */
  async calculateDelta(localModsPath: string): Promise<{
    toDownload: ModFile[];
    toDelete: string[];
    totalDownloadSize: number;
  }> {
    const serverManifest = await this.fetchServerManifest();
    const localManifest = await this.getLocalManifest();

    if (!serverManifest) {
      throw new Error(
        `Impossible de récupérer le manifest serveur depuis ${this.manifestUrl}. ` +
        `Vérifiez votre connexion Internet et que le serveur est accessible.`
      );
    }

    const toDownload: ModFile[] = [];
    const toDelete: string[] = [];
    let totalDownloadSize = 0;

    // Si pas de manifest local, scanner le dossier local pour vérifier les fichiers existants
    const isFirstRun = !localManifest;
    if (isFirstRun) {
      console.log("🔍 Première utilisation : scan du dossier local...");
    }

    // Fichiers à télécharger (nouveaux ou modifiés)
    for (const serverFile of serverManifest.files) {
      const localFile = localManifest?.files.find(f => f.name === serverFile.name);
      const filePath = path.join(localModsPath, serverFile.name);
      const fileExists = await fs.pathExists(filePath);

      let needsDownload = false;
      let reason = '';

      if (!fileExists) {
        // Fichier n'existe pas localement
        needsDownload = true;
        reason = localFile ? 'fichier manquant' : 'nouveau';
      } else if (!localFile && isFirstRun) {
        // Première utilisation : vérifier le fichier existant
        console.log(`   🔍 Vérification de ${serverFile.name}...`);
        const stats = await fs.stat(filePath);

        // Vérification rapide par taille d'abord
        if (stats.size !== serverFile.size) {
          needsDownload = true;
          reason = 'taille différente';
        } else {
          // Taille OK, vérifier le hash
          const localHash = await this.calculateFileHash(filePath);
          if (localHash !== serverFile.hash) {
            needsDownload = true;
            reason = 'hash différent';
          } else {
            console.log(`   ✅ ${serverFile.name} - déjà à jour`);
          }
        }
      } else if (localFile) {
        // Manifest local existe : comparaison rapide
        const hashMismatch = localFile.hash !== serverFile.hash;
        const dateMismatch = localFile.lastModified !== serverFile.lastModified;

        if (hashMismatch || dateMismatch) {
          needsDownload = true;
          reason = hashMismatch ? 'hash différent' : 'modifié';
        }
      }

      if (needsDownload) {
        console.log(`   📥 ${serverFile.name} - ${reason}`);
        toDownload.push(serverFile);
        totalDownloadSize += serverFile.size;
      }
    }

    // Fichiers à supprimer (fichiers locaux qui ne sont plus sur le serveur)
    if (localManifest) {
      // Cas 1: Manifest local existe - supprimer les fichiers dans l'ancien manifest mais pas dans le nouveau
      for (const localFile of localManifest.files) {
        const stillExists = serverManifest.files.find(f => f.name === localFile.name);
        if (!stillExists) {
          console.log(`   🗑️ ${localFile.name} - supprimé du serveur`);
          toDelete.push(localFile.name);
        }
      }
    } else {
      // Cas 2: Première utilisation - scanner le dossier et supprimer ce qui n'est pas dans le manifest serveur
      try {
        if (await fs.pathExists(localModsPath)) {
          const localFiles = await fs.readdir(localModsPath);
          for (const localFile of localFiles) {
            // Ignorer les fichiers cachés et le manifest local
            if (localFile.startsWith('.') || localFile === 'manifest.json') continue;

            const filePath = path.join(localModsPath, localFile);
            const stats = await fs.stat(filePath);

            // Vérifier seulement les fichiers (pas les dossiers)
            if (stats.isFile()) {
              const inServerManifest = serverManifest.files.find(f => f.name === localFile);
              if (!inServerManifest) {
                console.log(`   🗑️ ${localFile} - fichier orphelin (pas dans le manifest serveur)`);
                toDelete.push(localFile);
              }
            }
          }
        }
      } catch (error) {
        console.error("Erreur lors du scan des fichiers orphelins:", error);
      }
    }

    console.log(`📊 Résultat: ${toDownload.length} à télécharger, ${toDelete.length} à supprimer`);
    return { toDownload, toDelete, totalDownloadSize };
  }

  /**
   * Vérification rapide par sampling (vérifie seulement quelques fichiers)
   * Utile pour un check rapide au démarrage
   */
  async quickIntegrityCheck(localModsPath: string, sampleSize = 5): Promise<boolean> {
    const localManifest = await this.getLocalManifest();
    if (!localManifest) return false;

    // Prendre un échantillon aléatoire
    const sample = localManifest.files
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.min(sampleSize, localManifest.files.length));

    for (const file of sample) {
      const filePath = path.join(localModsPath, file.name);
      if (!await fs.pathExists(filePath)) return false;

      // Vérification rapide par taille d'abord
      const stats = await fs.stat(filePath);
      if (stats.size !== file.size) return false;

      // Si la taille est OK, vérifier le hash (plus coûteux)
      const actualHash = await this.calculateFileHash(filePath);
      if (actualHash !== file.hash) return false;
    }

    return true;
  }

  /**
   * Hash rapide avec streaming pour les gros fichiers
   */
  private async calculateFileHash(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const hash = crypto.createHash('sha256');
      const stream = fs.createReadStream(filePath, { highWaterMark: 1024 * 1024 }); // 1MB chunks pour meilleure perf
      stream.on('data', data => hash.update(data));
      stream.on('end', () => resolve(hash.digest('hex')));
      stream.on('error', reject);
    });
  }
}

/**
 * Utilitaire pour générer le manifest côté serveur
 * À utiliser dans un script Node.js sur votre serveur
 */
export async function generateServerManifest(modsDirectory: string): Promise<ServerManifest> {
  const files: ModFile[] = [];
  const allFiles = await fs.readdir(modsDirectory);

  let totalSize = 0;

  for (const fileName of allFiles) {
    if (fileName.startsWith('.')) continue; // Ignorer fichiers cachés

    const filePath = path.join(modsDirectory, fileName);
    const stats = await fs.stat(filePath);

    if (stats.isFile()) {
      const hash = await calculateFileHashFast(filePath);
      const file: ModFile = {
        name: fileName,
        size: stats.size,
        hash,
        lastModified: stats.mtime.getTime()
      };
      files.push(file);
      totalSize += stats.size;
    }
  }

  return {
    version: "1.0",
    timestamp: Date.now(),
    totalSize,
    files,
    deltaSupport: true
  };
}

async function calculateFileHashFast(filePath: string): Promise<string> {
  const hash = crypto.createHash('sha256');
  const stream = fs.createReadStream(filePath, { highWaterMark: 1024 * 1024 }); // 1MB chunks

  return new Promise((resolve, reject) => {
    stream.on('data', data => hash.update(data));
    stream.on('end', () => resolve(hash.digest('hex')));
    stream.on('error', reject);
  });
}
