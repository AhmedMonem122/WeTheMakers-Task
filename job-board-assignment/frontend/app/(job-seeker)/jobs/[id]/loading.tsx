import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function JobDetailsLoading() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-10 space-y-8">
      {/* Job header */}
      <Card>
        <CardHeader className="space-y-3">
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-4 w-1/3" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </CardContent>
      </Card>

      {/* Job meta */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-16 rounded-lg" />
        ))}
      </div>

      {/* Application form skeleton */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-1/2" />
        </CardHeader>
        <CardContent className="space-y-6">
          <Skeleton className="h-32 w-full rounded-lg" />
          <Skeleton className="h-24 w-full rounded-lg" />
          <Skeleton className="h-10 w-40" />
        </CardContent>
      </Card>
    </div>
  );
}
