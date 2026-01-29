"use server";
import { Job } from "@/types/jobs";
import apiServer from "./apiServer.server";

type JobsResponse = {
  items: Job[];
  total: number;
  page: number;
  pageSize: number;
};

export const fetchJobs = async (
  page: number,
  pageSize: number,
  search: string,
): Promise<JobsResponse> => {
  const api = await apiServer();
  const { data } = await api.get("/jobs", {
    params: { page, pageSize, search },
  });
  return data;
};
