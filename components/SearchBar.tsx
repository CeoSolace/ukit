"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (query) {
      params.set('q', query);
    } else {
      params.delete('q');
    }
    router.push(`/investigations?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex">
      <input
        type="search"
        className="flex-grow px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-l-md bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
        placeholder="Search articles..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        type="submit"
        className="bg-primary-dark text-white px-4 py-2 rounded-r-md hover:bg-primary-light"
      >
        Search
      </button>
    </form>
  );
}