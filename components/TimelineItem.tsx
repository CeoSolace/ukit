import { TimelineEvent } from '@/lib/content';
import { format } from 'date-fns';

export default function TimelineItem({ event }: { event: TimelineEvent }) {
  return (
    <div className="relative pl-8 mb-8">
      <div className="absolute left-0 top-1 h-4 w-4 rounded-full bg-primary-dark"></div>
      <time className="block text-sm text-neutral-500 dark:text-neutral-400">
        {format(new Date(event.date), 'd MMM yyyy')}
      </time>
      <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">
        {event.title}
      </h4>
      <p className="text-neutral-700 dark:text-neutral-300 text-sm">
        {event.description}
      </p>
      {event.categories && event.categories.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {event.categories.map((cat) => (
            <span key={cat} className="bg-primary-dark text-neutral-50 px-2 py-1 text-xs rounded-md">
              {cat}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}