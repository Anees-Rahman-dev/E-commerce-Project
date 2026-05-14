export default function LoadingGrid({ count = 8 }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array(count).fill(0).map((_, i) => (
        <div key={i} className="h-72 bg-amber-100 animate-pulse rounded-2xl" />
      ))}
    </div>
  );
}