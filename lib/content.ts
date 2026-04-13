import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';

const ARTICLES_DIR = path.join(process.cwd(), 'ukit', 'content', 'investigations');
const CATEGORIES_DIR = path.join(process.cwd(), 'ukit', 'content', 'categories');
const TIMELINE_FILE = path.join(process.cwd(), 'ukit', 'content', 'timeline', 'events.json');

export interface ArticleMeta {
  slug: string;
  title: string;
  date: string;
  summary: string;
  categories: string[];
  tags?: string[];
}

export interface Article extends ArticleMeta {
  mdxSource: MDXRemoteSerializeResult;
}

export interface CategoryMeta {
  slug: string;
  title: string;
  description: string;
}

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  categories?: string[];
}

/**
 * Read all article slugs from the investigations directory.
 */
async function getArticleSlugs(): Promise<string[]> {
  const files = await fs.readdir(ARTICLES_DIR);
  return files.filter((f) => f.endsWith('.mdx')).map((f) => f.replace(/\.mdx?$/, ''));
}

/**
 * Get metadata of all articles.
 */
export async function getAllArticles(): Promise<ArticleMeta[]> {
  const slugs = await getArticleSlugs();
  const articles: ArticleMeta[] = [];
  for (const slug of slugs) {
    const filePath = path.join(ARTICLES_DIR, `${slug}.mdx`);
    const file = await fs.readFile(filePath, 'utf8');
    const { data } = matter(file);
    articles.push({
      slug,
      title: data.title,
      date: data.date,
      summary: data.summary,
      categories: data.categories || [],
      tags: data.tags || []
    });
  }
  // Sort by date descending
  articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return articles;
}

/**
 * Get a single article by slug.
 */
export async function getArticleBySlug(slug: string): Promise<Article> {
  const filePath = path.join(ARTICLES_DIR, `${slug}.mdx`);
  const file = await fs.readFile(filePath, 'utf8');
  const { data, content } = matter(file);
  const mdxSource = await serialize(content, { parseFrontmatter: false });
  return {
    slug,
    title: data.title,
    date: data.date,
    summary: data.summary,
    categories: data.categories || [],
    tags: data.tags || [],
    mdxSource
  };
}

/**
 * Get articles by category slug.
 */
export async function getArticlesByCategory(categorySlug: string): Promise<ArticleMeta[]> {
  const articles = await getAllArticles();
  return articles.filter((a) => a.categories && a.categories.map((c) => slugify(c)).includes(categorySlug));
}

/**
 * Get all categories from category files.
 */
export async function getAllCategoryMetadata(): Promise<CategoryMeta[]> {
  const files = await fs.readdir(CATEGORIES_DIR);
  const categories: CategoryMeta[] = [];
  for (const fileName of files) {
    if (!fileName.endsWith('.md')) continue;
    const slug = fileName.replace(/\.md$/, '');
    const file = await fs.readFile(path.join(CATEGORIES_DIR, fileName), 'utf8');
    const { data, content } = matter(file);
    categories.push({
      slug,
      title: data.title,
      description: data.description || ''
    });
  }
  // sort alphabetically
  categories.sort((a, b) => a.title.localeCompare(b.title));
  return categories;
}

/**
 * Get timeline events from the timeline JSON file.
 */
export async function getTimelineEvents(): Promise<TimelineEvent[]> {
  const raw = await fs.readFile(TIMELINE_FILE, 'utf8');
  const events: TimelineEvent[] = JSON.parse(raw);
  // Sort by date ascending
  events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  return events;
}

/**
 * Generate a URL slug from a category title.
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-');
}