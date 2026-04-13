import { getArticleBySlug, getAllArticles } from '@/lib/content';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { format } from 'date-fns';
import OpinionWarning from '@/components/OpinionWarning';
import Link from 'next/link';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export default async function ArticlePage({ params }: Props) {
  const article = await getArticleBySlug(params.slug).catch(() => null);
  if (!article) return notFound();
  // pick some related articles (other than current) by sharing at least one category
  const allArticles = await getAllArticles();
  const related = allArticles
    .filter((a) => a.slug !== article.slug && a.categories.some((c) => article.categories.includes(c)))
    .slice(0, 3);
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>{article.title}</h1>
      <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">
        {format(new Date(article.date), 'd MMMM yyyy')}
      </p>
      <div className="flex flex-wrap gap-2 mb-6">
        {article.categories.map((cat) => (
          <span key={cat} className="bg-primary-dark text-neutral-50 px-2 py-1 text-xs rounded-md">
            {cat}
          </span>
        ))}
      </div>
      {/* Render MDX content */}
      {/* @ts-expect-error Async RSC MDX */}
      <MDXRemote source={article.mdxSource} components={{ OpinionWarning }} />
      {/* Related articles */}
      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold mb-4">Related Articles</h2>
          <ul className="space-y-2">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/investigations/${r.slug}`} className="text-primary-dark underline">
                  {r.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}