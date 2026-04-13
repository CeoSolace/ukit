import Fuse from 'fuse.js';
import { getAllArticles, ArticleMeta } from './content';

// Lazy-loaded Fuse index
let fuse: Fuse<ArticleMeta> | null = null;

async function getFuse(): Promise<Fuse<ArticleMeta>> {
  if (fuse) return fuse;
  const articles = await getAllArticles();
  fuse = new Fuse(articles, {
    keys: ['title', 'summary', 'categories', 'tags'],
    threshold: 0.35
  });
  return fuse;
}

/**
 * Search articles by query string.
 */
export async function searchArticles(query: string): Promise<ArticleMeta[]> {
  const index = await getFuse();
  if (!query) return await getAllArticles();
  const results = index.search(query);
  return results.map((r) => r.item);
}