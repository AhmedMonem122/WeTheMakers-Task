"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import JobsTable from "@/components/admin/jobs/jobs-table";
import JobFormDialog from "@/components/admin/jobs/jobs-form-dialog";
import { getJobs } from "@/app/lib/admin-jobs";
import { useTransition } from "react";

type Props = {
  page: number;
  search: string;
};

export default function AdminJobsClient({ page, search }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin-jobs", page, search],
    queryFn: () => getJobs({ page, pageSize: 10, search }),
  });

  const onSearchChange = (value: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      params.set("search", value);
      params.set("page", "1");
      router.push(`?${params.toString()}`);
    });
  };

  if (isError) {
    return (
      <p className="text-red-500 text-sm">
        Failed to load jobs. Please try again.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <Input
          placeholder="Search jobs..."
          defaultValue={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="md:w-80"
        />

        <JobFormDialog />
      </div>

      <JobsTable jobs={data?.items ?? []} isLoading={isLoading} />
    </div>
  );
}
