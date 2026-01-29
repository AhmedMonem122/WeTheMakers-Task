"use client";

import { useActionState, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SubmitButton from "./submit-button";
import { toast } from "sonner";
import { createJob, updateJob } from "@/app/actions/admin-jobs/adminJobs";
import { Job } from "@/types/jobs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQueryClient } from "@tanstack/react-query";

export default function JobFormDialog({ job }: { job?: Job }) {
  const action = job ? updateJob.bind(null, job.id) : createJob;
  const queryClient = useQueryClient();

  const [state, formAction] = useActionState(action, {});
  const [status, setStatus] = useState<string>(job?.status ?? "OPEN");

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      queryClient.invalidateQueries({
        queryKey: ["admin-jobs"],
        exact: false,
      });
    }
    if (!state.success && state.message) toast.error(state.message);
  }, [state, queryClient]);

  return (
    <Dialog>
      <DialogTrigger className="text-sm underline">
        {job ? "Edit" : "Add Job"}
      </DialogTrigger>

      <DialogContent>
        <form action={formAction} className="space-y-4">
          <Input name="title" defaultValue={job?.title} />
          <Textarea name="description" defaultValue={job?.description} />
          <Input name="location" defaultValue={job?.location} />
          <Input name="salary" type="number" defaultValue={job?.salary} />
          {/* Hidden input for Server Action */}
          <input type="hidden" name="status" value={status} />

          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="OPEN">Open</SelectItem>
              <SelectItem value="CLOSED">Closed</SelectItem>
            </SelectContent>
          </Select>
          <SubmitButton />
        </form>
      </DialogContent>
    </Dialog>
  );
}
