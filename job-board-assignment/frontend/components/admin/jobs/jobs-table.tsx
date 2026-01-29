import {
  Table,
  TableRow,
  TableCell,
  TableHeader,
  TableHead,
  TableBody,
} from "@/components/ui/table";

import { Skeleton } from "@/components/ui/skeleton";
import JobFormDialog from "./jobs-form-dialog";
import { DeleteJobDialog } from "./delete-job-dialog";

import { Job } from "@/types/jobs";

export default function JobsTable({
  jobs,
  isLoading,
}: {
  jobs: Job[];
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  if (!jobs.length) {
    return (
      <div className="rounded-lg border p-10 text-center text-slate-500">
        No jobs found 🚫
      </div>
    );
  }

  return (
    <div className="w-full max-w-full overflow-hidden rounded-md border bg-card">
      <div className="overflow-x-auto">
        <Table className="max-w-full overflow-auto table-auto">
          <TableHeader className="sticky top-0 bg-background z-10">
            <TableRow>
              <TableHead className="whitespace-nowrap">Title</TableHead>
              <TableHead className="whitespace-nowrap">Location</TableHead>
              <TableHead className="whitespace-nowrap">Salary</TableHead>
              <TableHead className="whitespace-nowrap">Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell className="font-medium whitespace-nowrap">
                  {job.title}
                </TableCell>

                <TableCell className="whitespace-nowrap">
                  {job.location}
                </TableCell>

                <TableCell className="whitespace-nowrap">
                  ${job.salary}
                </TableCell>

                <TableCell>
                  <span className="rounded-full bg-muted px-2 py-1 text-xs whitespace-nowrap">
                    {job.status}
                  </span>
                </TableCell>

                <TableCell className="text-right">
                  <div className="inline-flex items-center gap-2">
                    <JobFormDialog job={job} />
                    <DeleteJobDialog jobId={job.id} jobTitle={job.title} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
