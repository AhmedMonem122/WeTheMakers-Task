import { Skeleton } from "@/components/ui/skeleton";

export default function ApplicationsSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="rounded-xl border bg-card p-5 shadow-sm">
          <Skeleton className="mb-3 h-4 w-1/3" />
          <Skeleton className="mb-2 h-4 w-1/2" />
          <Skeleton className="h-3 w-2/3" />
        </div>
      ))}
    </div>
  );
}
