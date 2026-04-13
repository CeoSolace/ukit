import { searchArticles } from '@/lib/search';
import ArticleCard from '@/components/ArticleCard';
import SearchBar from '@/components/SearchBar';
import { getAllArticles } from '@/lib/content';

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function InvestigationsPage({ searchParams }: Props) {
  const queryParam = typeof searchParams.q === 'string' ? searchParams.q : '';
  const articles = queryParam ? await searchArticles(queryParam) : await getAllArticles();
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Investigations</h1>
      <SearchBar />
      {queryParam && (
        <p className="mb-4 text-sm text-neutral-500 dark:text-neutral-400">Showing results for “{queryParam}”.</p>
      )}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  );
}