import Link from "next/link";
import { Button } from "@/components/ui/button";

export function EmptyApplications() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
      <h2 className="text-2xl font-semibold">No applications yet</h2>
      <p className="text-muted-foreground max-w-sm">
        You haven’t applied to any jobs yet. Start exploring and apply to roles
        that excite you.
      </p>
      <Button asChild>
        <Link href="/jobs">Browse Jobs</Link>
      </Button>
    </div>
  );
}
