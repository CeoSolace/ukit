import Link from 'next/link';
import { ArticleMeta } from '@/lib/content';
import { format } from 'date-fns';

export default function ArticleCard({ article }: { article: ArticleMeta }) {
  return (
    <article className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 hover:shadow-sm transition-shadow bg-neutral-50 dark:bg-neutral-800">
      <Link href={`/investigations/${article.slug}`} className="block">
        <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
          {article.title}
        </h3>
      </Link>
      <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">
        {format(new Date(article.date), 'd MMMM yyyy')}
      </p>
      <p className="text-neutral-700 dark:text-neutral-300 mb-2 line-clamp-3">
        {article.summary}
      </p>
      <div className="flex flex-wrap gap-2 mt-auto">
        {article.categories.map((cat) => (
          <span
            key={cat}
            className="bg-primary-dark text-neutral-50 px-2 py-1 text-xs rounded-md"
          >
            {cat}
          </span>
        ))}
      </div>
    </article>
  );
}