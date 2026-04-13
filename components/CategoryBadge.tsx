export default function CategoryBadge({ name }: { name: string }) {
  return (
    <span className="bg-primary-dark text-neutral-50 px-2 py-1 text-xs rounded-md mr-2">
      {name}
    </span>
  );
}