import { ReactNode } from 'react';

export default function OpinionWarning({ children }: { children: ReactNode }) {
  return (
    <section className="mt-8 border-l-4 border-primary-dark bg-neutral-100 dark:bg-neutral-800 p-4">
      <p className="text-sm font-semibold text-primary-dark mb-2">
        Warning: This section reflects personal opinion and emotional interpretation. It is not presented as a purely factual summary, though it may reference facts discussed elsewhere in this article.
      </p>
      <div className="prose prose-neutral dark:prose-invert">
        {children}
      </div>
    </section>
  );
}