"use client";

import { useState, useEffect } from "react";
import { useActionState } from "react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SubmitButton from "./submit-button";
import { submitJobApplication } from "@/app/actions/job-application/jobApplication";
import { useParams } from "next/navigation";

export default function JobApplicationForm() {
  const params = useParams();
  const jobId = Number(params.id);

  const [fileName, setFileName] = useState<string | null>(null);

  const action = submitJobApplication.bind(null, jobId);
  const [state, formAction] = useActionState(action, {});

  useEffect(() => {
    if (state.success) toast.success(state.message);
    if (!state.success && state.message) toast.error(state.message);
  }, [state]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Apply for this position</CardTitle>
      </CardHeader>

      <CardContent>
        <form action={formAction} className="space-y-6">
          {/* Resume */}
          <div>
            <label className="mb-2 block text-sm font-medium">Resume</label>

            <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 text-center hover:bg-slate-50">
              <input
                type="file"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setFileName(file.name);
                }}
              />
              <p className="text-sm text-slate-600">
                Drag & drop or click to upload
              </p>
              {fileName && (
                <p className="mt-2 text-sm font-medium text-indigo-600">
                  {fileName}
                </p>
              )}
            </label>

            <input type="hidden" name="resumeText" value={fileName ?? ""} />

            {state.errors?.resumeText && (
              <p className="mt-1 text-sm text-red-600">
                {state.errors.resumeText}
              </p>
            )}
          </div>

          {/* Cover Letter */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Cover Letter
            </label>

            <Textarea
              name="coverLetter"
              rows={5}
              placeholder="Why are you a great fit?"
            />

            {state.errors?.coverLetter && (
              <p className="mt-1 text-sm text-red-600">
                {state.errors.coverLetter}
              </p>
            )}
          </div>

          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}
