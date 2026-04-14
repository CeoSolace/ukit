import { getArticleBySlug, getAllArticles } from "@/lib/content";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { format } from "date-fns";
import OpinionWarning from "@/components/OpinionWarning";
import Link from "next/link";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article) => ({
    slug: article.slug
  }));
}

export default async function ArticlePage({ params }: Props) {
  const article = await getArticleBySlug(params.slug).catch(() => null);

  if (!article) return notFound();

  const allArticles = await getAllArticles();

  const related = allArticles
    .filter(
      (a) =>
        a.slug !== article.slug &&
        a.categories.some((c) => article.categories.includes(c))
    )
    .slice(0, 2);

  return (
    <article className="max-w-4xl mx-auto">
      <header className="mb-8 border-b border-neutral-200 dark:border-neutral-800 pb-6">
        <h1 className="text-4xl font-bold mb-3">{article.title}</h1>

        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
          {format(new Date(article.date), "d MMMM yyyy")}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {article.categories.map((cat) => (
            <span
              key={cat}
              className="bg-primary-dark text-neutral-50 px-2 py-1 text-xs rounded-md"
            >
              {cat}
            </span>
          ))}
        </div>

        <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-7">
          {article.summary}
        </p>
      </header>

      {article.sections && article.sections.length > 0 && (
        <section className="mb-10 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40 p-5">
          <h2 className="text-lg font-semibold mb-3">On this page</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {article.sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="text-sm text-primary-dark hover:underline"
              >
                {section.label}
              </a>
            ))}
          </div>
        </section>
      )}

      <div className="prose dark:prose-invert max-w-none">
        <MDXRemote
          source={article.mdxSource}
          components={{
            OpinionWarning
          }}
        />
      </div>

      {related.length > 0 && (
        <section className="mt-12 border-t border-neutral-200 dark:border-neutral-800 pt-8">
          <h2 className="text-xl font-bold mb-4">Related Articles</h2>
          <ul className="space-y-3">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/investigations/${r.slug}`}
                  className="text-primary-dark underline"
                >
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
