import Link from 'next/link';
import { getAllArticles, getAllCategoryMetadata } from '@/lib/content';
import ArticleCard from '@/components/ArticleCard';

export default async function HomePage() {
  const articles = await getAllArticles();
  const categories = await getAllCategoryMetadata();
  const featured = articles.slice(0, 2);
  const latest = articles.slice(2, 5);
  return (
    <>
      {/* Hero */}
      <section className="py-12 mb-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-900 dark:text-neutral-100 mb-4">
            U‑Turn UK
          </h1>
          <p className="text-lg md:text-xl text-neutral-700 dark:text-neutral-300">
            An independent, evidence‑led editorial platform analysing UK policies, censorship, public accountability and under‑discussed decisions affecting everyday life.
          </p>
        </div>
      </section>
      {/* Mission */}
      <section className="mb-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-neutral-700 dark:text-neutral-300">
            UKit exists to dig into complicated policies, unveil censorship concerns and hold power to account. We publish long‑form investigations grounded in verifiable evidence, draw clear lines between facts, analysis and opinion, and never shy away from asking hard questions.
          </p>
        </div>
      </section>
      {/* Featured Articles */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Featured Investigations</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {featured.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>
      {/* Latest Articles */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Latest Articles</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {latest.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>
      {/* Categories */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Categories</h2>
        <div className="flex flex-wrap gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="px-4 py-2 border border-primary-dark text-primary-dark rounded-md hover:bg-primary-dark hover:text-white transition-colors"
            >
              {cat.title}
            </Link>
          ))}
        </div>
      </section>
      {/* Why this matters */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Why This Matters</h2>
        <p className="text-neutral-700 dark:text-neutral-300 max-w-4xl">
          Policies passed in Westminster and the corridors of power shape what you can say, learn and access every day. Yet complex legislation often passes with little scrutiny or discussion. Our evidence‑led journalism helps you understand the real‑world impact of censorship, education restrictions, digital rights and more—so you can make informed decisions and engage in civic life.
        </p>
      </section>
      {/* Call to Action */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Get Involved</h2>
        <p className="text-neutral-700 dark:text-neutral-300 mb-4 max-w-4xl">
          Democracy thrives when citizens are informed and engaged. Visit our Take Action page to learn how you can responsibly raise concerns, contact your MP or share our investigations with your community.
        </p>
        <Link
          href="/take-action"
          className="inline-block bg-primary-dark text-white px-6 py-3 rounded-md hover:bg-primary-light transition-colors"
        >
          Take Action
        </Link>
      </section>
      {/* Credibility section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Our Credibility</h2>
        <p className="text-neutral-700 dark:text-neutral-300 max-w-4xl">
          We adhere to strict research standards, citing reputable sources for every claim. Facts, analysis and opinion are clearly separated. We avoid unproven accusations and always give subjects the right to respond. Read our legal and editorial policies to understand how we operate.
        </p>
        <Link
          href="/legal"
          className="mt-4 inline-block text-primary-dark underline hover:text-primary-light"
        >
          Legal & Editorial Policies
        </Link>
      </section>
    </>
  );
}