import { notFound } from 'next/navigation';
import { getAllCategoryMetadata, getArticlesByCategory } from '@/lib/content';
import ArticleCard from '@/components/ArticleCard';

interface CategoryPageProps {
  params: { slug: string };
}

/**
 * Dynamic category page. It loads the category metadata by slug and lists
 * investigations tagged with that category. If the category does not
 * exist, a 404 page is returned.
 */
export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params;
  const categories = await getAllCategoryMetadata();
  const category = categories.find((c) => c.slug === slug);
  if (!category) {
    return notFound();
  }
  const articles = await getArticlesByCategory(slug);
  return (
    <section className="max-w-5xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">{category.title}</h1>
      <p className="text-neutral-700 dark:text-neutral-300 mb-6">
        {category.description}
      </p>
      {articles.length === 0 ? (
        <p className="text-neutral-500 dark:text-neutral-400">No investigations have been published in this category yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      )}
    </section>
  );
}