"use server";

import { z } from "zod";
import apiServer from "@/app/lib/apiServer.server";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

export type JobFormState = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string>;
};

const jobSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  location: z.string().min(2),
  salary: z.coerce.number().positive(),
  status: z.enum(["OPEN", "CLOSED"]),
});

export async function createJob(
  _state: JobFormState,
  formData: FormData,
): Promise<JobFormState> {
  const parsed = jobSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors as Record<string, string>,
    };
  }

  try {
    const api = await apiServer();
    await api.post("/admin/jobs", parsed.data);

    revalidatePath("/dashboard/jobs");
    queryClient.invalidateQueries({ queryKey: ["admin-jobs"] });

    return { success: true, message: "Job created successfully 🎉" };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { success: false, message: error.response?.data?.message };
    }
    return { success: false, message: "Server error" };
  }
}

export async function updateJob(
  jobId: number,
  _state: JobFormState,
  formData: FormData,
): Promise<JobFormState> {
  const parsed = jobSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors as Record<string, string>,
    };
  }

  try {
    const api = await apiServer();
    await api.patch(`/admin/jobs/${jobId}`, parsed.data);

    revalidatePath("/dashboard/jobs");
    queryClient.invalidateQueries({ queryKey: ["admin-jobs"] });

    return { success: true, message: "Job updated successfully ✨" };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { success: false, message: error.response?.data?.message };
    }
    return { success: false, message: "Server error" };
  }
}

// export async function deleteJob(jobId: number) {
//   const api = await apiServer();
//   await api.delete(`/admin/jobs/${jobId}`);
//   revalidatePath("/dashboard/jobs");
// }

export async function deleteJob(
  jobId: number,
  //   prevState: JobFormState
): Promise<JobFormState> {
  try {
    const api = await apiServer();
    const res = await api.delete(`/admin/jobs/${jobId}`);
    if (res.status !== 200) {
      return {
        success: false,
        message: "Failed to delete job",
      };
    }
    revalidatePath("/dashboard/jobs");
    queryClient.invalidateQueries({ queryKey: ["admin-jobs"] });
    return {
      success: true,
      message: "Job deleted successfully",
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { success: false, message: error.response?.data?.message };
    }
    return { success: false, message: "Server error" };
  }
}
