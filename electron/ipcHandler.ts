import { ipcMain, BrowserWindow, dialog, shell, app } from "electron";
import fs from "fs-extra";
import Store from "electron-store";
import Registry from "winreg";
import path from "node:path";
import os from "node:os";
import { config } from "../src/config/config";
import { spawn } from "child_process";

import { downloadFileWithResume } from "./services/ModDownloadService";
import { ManifestService } from "./services/ManifestService";
import { NewsService } from "./services/NewsService";
import { SteamQueryService } from "./services/SteamQueryService";

// Configuration du store simplifié
const store = new Store({
  name: "userData",
  cwd: "arma3-data",
  fileExtension: "json",
});

// Services modernes
let newsService: NewsService | null = null;
let steamQueryService: SteamQueryService | null = null;

// Fonction pour récupérer le chemin d'Arma 3 depuis le registre Windows
async function getArma3PathFromRegistry(): Promise<string | null> {
  return new Promise((resolve) => {
    const regKey = new Registry({
      hive: Registry.HKLM,
      key: "\\SOFTWARE\\WOW6432Node\\Bohemia Interactive\\Arma 3",
    });
    regKey.get("main", (err, item) => {
      resolve(err || !item ? null : item.value);
    });
  });
}

// Vérifie si le mod Arma 3 est installé
function isModInstalled(arma3Path: string): boolean {
  return fs.existsSync(`${arma3Path}\\${config.mods.folderName}`);
}

// Vérifie si le chemin d'Arma 3 est valide
async function isValidArma3Path(path: string): Promise<boolean> {
  return await fs.pathExists(`${path}\\arma3.exe`);
}



// Envoie un message au processus de rendu
function sendMessage(
  win: BrowserWindow,
  message: string,
  success?: string,
  error?: string,
  data?: string,
  fileProgress?: string,
  timeRemaining?: string
) {
  win?.webContents.send("main-process-message", {
    message,
    success,
    error,
    data,
    fileProgress,
    timeRemaining,
  });
}

