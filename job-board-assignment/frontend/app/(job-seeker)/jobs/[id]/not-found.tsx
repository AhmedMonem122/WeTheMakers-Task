import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function JobNotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <div className="max-w-md space-y-6">
        <h1 className="text-7xl font-bold text-indigo-600">404</h1>

        <h2 className="text-2xl font-semibold">
          This job doesn’t exist anymore
        </h2>

        <p className="text-muted-foreground">
          The position you’re looking for might have been filled or removed.
          Don’t worry — there are plenty of other great opportunities waiting.
        </p>

        <div className="flex justify-center gap-4">
          <Button asChild>
            <Link href="/jobs">Browse Jobs</Link>
          </Button>

          <Button variant="outline" asChild>
            <Link href="/">Back Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
