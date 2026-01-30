import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../lib/api";
import { Job, JobFormData } from "../lib/schemas";

export const useJobs = () => {
  return useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const response = await apiClient.get<{ items: Job[] }>("/jobs");
      return response.data.items;
    },
  });
};

export const useJob = (id: string) => {
  return useQuery({
    queryKey: ["job", id],
    queryFn: async () => {
      const response = await apiClient.get<Job>(`/jobs/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useCreateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: JobFormData) => {
      const response = await apiClient.post<Job>("/admin/jobs", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });
};

export const useUpdateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: JobFormData }) => {
      const response = await apiClient.put<Job>(`/admin/jobs/${id}`, data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["job", variables.id] });
    },
  });
};

export const useDeleteJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/admin/jobs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });
};
