import chokidar from 'chokidar';
import axios from 'axios';
import fs from 'fs-extra';
import path from 'path';

const WATCH_DIR = process.env.WATCH_DIR || '/app/data';
const OUTPUT_DIR = process.env.OUTPUT_DIR || '/app/generated';
const MANIFEST_GENERATOR_URL = process.env.MANIFEST_GENERATOR_URL || 'http://manifest-generator:3000';
const ENABLE_FILE_WATCHING = process.env.ENABLE_FILE_WATCHING === 'true' || true;

console.log('👀 Démarrage du service de surveillance des fichiers...');
console.log(`📁 Répertoire surveillé: ${WATCH_DIR}`);
console.log(`📁 Répertoire de sortie: ${OUTPUT_DIR}`);
console.log(`🔗 URL du générateur de manifests: ${MANIFEST_GENERATOR_URL}`);

// Fonction pour déclencher la régénération des manifests
async function triggerManifestGeneration(force = false) {
  try {
    console.log('🔄 Déclenchement de la régénération des manifests...');

    const response = await axios.post(`${MANIFEST_GENERATOR_URL}/generate`, { force }, {
      timeout: 300000, // 5 minutes - temps nécessaire pour calculer les hash SHA256 des gros fichiers .pbo
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 200) {
      const data = response.data;
      if (data.hasChanges) {
        console.log('✅ Manifests régénérés avec succès');
      } else {
        console.log('⏭️ Aucun changement détecté, génération ignorée');
      }
    } else {
      console.warn('⚠️ Réponse inattendue du générateur de manifests:', response.status);
    }

  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      console.log('⏳ Générateur de manifests non disponible, attente...');
    } else {
      console.error('❌ Erreur lors de la régénération des manifests:', error.message);
    }
  }
}

// Fonction pour vérifier la santé du générateur de manifests
async function checkGeneratorHealth() {
  try {
    const response = await axios.get(`${MANIFEST_GENERATOR_URL}/health`, {
      timeout: 5000
    });
    return response.status === 200;
  } catch (error) {
    return false;
  }
}

// Configuration du watcher
function setupFileWatcher() {
  if (!ENABLE_FILE_WATCHING) {
    console.log('👀 Surveillance des fichiers désactivée');
    return null;
  }

  console.log('🔧 Configuration du watcher de fichiers...');

  const watcher = chokidar.watch(WATCH_DIR, {
    ignored: [
      /(^|[\/\\])\../, // Fichiers cachés
      /node_modules/,
      /\.git/,
      /\.DS_Store/,
      /Thumbs\.db/,
      /\.tmp$/,
      /\.temp$/
    ],
    persistent: true,
    ignoreInitial: true,
    usePolling: true, // Utiliser le polling pour Docker/Windows
    interval: 1000, // Vérifier toutes les 1 secondes
    binaryInterval: 3000, // Vérifier les fichiers binaires toutes les 3 secondes
    awaitWriteFinish: {
      stabilityThreshold: 2000,
      pollInterval: 100
    }
  });

  let isProcessing = false;

  // Fonction pour traiter les changements avec debounce
  const processChanges = async () => {
    if (isProcessing) return;

    isProcessing = true;

    try {
      // Vérifier que le générateur est disponible
      const isHealthy = await checkGeneratorHealth();
      if (isHealthy) {
        await triggerManifestGeneration();
      } else {
        console.log('⏳ Générateur de manifests non disponible, attente...');
      }
    } catch (error) {
      console.error('❌ Erreur lors du traitement des changements:', error);
    } finally {
      isProcessing = false;
    }
  };

  // Debounce timer
  let debounceTimer = null;

  watcher.on('add', (filePath) => {
    console.log(`📁 Nouveau fichier détecté: ${path.relative(WATCH_DIR, filePath)}`);

    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    debounceTimer = setTimeout(processChanges, 2000);
  });

  watcher.on('change', (filePath) => {
    console.log(`📝 Fichier modifié: ${path.relative(WATCH_DIR, filePath)}`);

    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    debounceTimer = setTimeout(processChanges, 2000);
  });

  watcher.on('unlink', (filePath) => {
    console.log(`🗑️ Fichier supprimé: ${path.relative(WATCH_DIR, filePath)}`);

    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    debounceTimer = setTimeout(processChanges, 2000);
  });

  watcher.on('error', (error) => {
    console.error('❌ Erreur du watcher:', error);
  });

  watcher.on('ready', () => {
    console.log('✅ Watcher de fichiers prêt');
  });

  return watcher;
}

// Fonction de surveillance périodique de la santé du générateur
function setupHealthMonitoring() {
  console.log('🏥 Configuration de la surveillance de santé...');

  setInterval(async () => {
    const isHealthy = await checkGeneratorHealth();
    if (isHealthy) {
      console.log('💚 Générateur de manifests en bonne santé');
    } else {
      console.log('💔 Générateur de manifests indisponible');
    }
  }, 300000); // Vérification toutes les 5 minutes (au lieu d'1 minute)
}

// Fonction principale
async function main() {
  try {
    // Vérifier que le répertoire de surveillance existe
    await fs.ensureDir(WATCH_DIR);
    await fs.ensureDir(OUTPUT_DIR);

    // Attendre que le générateur de manifests soit disponible
    console.log('⏳ Attente de la disponibilité du générateur de manifests...');
    let isGeneratorReady = false;

    while (!isGeneratorReady) {
      isGeneratorReady = await checkGeneratorHealth();
      if (!isGeneratorReady) {
        console.log('⏳ Générateur de manifests non disponible, attente 10s...');
        await new Promise(resolve => setTimeout(resolve, 10000));
      }
    }

    console.log('✅ Générateur de manifests disponible');

    // Configuration du watcher
    const watcher = setupFileWatcher();

    // Configuration de la surveillance de santé
    setupHealthMonitoring();

    // Génération initiale
    await triggerManifestGeneration();

    console.log('🚀 Service de surveillance des fichiers démarré');

  } catch (error) {
    console.error('❌ Erreur fatale:', error);
    process.exit(1);
  }
}

// Gestion des signaux d'arrêt
process.on('SIGTERM', () => {
  console.log('🛑 Arrêt du service de surveillance...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 Arrêt du service de surveillance...');
  process.exit(0);
});

// Démarrage
main().catch(error => {
  console.error('❌ Erreur lors du démarrage:', error);
  process.exit(1);
});
