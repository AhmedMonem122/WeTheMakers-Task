import { Skeleton } from "@/components/ui/skeleton";

export default function JobSeekersSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-xl border bg-card p-5 shadow-sm">
          <Skeleton className="mb-3 h-4 w-3/4" />
          <Skeleton className="mb-2 h-4 w-full" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      ))}
    </div>
  );
}
