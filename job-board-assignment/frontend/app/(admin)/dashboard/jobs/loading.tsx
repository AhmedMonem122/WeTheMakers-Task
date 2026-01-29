export default function Loading() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="h-12 rounded bg-slate-200 animate-pulse" />
      ))}
    </div>
  );
}
