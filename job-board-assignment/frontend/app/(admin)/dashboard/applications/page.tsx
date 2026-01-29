"use client";

import { useQuery } from "@tanstack/react-query";
import { getAdminApplications } from "@/app/lib/admin-applications";
import ApplicationsSkeleton from "@/components/admin/applications/applications-skeleton";
import EmptyApplications from "@/components/admin/applications/empty-state";
import ApplicationsError from "@/components/admin/applications/error-state";
import ApplicationCard from "@/components/admin/applications/applications-card";

export default function AdminApplicationsPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin-applications"],
    queryFn: getAdminApplications,
  });

  if (isLoading) return <ApplicationsSkeleton />;
  if (isError) return <ApplicationsError />;
  if (!data || data.length === 0) return <EmptyApplications />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Applications</h1>
        <p className="text-sm text-muted-foreground">
          Submitted job applications
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {data?.map((application) => (
          <ApplicationCard key={application?.id} application={application} />
        ))}
      </div>
    </div>
  );
}
