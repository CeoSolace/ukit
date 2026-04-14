import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";

const CONTENT_DIR = path.join(process.cwd(), "content");
const ARTICLES_DIR = path.join(CONTENT_DIR, "investigations");
const CATEGORIES_DIR = path.join(CONTENT_DIR, "categories");
const TIMELINE_FILE = path.join(CONTENT_DIR, "timeline", "events.json");

export interface ArticleSection {
  id: string;
  label: string;
}

export interface ArticleMeta {
  slug: string;
  title: string;
  date: string;
  summary: string;
  categories: string[];
  tags?: string[];
  sections?: ArticleSection[];
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

async function getArticleSlugs(): Promise<string[]> {
  const files = await fs.readdir(ARTICLES_DIR);
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export async function getAllArticles(): Promise<ArticleMeta[]> {
  const slugs = await getArticleSlugs();
  const articles: ArticleMeta[] = [];

  for (const slug of slugs) {
    const filePath = path.join(ARTICLES_DIR, `${slug}.mdx`);
    const file = await fs.readFile(filePath, "utf8");
    const { data } = matter(file);

    articles.push({
      slug,
      title: data.title,
      date: data.date,
      summary: data.summary,
      categories: data.categories || [],
      tags: data.tags || [],
      sections: data.sections || []
    });
  }

  articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return articles;
}

export async function getArticleBySlug(slug: string): Promise<Article> {
  const filePath = path.join(ARTICLES_DIR, `${slug}.mdx`);
  const file = await fs.readFile(filePath, "utf8");
  const { data, content } = matter(file);
  const mdxSource = await serialize(content, { parseFrontmatter: false });

  return {
    slug,
    title: data.title,
    date: data.date,
    summary: data.summary,
    categories: data.categories || [],
    tags: data.tags || [],
    sections: data.sections || [],
    mdxSource
  };
}

export async function getArticlesByCategory(
  categorySlug: string
): Promise<ArticleMeta[]> {
  const articles = await getAllArticles();
  return articles.filter((article) =>
    article.categories.map((category) => slugify(category)).includes(categorySlug)
  );
}

export async function getAllCategoryMetadata(): Promise<CategoryMeta[]> {
  const files = await fs.readdir(CATEGORIES_DIR);
  const categories: CategoryMeta[] = [];

  for (const fileName of files) {
    if (!fileName.endsWith(".md")) continue;

    const slug = fileName.replace(/\.md$/, "");
    const filePath = path.join(CATEGORIES_DIR, fileName);
    const file = await fs.readFile(filePath, "utf8");
    const { data } = matter(file);

    categories.push({
      slug,
      title: data.title,
      description: data.description || ""
    });
  }

  categories.sort((a, b) => a.title.localeCompare(b.title));
  return categories;
}

export async function getTimelineEvents(): Promise<TimelineEvent[]> {
  const raw = await fs.readFile(TIMELINE_FILE, "utf8");
  const events: TimelineEvent[] = JSON.parse(raw);

  events.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return events;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-");
}
