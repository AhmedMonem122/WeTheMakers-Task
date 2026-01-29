"use client";

import { useQuery } from "@tanstack/react-query";
import { getJobSeekers } from "@/app/lib/admin-users";
import JobSeekerCard from "@/components/admin/job-seekers/job-seeker-card";
import JobSeekersSkeleton from "@/components/admin/job-seekers/job-seekers-skeleton";
import EmptyJobSeekers from "@/components/admin/job-seekers/empty-state";
import JobSeekersError from "@/components/admin/job-seekers/error-state";

export default function JobSeekersPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin-job-seekers"],
    queryFn: getJobSeekers,
  });

  if (isLoading) return <JobSeekersSkeleton />;
  if (isError) return <JobSeekersError />;
  if (!data || data.length === 0) return <EmptyJobSeekers />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Job Seekers</h1>
        <p className="text-sm text-muted-foreground">
          Registered users looking for jobs
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((user) => (
          <JobSeekerCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
