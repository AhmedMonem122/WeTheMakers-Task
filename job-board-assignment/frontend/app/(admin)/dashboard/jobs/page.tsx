import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getJobs } from "@/app/lib/admin-jobs";
import AdminJobsClient from "@/components/admin/jobs/admin-jobs-client";

type Props = {
  searchParams: {
    page?: string;
    search?: string;
  };
};

export default async function AdminJobsPage({ searchParams }: Props) {
  const page = Number(searchParams.page ?? 1);
  const search = searchParams.search ?? "";

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["admin-jobs", page, search],
    queryFn: () => getJobs({ page, pageSize: 10, search }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdminJobsClient page={page} search={search} />
    </HydrationBoundary>
  );
}