// Gestionnaire principal IPC
export function setupIpcHandlers(win: BrowserWindow) {
  // Initialiser Steam Query (SANS MOT DE PASSE)
  steamQueryService = new SteamQueryService();
  console.log(`✅ Steam Query activé pour ${config.servers[0].ip}:${config.servers[0].queryPort}`);

  // Mettre à jour les infos serveur via Steam Query
  setInterval(async () => {
    try {
      const serverInfo = await steamQueryService!.getPublicServerInfo();
      if (serverInfo.isOnline) {
        sendMessage(win, "server-info-update", JSON.stringify({
          playerCount: serverInfo.playerCount,
          maxPlayers: serverInfo.maxPlayers,
          serverName: serverInfo.serverName,
          map: serverInfo.map,
          gameMode: serverInfo.gameMode,
          ping: serverInfo.ping,
          isOnline: true,
          fps: 0, // Pas disponible via Steam Query
          uptime: '0:00:00', // Pas disponible via Steam Query
          playerList: serverInfo.playerList
        }));
      } else {
        // Serveur hors ligne - envoyer info sans logger
        sendMessage(win, "server-info-update", JSON.stringify({
          isOnline: false
        }));
      }
    } catch (error) {
      // Erreur déjà loggée dans SteamQueryService
      sendMessage(win, "server-info-update", JSON.stringify({
        isOnline: false
      }));
    }
  }, 30000); // 30 secondes

  // Initialiser le service d'actualités
  const arma3DataPath = path.join(process.env.APPDATA || process.env.HOME || '', 'arma3-data');
  newsService = new NewsService(config.news.url, arma3DataPath);

  // Gestionnaire de chargement initial
  win.webContents.on("did-finish-load", async () => {
    let arma3Path = store.get("arma3Path") as string | null;
    const firstLaunch = store.get("firstLaunch");

    // Chargement des actualités (système JSON moderne)
    try {
      if (newsService) {
        const newsItems = await newsService.getNews();
        console.log(`✅ ${newsItems.length} actualités chargées`);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des actualités:", error);
    }

    // Tente de récupérer le chemin depuis le registre si non défini
    if (!arma3Path || arma3Path === "null") {
      arma3Path = await getArma3PathFromRegistry();
      if (arma3Path) store.set("arma3Path", arma3Path);
    }

    if (arma3Path && arma3Path !== "null") {
      // Vérifie l'installation du mod
      const modInstalled = isModInstalled(arma3Path);
      sendMessage(
        win,
        modInstalled ? "arma3Path-mod-loaded" : "arma3Path-mod-not-loaded",
        undefined,
        !modInstalled ? `Mod ${config.mods.folderName} non installé` : undefined
      );

      // Message de première utilisation
      if (firstLaunch) {
        sendMessage(
          win,
          "firstLaunch-done",
          "Nous vous avons trouvé Arma 3 automatiquement"
        );
        store.set("firstLaunch", false);
      }

      // Synchroniser les ressources serveur (DLL à la racine du mod, .ts3_plugin dans task_force_radio)
      await syncServerResources(win);
    } else {
      store.set("arma3Path", null);
      sendMessage(win, "arma3Path-not-loaded");
    }

    // Vérification optimisée des mods
    await checkModsWithManifest(win);
  });

  // Gestionnaire de sélection manuelle du dossier Arma 3
  ipcMain.on("locate-arma3", async () => {
    try {
      const result = await dialog.showOpenDialog({
        properties: ["openDirectory"],
        title: "Sélectionner le dossier d'installation d'Arma 3",
        defaultPath: "C:\\Program Files (x86)\\Steam\\steamapps\\common\\Arma 3",
      });

      if (!result.canceled && result.filePaths.length > 0) {
        const selectedPath = result.filePaths[0];

        if (await isValidArma3Path(selectedPath)) {
          store.set("arma3Path", selectedPath);
          sendMessage(win, "arma3Path-ready", "Arma 3 trouvé");
          await checkModsWithManifest(win);
        } else {
          sendMessage(
            win,
            "arma3Path-invalid",
            undefined,
            "Le dossier sélectionné ne contient pas Arma 3"
          );
        }
      }
    } catch (error) {
      console.error("Erreur lors de la sélection du dossier Arma 3:", error);
      sendMessage(
        win,
        "arma3Path-error",
        undefined,
        error instanceof Error ? error.message : "Erreur inconnue"
      );
    }
  });

  // Gestionnaire de vérification manuelle des mods
  ipcMain.on("check-mods", async () => {
    console.log("🔄 Vérification manuelle des mods demandée");
    await checkModsWithManifest(win);
  });

  // Gestionnaire de téléchargement des mods OPTIMISÉ avec Manifest
  ipcMain.on("download-mods", async () => {
    const arma3Path = store.get("arma3Path") as string | null;
    if (!arma3Path) {
      sendMessage(win, "download-error", undefined, "Chemin Arma 3 non trouvé");
      return;
    }

    const modPath = `${arma3Path}\\${config.mods.folderName}`;
    const addonsPath = `${modPath}\\addons`;

    try {
      await fs.ensureDir(addonsPath);
      sendMessage(win, "download-start");

      // Utiliser le système Manifest pour téléchargement optimisé
      const manifestService = new ManifestService(config.mods.manifestUrl, modPath);
      const delta = await manifestService.calculateDelta(addonsPath);

      // Nettoyer les fichiers orphelins AVANT le téléchargement
      if (delta.toDelete.length > 0) {
        console.log(`🗑️ Suppression de ${delta.toDelete.length} fichier(s) orphelin(s)...`);
        sendMessage(win, "cleanup-start", `Nettoyage de ${delta.toDelete.length} fichier(s) obsolète(s)...`);

        let deletedCount = 0;
        for (const fileToDelete of delta.toDelete) {
          const filePath = path.join(addonsPath, fileToDelete);
          try {
            if (await fs.pathExists(filePath)) {
              await fs.remove(filePath);
              deletedCount++;
              console.log(`   ✅ Supprimé: ${fileToDelete}`);
            }
          } catch (error) {
            console.error(`   ❌ Erreur suppression ${fileToDelete}:`, error);
          }
        }

        if (deletedCount > 0) {
          sendMessage(win, "cleanup-complete", `${deletedCount} fichier(s) supprimé(s) avec succès`);
        }
      }

      if (delta.toDownload.length === 0) {
        sendMessage(win, "download-complete", "Mods déjà à jour");
        return;
      }

      const totalSize = delta.totalDownloadSize;
      let downloadedSize = 0;
      const startTime = Date.now();
      let lastProgressUpdate = 0;

      // Téléchargement avec progression
      for (const fileToDownload of delta.toDownload) {
        const destination = path.join(addonsPath, fileToDownload.name);
        let lastBytesForThisFile = 0;

        await downloadFileWithResume(
          `${config.mods.urlMods}/${fileToDownload.name}`,
          destination,
          (p) => {
            const bytesForThisFile = Math.floor((fileToDownload.size || 0) * (p.percent / 100));
            const deltaBytes = Math.max(0, bytesForThisFile - lastBytesForThisFile);
            lastBytesForThisFile = bytesForThisFile;
            downloadedSize = Math.min(totalSize, downloadedSize + deltaBytes);

            const elapsedTime = (Date.now() - startTime) / 1000;
            const downloadSpeed = downloadedSize / Math.max(elapsedTime, 0.001);
            const remainingSize = Math.max(0, totalSize - downloadedSize);
            const estimatedTimeRemaining = Math.round(remainingSize / Math.max(downloadSpeed, 1));
            const minutes = Math.floor(estimatedTimeRemaining / 60);
            const seconds = Math.round(estimatedTimeRemaining % 60);
            const timeRemaining = `${minutes}m ${seconds}s`;

            const globalProgress = totalSize > 0 ? Math.round((downloadedSize / totalSize) * 100) : 0;
            const fileProgress = Math.round(p.percent);

            if (Date.now() - lastProgressUpdate > 1000) {
              sendMessage(
                win,
                "download-progress",
                globalProgress.toString(),
                undefined,
                fileToDownload.name,
                fileProgress.toString(),
                timeRemaining
              );
              lastProgressUpdate = Date.now();
            }
          },
          fileToDownload.hash
        );
      }

      // Sauvegarder le nouveau manifest local
      const serverManifest = await manifestService.fetchServerManifest();
      if (serverManifest) {
        await manifestService.saveLocalManifest(serverManifest);
      }

      sendMessage(win, "download-complete", "Mods synchronisés avec succès");
      sendMessage(win, "arma3Path-mod-loaded", "Jeu prêt à être lancé");
    } catch (error) {
      console.error("Erreur lors de la synchronisation des mods:", error);
      sendMessage(
        win,
        "download-error",
        undefined,
        error instanceof Error ? error.message : "Erreur inconnue"
      );
    }
  });

  // Gestionnaire de récupération du chemin d'Arma 3
  ipcMain.handle("get-arma3-path", async () => {
    const arma3Path = store.get("arma3Path") as string | null;
    if (!arma3Path) return null;
    return arma3Path;
  });

  // Gestionnaire de lancement du jeu
  ipcMain.handle("launch-game", async () => {
    const arma3Path = store.get("arma3Path") as string | null;

    if (!arma3Path) return;

    const battleEyeExe = path.join(arma3Path, "arma3battleye.exe");
    const armaExe = path.join(arma3Path, "arma3_x64.exe");
    const armaCfg = path.join(os.homedir(), 'Documents', 'Arma 3', 'arma3.cfg');

    if (!fs.existsSync(armaExe)) {
      sendMessage(win, "launch-game-error", undefined, "Impossible de trouver arma3_x64.exe");
      return;
    }

    if (!fs.existsSync(battleEyeExe)) {
      sendMessage(win, "launch-game-error", undefined, "Impossible de trouver arma3battleye.exe");
      return;
    }

    // Arguments BattlEye
    const args = [
      '2', '1', '0',
      '-exe', armaExe,
      '-malloc=jemalloc_bi_x64',
      '-enableHT',
      `-mod=${config.mods.folderName}`,
      '-world=empty',
      '-nosplash',
      '-noPause',
      '-noPauseAudio',
      '-skipIntro',
      '-BEservice'
    ];

    // Ajouter le fichier de configuration s'il existe
    if (fs.existsSync(armaCfg)) {
      args.push(`-cfg=${armaCfg}`);
    }
    
    console.log(`🎮 Lancement d'Arma 3 via BattlEye: ${battleEyeExe}`);
    console.log(`📦 Paramètres: ${args.join(' ')}`);
    
    try {
      const gameProcess = spawn(battleEyeExe, args, { 
        cwd: arma3Path,
        detached: true, 
        stdio: 'ignore',
        windowsHide: true
      });
      gameProcess.unref();
      
      sendMessage(win, "launch-game-success", "Jeu lancé avec succès");
      
      setTimeout(() => {
        win.close();
      }, 2000);
    } catch (error) {
      console.error('Erreur lancement Arma 3:', error);
      sendMessage(win, "launch-game-error", undefined, error instanceof Error ? error.message : "Erreur de lancement");
    }
  });

  // Connexion directe au serveur (lancement + -connect/-port)
  ipcMain.handle("connect-server", async () => {
    const arma3Path = store.get("arma3Path") as string | null;

    if (!arma3Path) return;

    const battleEyeExe = path.join(arma3Path, "arma3battleye.exe");
    const armaExe = path.join(arma3Path, "arma3_x64.exe");
    const armaCfg = path.join(os.homedir(), 'Documents', 'Arma 3', 'arma3.cfg');

    if (!fs.existsSync(armaExe)) {
      sendMessage(win, "launch-game-error", undefined, "Impossible de trouver arma3_x64.exe");
      return;
    }

    if (!fs.existsSync(battleEyeExe)) {
      sendMessage(win, "launch-game-error", undefined, "Impossible de trouver arma3battleye.exe");
      return;
    }

    // Arguments BattlEye avec connexion serveur
    const args = [
      '2', '1', '0',
      '-exe', armaExe,
      '-malloc=jemalloc_bi_x64',
      '-enableHT',
      `-mod=${config.mods.folderName}`,
      '-world=empty',
      '-nosplash',
      '-noPause',
      '-noPauseAudio',
      '-skipIntro',
      `-connect=${config.servers[0].ip}`,
      `-port=${config.servers[0].port}`,
      `-password=${config.servers[0].password}`,
      '-BEservice'
    ];

    // Ajouter le fichier de configuration s'il existe
    if (fs.existsSync(armaCfg)) {
      args.push(`-cfg=${armaCfg}`);
    }
    
    console.log(`🎮 Connexion au serveur via BattlEye: ${battleEyeExe}`);
    console.log(`📦 Paramètres: ${args.join(' ')}`);
    
    try {
      const gameProcess = spawn(battleEyeExe, args, { 
        cwd: arma3Path,
        detached: true, 
        stdio: 'ignore',
        windowsHide: true
      });
      gameProcess.unref();
      
      sendMessage(win, "launch-game-success", "Jeu lancé — connexion au serveur en cours");
      
      setTimeout(() => {
        win.close();
      }, 2000);
    } catch (error) {
      console.error('Erreur connexion serveur:', error);
      sendMessage(win, "launch-game-error", undefined, error instanceof Error ? error.message : "Erreur de connexion");
    }
  });

  // Gestionnaire des actualités
  ipcMain.handle("get-news", async () => {
    if (!newsService) return [];
    try {
      return await newsService.getNews();
    } catch (error) {
      console.error("Erreur récupération actualités:", error);
      return [];
    }
  });

  ipcMain.handle("get-critical-news", async () => {
    if (!newsService) return [];
    try {
      return await newsService.getCriticalNews();
    } catch (error) {
      console.error("Erreur récupération actualités critiques:", error);
      return [];
    }
  });

  // Gestionnaire des infos serveur via Steam Query (SANS MOT DE PASSE)
  ipcMain.handle("get-server-info", async () => {
    // Priorité 1: Steam Query (public, sans password)
    if (steamQueryService) {
      try {
        const steamInfo = await steamQueryService.getPublicServerInfo();
        return {
          playerCount: steamInfo.playerCount,
          maxPlayers: steamInfo.maxPlayers,
          serverName: steamInfo.serverName,
          map: steamInfo.map,
          gameMode: steamInfo.gameMode,
          ping: steamInfo.ping,
          isOnline: steamInfo.isOnline,
          fps: 0, // Pas disponible via Steam Query
          uptime: '0:00:00', // Pas disponible via Steam Query
          playerList: steamInfo.playerList
        };
      } catch (error) {
        console.error("Erreur Steam Query:", error);
      }
    }

    // Aucune info disponible - retourner null pour indiquer "hors ligne"
    return null;
  });

  // Installation du plugin TFAR (TeamSpeak)
  ipcMain.handle("install-tfar", async () => {
    const arma3Path = store.get("arma3Path") as string | null;
    if (!arma3Path) {
      sendMessage(win, "tfar-install-error", undefined, "Chemin Arma 3 non trouvé");
      return { ok: false };
    }

    try {
      sendMessage(win, "tfar-install-start", "Installation du plugin TFAR...");

      // Chercher les dossiers/plugins TFAR possibles
      const candidates = [
        path.join(arma3Path, config.mods.folderName, "task_force_radio"),

      ];

      // Chercher un fichier .ts3_plugin si existant
      const ts3PluginCandidates = [
        path.join(arma3Path, config.mods.folderName, "task_force_radio"),
      ];

      for (const dir of ts3PluginCandidates) {
        if (await fs.pathExists(dir)) {
          const files = await fs.readdir(dir);
          const plugin = files.find((f) => f.toLowerCase().endsWith(".ts3_plugin"));
          if (plugin) {
            const fullPath = path.join(dir, plugin);
            const result = await shell.openPath(fullPath);
            if (result) {
              // shell.openPath renvoie une chaîne vide en cas de succès, sinon message d'erreur
              sendMessage(win, "tfar-install-error", undefined, result);
              return { ok: false };
            }
            sendMessage(win, "tfar-install-success", "TFAR installé via le paquet .ts3_plugin");
            return { ok: true };
          }
        }
      }

      // Sinon, copier les .dll depuis le dossier plugins TFAR vers TeamSpeak
      let sourcePluginsDir: string | null = null;
      for (const c of candidates) {
        if (await fs.pathExists(c)) {
          sourcePluginsDir = c;
          break;
        }
      }

      if (!sourcePluginsDir) {
        sendMessage(win, "tfar-install-error", undefined, "Fichiers TFAR introuvables (teamspeak/plugins)");
        return { ok: false };
      }

      const appData = process.env.APPDATA || null;
      if (!appData) {
        sendMessage(win, "tfar-install-error", undefined, "Variable APPDATA introuvable");
        return { ok: false };
      }
      const tsPluginsDir = path.join(appData, "TS3Client", "plugins");
      await fs.ensureDir(tsPluginsDir);

      const files = await fs.readdir(sourcePluginsDir);
      const pluginFiles = files.filter((f) => /\.dll$/i.test(f));
      if (pluginFiles.length === 0) {
        sendMessage(win, "tfar-install-error", undefined, "Aucun fichier plugin .dll trouvé pour TFAR");
        return { ok: false };
      }

      for (const f of pluginFiles) {
        await fs.copy(path.join(sourcePluginsDir, f), path.join(tsPluginsDir, f), { overwrite: true });
      }

      sendMessage(win, "tfar-install-success", "Plugin TFAR installé dans TeamSpeak");
      return { ok: true };
    } catch (error) {
      console.error("Erreur installation TFAR:", error);
      sendMessage(
        win,
        "tfar-install-error",
        undefined,
        error instanceof Error ? error.message : "Erreur inconnue"
      );
      return { ok: false };
    }
  });

  // Ouvrir un lien dans le navigateur
  ipcMain.handle("open-url", async (_, url) => {
    shell.openExternal(url);
  });

  // Contrôles de fenêtre
  ipcMain.on("close-app", () => {
    win.close();
  });

  ipcMain.on("minimize-app", () => {
    win.minimize();
  });
}

// Vérification optimisée des mods avec Manifest
async function checkModsWithManifest(win: BrowserWindow) {
  const arma3Path = store.get("arma3Path") as string | null;
  if (!arma3Path) return false;

  const modPath = `${arma3Path}\\${config.mods.folderName}`;
  const addonsPath = `${modPath}\\addons`;

  try {
    await fs.ensureDir(addonsPath);

    // Initialiser le service de manifest
    const manifestService = new ManifestService(config.mods.manifestUrl, modPath);

    // TOUJOURS calculer les différences avec le manifest serveur d'abord
    const delta = await manifestService.calculateDelta(addonsPath);

    // Nettoyer les anciens fichiers
    if (delta.toDelete.length > 0) {
      console.log(`🗑️ Suppression de ${delta.toDelete.length} fichier(s) orphelin(s)...`);
      sendMessage(win, "cleanup-start", `Nettoyage de ${delta.toDelete.length} fichier(s) obsolète(s)...`);

      let deletedCount = 0;
      for (const fileToDelete of delta.toDelete) {
        const filePath = path.join(addonsPath, fileToDelete);
        try {
          if (await fs.pathExists(filePath)) {
            await fs.remove(filePath);
            deletedCount++;
            console.log(`   ✅ Supprimé: ${fileToDelete}`);
          }
        } catch (error) {
          console.error(`   ❌ Erreur suppression ${fileToDelete}:`, error);
        }
      }

      if (deletedCount > 0) {
        sendMessage(win, "cleanup-complete", `${deletedCount} fichier(s) supprimé(s) avec succès`);
      }
    }

    // Vérifier si le serveur a des mods ou non
    const serverManifest = await manifestService.fetchServerManifest();
    const serverHasNoMods = !serverManifest || serverManifest.files.length === 0;

    // Si le serveur n'a aucun mod, considérer comme synchronisé après nettoyage
    if (serverHasNoMods && delta.toDownload.length === 0) {
      // Nettoyer le manifest local s'il n'y a plus de mods sur le serveur
      const localManifestPath = path.join(modPath, "manifest.json");
      if (await fs.pathExists(localManifestPath)) {
        await fs.remove(localManifestPath);
      }

      sendMessage(win, "mods-check-complete", "Aucun mod requis - synchronisé");
      return true;
    }

    // Si aucune différence détectée et qu'il y a des mods sur le serveur, faire une vérification rapide d'intégrité pour confirmer
    if (delta.toDownload.length === 0 && delta.toDelete.length === 0) {
      const isQuickCheckOk = await manifestService.quickIntegrityCheck(
        addonsPath,
        config.performance.quickCheckSampleSize
      );

      if (isQuickCheckOk) {
        sendMessage(win, "mods-check-complete", "Mods à jour");
        return true;
      }

      // Si le check rapide échoue, forcer une re-synchronisation
      console.log("⚠️ Quick check failed, forcing re-sync - will re-download suspicious files");
      // On continue vers la logique de téléchargement pour forcer une re-sync
    }

    // Notifier les mises à jour nécessaires
    if (config.maintenance) {
      sendMessage(win, "maintenance", "Le serveur est en maintenance, merci de réessayer plus tard");
    } else if (delta.toDownload.length > 0) {
      const sizeGB = (delta.totalDownloadSize / 1024 / 1024 / 1024).toFixed(2);
      sendMessage(
        win,
        "updateMod-needed",
        `${delta.toDownload.length} fichier(s) à synchroniser (${sizeGB} GB)`
      );
    }

    return true;
  } catch (error) {
    console.error("Erreur lors de la vérification des mods:", error);
    sendMessage(win, "mods-check-error", undefined, "Erreur de vérification");
    return false;
  }
}

// Synchronisation des ressources serveur (.dll et .ts3_plugin)
async function syncServerResources(win: BrowserWindow) {

  console.log("Synchronisation des ressources serveur");
  const arma3Path = store.get("arma3Path") as string | null;
  if (!arma3Path) return;
  console.log(arma3Path);

  const resourcesBaseUrl = config.mods.urlRessources;

  if (!resourcesBaseUrl || resourcesBaseUrl.trim() === "") return;

  console.log(resourcesBaseUrl);

  try {
    // Essayer de récupérer un index JSON listant les ressources
    const candidateIndexes = [
      `${resourcesBaseUrl.replace(/\/$/, "")}/index.json`,
      `${resourcesBaseUrl.replace(/\/$/, "")}/list.json`,
    ];

    let resourcesList: Array<string | { name: string; hash?: string; size?: number }> | null = null;
    for (const idxUrl of candidateIndexes) {
      try {
        const res = await fetch(idxUrl);
        if (res.ok) {
          const json = await res.json();
          if (Array.isArray(json)) {
            resourcesList = json as Array<string | { name: string; hash?: string; size?: number }>;
            break;
          }
        }
      } catch {
        // ignore and try next
      }
    }

    // Fallback: pas d'index JSON -> parser des listings HTML (base et /addons/) de manière récursive
    if (!resourcesList) {
      const startBases = [
        resourcesBaseUrl.replace(/\/$/, "/"),
        `${resourcesBaseUrl.replace(/\/$/, "")}/addons/`,
      ];

      const visited = new Set<string>();
      const queue: string[] = [];
      const collected: string[] = [];

      // Enqueue bases
      for (const b of startBases) {
        try {
          const u = new URL(b);
          // Forcer slash final pour les dossiers
          const normalized = u.toString().endsWith("/") ? u.toString() : `${u.toString()}/`;
          queue.push(normalized);
        } catch {
          // ignore invalid URL
        }
      }

      const origin = (() => {
        try { return new URL(resourcesBaseUrl).origin; } catch { return null; }
      })();
      const basePathname = (() => {
        try { return new URL(resourcesBaseUrl).pathname; } catch { return "/"; }
      })();

      while (queue.length > 0) {
        const current = queue.shift()!;
        if (visited.has(current)) continue;
        visited.add(current);
        try {
          const res = await fetch(current);
          if (!res.ok) continue;
          const html = await res.text();
          const hrefRegex = /href\s*=\s*"([^"]+)"/gi;
          let match: RegExpExecArray | null;
          while ((match = hrefRegex.exec(html)) !== null) {
            const href = match[1];
            if (!href || href === "../") continue;
            let resolved: string;
            try {
              resolved = new URL(href, current).toString();
            } catch {
              continue;
            }

            // Conserver uniquement les URLs dans le même origin et sous le même chemin de base
            try {
              const urlObj = new URL(resolved);
              if (origin && urlObj.origin !== origin) continue;
              if (!urlObj.pathname.startsWith(basePathname)) continue;

              if (urlObj.pathname.endsWith("/")) {
                // sous-dossier -> exploration récursive (limiter taille via visited)
                if (!visited.has(urlObj.toString())) queue.push(urlObj.toString());
              } else {
                const lower = urlObj.pathname.toLowerCase();
                if (lower.endsWith(".dll") || lower.endsWith(".ts3_plugin")) {
                  if (!collected.includes(urlObj.toString())) collected.push(urlObj.toString());
                }
              }
            } catch {
              // ignore
            }
          }
        } catch {
          // ignorer et continuer
        }
      }

      if (collected.length > 0) {
        resourcesList = collected;
      } else {
        return; // rien trouvé
      }
    }

    const modRoot = path.join(arma3Path, config.mods.folderName);
    const ts3TargetDir = path.join(modRoot, "task_force_radio");
    await fs.ensureDir(modRoot);
    await fs.ensureDir(ts3TargetDir);

    for (const entry of resourcesList) {
      const name = typeof entry === "string" ? entry : entry?.name;
      const hash = typeof entry === "object" && entry ? entry.hash : undefined;
      if (!name || typeof name !== "string") continue;

      const lower = name.toLowerCase();
      const fileName = path.basename(name);
      const normalizedBase = resourcesBaseUrl.replace(/\/$/, "");
      const fileUrl = name.startsWith("http")
        ? name
        : `${normalizedBase}/${name.replace(/^\//, "")}`;

      let destination: string | null = null;
      if (lower.endsWith(".dll")) {
        // DLL à la racine du dossier du mod
        destination = path.join(modRoot, fileName);
      } else if (lower.endsWith(".ts3_plugin")) {
        // Paquet TS3 dans mods/<folderName>/task_force_radio
        destination = path.join(ts3TargetDir, fileName);
      } else {
        // Autres fichiers ignorés pour l'instant
        continue;
      }

      try {
        await downloadFileWithResume(fileUrl, destination, undefined, hash);
      } catch (e) {
        console.warn(`Échec téléchargement ressource: ${name}`, e);
      }
    }

    sendMessage(win, "resources-sync-complete", "Ressources synchronisées");
  } catch (error) {
    console.error("Erreur synchronisation ressources:", error);
  }
}
