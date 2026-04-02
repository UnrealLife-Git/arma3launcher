import packageJson from '../../package.json';

export const config = {
  // 🎮 Informations du launcher et serveur
  launcher: {
    name: "Unreallife launcher",
    version: packageJson.version,
  },
  servers: [
    {
      id: "1",
      name: "UnrealLife",
      ip: "91.134.62.7",
      port: 2302,
      queryPort: 2303,
      maxSlots: 64,
      password: "btrteam",
      isDefault: true
    }
  ],

  mods: {
    folderName: "@A3URL",
    urlMods: "http://188.165.227.197:8080/mods",
    urlRessources: "http://188.165.227.197:8080/ressources",
    manifestUrl: "http://188.165.227.197:8080/mods/manifest.json",
  },

  // 📰 Configuration des nouvelles (JSON moderne)
  news: {
    url: "http://188.165.227.197:8080/news/news.json",
    refreshInterval: 300000, // 5 minutes
  },

  // 🔗 Liens utiles
  links: {
    principal: [
      {
        title: "Site Web Officiel",
        description: "Accédez au site web du serveur",
        url: "https://unreallife.fr/",
        icon: "🌐"
      },
      {
        title: "Intranet",
        description: "Gérer votre compte et vos informations",
        url: "https://intranet.unreallife.fr/",
        icon: "🌐"
      }
    ],
    communaute: [
      {
        title: "Discord",
        description: "Rejoignez notre serveur Discord",
        url: "https://discord.gg/SRMgZRPrqg",
        icon: "💬"
      }
    ],
    communication: [
      {
        title: "TeamSpeak 3",
        description: "Serveur vocal pour la communication en jeu",
        url: "ts3server://ts3.unreallife.fr",
        icon: "🎤"
      },
      {
        title: "Guide TFAR",
        description: "Guide d'utilisation de Task Force Arrowhead Radio",
        url: "https://discord.com/channels/791056321596227595/1410997569877839956",
        icon: "📡"
      }
    ],
    information: [
      {
        title: "Règlement",
        description: "Règles et conditions d'utilisation du serveur",
        url: "https://discord.com/channels/791056321596227595/1427012155504464054",
        icon: "📋"
      }
    ],
    support: [
      {
        title: "Ticket Support",
        description: "Créer un ticket de support",
        url: "https://discord.com/channels/791056321596227595/1299421761644793917",
        icon: "🎫"
      },
      {
        title: "FAQ",
        description: "Questions fréquemment posées",
        url: "https://discord.com/channels/791056321596227595/791361882870513674",
        icon: "❓"
      }
    ]
  },

  // 🔧 Mode maintenance
  maintenance: false,

  // ⚡ Optimisations
  performance: {
    chunkSize: 1024 * 1024, // 1MB chunks pour téléchargement
    concurrentDownloads: 3, // 3 téléchargements simultanés
    quickCheckSampleSize: 20, // Vérifier seulement 20 fichiers au démarrage
  },

  // 🎨 Personnalisation UI
  ui: {
    primaryColor: "#ff6b35", // Orange Arma 3
    secondaryColor: "#dc2626", // Rouge Arma 3
    accentColor: "#10b981", // Vert succès
    particleCount: 30,
    animationDuration: 300,
  }
};
