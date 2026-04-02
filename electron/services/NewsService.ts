import fs from "fs-extra";
import path from "node:path";

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  author: string;
  type: 'update' | 'event' | 'info' | 'warning' | 'maintenance';
  priority: 'low' | 'medium' | 'high' | 'critical';
  publishedAt: number;
  expiresAt?: number;
  tags: string[];
  imageUrl?: string;
  actionButton?: {
    text: string;
    url: string;
  };
}

export interface NewsManifest {
  version: string;
  lastUpdated: number;
  items: NewsItem[];
}

export class NewsService {
  private newsUrl: string;
  private localNewsPath: string;

  constructor(newsUrl: string, localPath: string) {
    this.newsUrl = newsUrl;
    this.localNewsPath = path.join(localPath, "news.json");
  }

  /**
 * Récupérer les actualités depuis le serveur
 */
  async fetchNews(): Promise<NewsManifest | null> {
    // Si pas d'URL configurée, retourner null
    if (!this.newsUrl || this.newsUrl.trim() === '') {
      return null;
    }

    try {
      const response = await fetch(this.newsUrl);
      if (!response.ok) return null;

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.log('URL news ne retourne pas du JSON, actualités désactivées');
        return null;
      }

      const newsData = await response.json();

      // Gérer le cas où l'API retourne un tableau ou un objet
      let items: any[] = [];
      if (Array.isArray(newsData)) {
        items = newsData;
      } else if (newsData.items && Array.isArray(newsData.items)) {
        items = newsData.items;
      } else {
        console.log('Format de données news non reconnu');
        return null;
      }

      // Normaliser les items (timestamp -> publishedAt si nécessaire)
      const normalizedItems = items.map((item: any) => ({
        ...item,
        publishedAt: item.publishedAt || item.timestamp || Date.now(),
        tags: item.tags || [],
        type: item.type || 'info',
        priority: item.priority || 'medium'
      }));

      // Filtrer les actualités expirées
      const now = Date.now();
      const validItems = normalizedItems.filter((item: NewsItem) =>
        !item.expiresAt || item.expiresAt > now
      );

      return {
        version: newsData.version || '1.0.0',
        lastUpdated: newsData.lastUpdated || Date.now(),
        items: validItems
      };
    } catch (error) {
      console.error("Erreur fetch news:", error);
      return null;
    }
  }

  /**
   * Sauvegarder les actualités localement
   */
  async saveLocalNews(newsManifest: NewsManifest): Promise<void> {
    await fs.ensureDir(path.dirname(this.localNewsPath));
    await fs.writeJson(this.localNewsPath, newsManifest, { spaces: 2 });
  }

  /**
   * Lire les actualités locales
   */
  async getLocalNews(): Promise<NewsManifest | null> {
    try {
      if (await fs.pathExists(this.localNewsPath)) {
        return await fs.readJson(this.localNewsPath);
      }
    } catch (error) {
      console.error("Erreur lecture news locales:", error);
    }
    return null;
  }

  /**
   * Obtenir les actualités avec fallback local
   */
  async getNews(): Promise<NewsItem[]> {
    // Essayer de récupérer depuis le serveur
    const serverNews = await this.fetchNews();
    if (serverNews) {
      await this.saveLocalNews(serverNews);
      return this.sortNewsByPriority(serverNews.items);
    }

    // Fallback vers les actualités locales
    const localNews = await this.getLocalNews();
    if (localNews) {
      return this.sortNewsByPriority(localNews.items);
    }

    // Actualités par défaut si rien n'est disponible
    return this.getDefaultNews();
  }

  /**
   * Trier les actualités par priorité et date
   */
  private sortNewsByPriority(items: NewsItem[]): NewsItem[] {
    const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };

    return items.sort((a, b) => {
      // D'abord par priorité
      const priorityDiff = (priorityOrder[b.priority] || 1) - (priorityOrder[a.priority] || 1);
      if (priorityDiff !== 0) return priorityDiff;

      // Puis par date (plus récent en premier)
      return b.publishedAt - a.publishedAt;
    });
  }

  /**
   * Actualités par défaut
   */
  private getDefaultNews(): NewsItem[] {
    return [
      {
        id: 'welcome',
        title: 'Bienvenue sur Arma RP',
        content: 'Merci d\'avoir installé le launcher ! Assurez-vous d\'avoir Arma 3 installé et rejoignez-nous sur le serveur.',
        author: 'Équipe Arma',
        type: 'info',
        priority: 'medium',
        publishedAt: Date.now(),
        tags: ['bienvenue', 'info']
      }
    ];
  }

  /**
   * Obtenir les actualités critiques (maintenance, urgence)
   */
  async getCriticalNews(): Promise<NewsItem[]> {
    const allNews = await this.getNews();
    return allNews.filter(item => item.priority === 'critical');
  }
}
