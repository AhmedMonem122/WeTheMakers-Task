import { useQuery } from "@tanstack/react-query";
import apiClient from "../lib/api";
import { User } from "../lib/schemas";

export const useJobSeekers = () => {
  return useQuery({
    queryKey: ["job-seekers"],
    queryFn: async () => {
      const response = await apiClient.get<User[]>("/admin/users");
      return response.data;
    },
  });
};

export const useJobSeeker = (id: string) => {
  return useQuery({
    queryKey: ["job-seeker", id],
    queryFn: async () => {
      const response = await apiClient.get<User>(`/users/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};
