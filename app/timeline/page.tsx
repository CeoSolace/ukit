import { getTimelineEvents, getAllCategoryMetadata } from '@/lib/content';
import TimelineItem from '@/components/TimelineItem';

/**
 * Timeline page displaying chronological events that contextualise UKit’s
 * investigations. Each event shows its date, title, description and the
 * categories it relates to. Category slugs are mapped to their human
 * titles for display.
 */
export default async function TimelinePage() {
  const events = await getTimelineEvents();
  const categories = await getAllCategoryMetadata();
  // Build a slug -> title map for friendly display
  const catMap: Record<string, string> = {};
  categories.forEach((c) => {
    catMap[c.slug] = c.title;
  });
  // Map event categories to titles
  const mappedEvents = events.map((ev) => ({
    ...ev,
    categories: ev.categories?.map((slug) => catMap[slug] ?? slug) || []
  }));
  return (
    <section className="max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Timeline</h1>
      <p className="text-neutral-700 dark:text-neutral-300 mb-8">
        This timeline situates our investigations within broader policy
        developments. Scroll chronologically to see how legal changes,
        guidance and public debates have unfolded.
      </p>
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-2 top-0 bottom-0 w-px bg-neutral-300 dark:bg-neutral-700"></div>
        <div>
          {mappedEvents.map((event) => (
            <TimelineItem key={event.date + event.title} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}