import { Table, TableRow, TableCell } from "@/components/ui/table";

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
    <Table>
      {jobs.map((job: Job) => (
        <TableRow key={job.id}>
          <TableCell>{job.title}</TableCell>
          <TableCell>{job.location}</TableCell>
          <TableCell>${job.salary}</TableCell>
          <TableCell>{job.status}</TableCell>
          <TableCell className="flex gap-2">
            <JobFormDialog job={job} />
            <DeleteJobDialog jobId={job.id} jobTitle={job.title} />
          </TableCell>
        </TableRow>
      ))}
    </Table>
  );
}
