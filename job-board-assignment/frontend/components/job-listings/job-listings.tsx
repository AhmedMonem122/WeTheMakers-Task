"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import JobCard from "./job";
import JobsSkeleton from "./job-skeleton";
import { fetchJobs } from "@/app/lib/job-listings";

/* -----------------------------
   Page
------------------------------*/
export default function JobsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const pageSize = 10;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["jobs", page, search],
    queryFn: () => fetchJobs(page, pageSize, search),
  });

  const totalPages = data ? Math.ceil(data.total / pageSize) : 0;

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">
            Find Your Next Job
          </h1>
          <p className="text-slate-600">
            Browse open positions from trusted companies
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="pl-9"
          />
        </div>
      </div>

      {/* Content */}
      {isLoading && <JobsSkeleton />}

      {isError && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
          <p className="font-medium text-red-600">
            Failed to load jobs. Please try again.
          </p>
        </div>
      )}

      {data && !isLoading && data.items.length === 0 && (
        <div className="rounded-lg border bg-slate-50 p-10 text-center">
          <p className="text-slate-600">No jobs found.</p>
        </div>
      )}

      {data && data.items.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.items.map((job) => (
            <JobCard key={job.id} {...job} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {data && totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-4">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </Button>

          <span className="text-sm text-slate-600">
            Page {page} of {totalPages}
          </span>

          <Button
            variant="outline"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
