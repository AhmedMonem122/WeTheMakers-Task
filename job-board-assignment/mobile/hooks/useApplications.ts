import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../lib/api";
import { Application, ApplicationFormData } from "../lib/schemas";

export const useApplications = () => {
  return useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const response = await apiClient.get<Application[]>("/applications");
      return response.data;
    },
  });
};

export const useMyApplications = () => {
  return useQuery({
    queryKey: ["my-applications"],
    queryFn: async () => {
      const response = await apiClient.get<Application[]>("/me/applications");
      return response.data;
    },
  });
};

export const useJobApplications = (jobId: string) => {
  return useQuery({
    queryKey: ["job-applications", jobId],
    queryFn: async () => {
      const response = await apiClient.get<Application[]>(
        `/applications/job/${jobId}`,
      );
      return response.data;
    },
    enabled: !!jobId,
  });
};

export const useSubmitApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      jobId,
      data,
    }: {
      jobId: string;
      data: ApplicationFormData;
    }) => {
      const response = await apiClient.post<Application>(
        `/jobs/${jobId}/applications`,
        data,
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-applications"] });
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });
};

export const useUpdateApplicationStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string;
      status: "pending" | "reviewing" | "accepted" | "rejected";
    }) => {
      const response = await apiClient.patch<Application>(
        `/applications/${id}/status`,
        { status },
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      queryClient.invalidateQueries({ queryKey: ["job-applications"] });
    },
  });
};
