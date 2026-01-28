"use server";

import { z } from "zod";
import apiServer from "@/app/lib/apiServer.server";
import axios from "axios";

export type ApplicationErrors = {
  resumeText?: string;
  coverLetter?: string;
};

export type SubmitApplicationFormState = {
  success?: boolean;
  message?: string;
  errors?: ApplicationErrors;
};

const schema = z.object({
  resumeText: z.string().min(1, "Resume is required"),
  coverLetter: z
    .string()
    .min(10, "Cover letter must be at least 10 characters"),
});

export async function submitJobApplication(
  jobId: number,
  _state: SubmitApplicationFormState | undefined,
  formData: FormData,
): Promise<SubmitApplicationFormState> {
  const resumeText = formData.get("resumeText");
  const coverLetter = formData.get("coverLetter");

  const parsed = schema.safeParse({
    resumeText,
    coverLetter,
  });

  if (!parsed.success) {
    const errors: ApplicationErrors = {};

    parsed.error.issues.forEach((issue) => {
      const key = issue.path[0];
      if (key === "resumeText" || key === "coverLetter") {
        errors[key] = issue.message;
      }
    });

    return { success: false, errors };
  }

  try {
    const api = await apiServer();

    const res = await api.post(`/jobs/${jobId}/applications`, parsed.data);

    return {
      success: true,
      message: res.data?.message || "Application submitted successfully 🎉",
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Failed to submit application. Please try again.",
      };
    }
    return { success: false, message: "Unknown server error occurred" };
  }
}
