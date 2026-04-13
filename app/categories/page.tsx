import Link from 'next/link';
import { getAllCategoryMetadata, getArticlesByCategory } from '@/lib/content';

/**
 * The categories index page lists all available topic areas with a short
 * description and a count of how many investigations fall into each. It
 * provides an entry point into deeper exploration. All data is fetched
 * server‑side to avoid unnecessary client bundles.
 */
export default async function CategoriesPage() {
  const categories = await getAllCategoryMetadata();
  // Precompute article counts for each category
  const counts = await Promise.all(
    categories.map(async (cat) => {
      const articles = await getArticlesByCategory(cat.slug);
      return articles.length;
    })
  );
  return (
    <section className="max-w-5xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Categories</h1>
      <p className="text-neutral-700 dark:text-neutral-300 mb-8">
        Explore investigations grouped by theme. Each category connects the dots
        between multiple stories to reveal larger patterns.
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        {categories.map((cat, idx) => (
          <div
            key={cat.slug}
            className="border border-neutral-300 dark:border-neutral-700 rounded-lg p-4 hover:border-primary-dark transition-colors"
          >
            <h2 className="text-xl font-semibold mb-2">
              <Link href={`/categories/${cat.slug}`} className="hover:underline">
                {cat.title}
              </Link>
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 mb-2">
              {cat.description}
            </p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {counts[idx]} investigation{counts[idx] === 1 ? '' : 's'}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}