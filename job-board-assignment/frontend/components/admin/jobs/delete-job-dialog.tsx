"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteJob } from "@/app/actions/admin-jobs/adminJobs";
import SubmitButton from "./submit-button";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  jobId: number;
  jobTitle: string;
};

export type JobFormState = {
  success?: boolean;
  message?: string;
};

const initialState: JobFormState = {};

export function DeleteJobDialog({ jobId, jobTitle }: Props) {
  const queryClient = useQueryClient();

  const [state, formAction] = useActionState(
    deleteJob.bind(null, jobId),
    initialState,
  );

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      queryClient.invalidateQueries({
        queryKey: ["admin-jobs"],
        exact: false,
      });
    }

    if (state?.success === false) {
      toast.error(state.message);
    }
  }, [state, queryClient]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-600">
            Delete this job?
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <span>
              You&apos;re about to permanently delete{" "}
              <strong>{jobTitle}</strong>.
            </span>
            <span className="block text-sm text-muted-foreground">
              This action cannot be undone and will remove all related
              applications.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <form action={formAction}>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel asChild>
              <Button variant="outline">Cancel</Button>
            </AlertDialogCancel>

            <AlertDialogAction asChild>
              <SubmitButton />
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
