"use server";
import apiServer from "./apiServer.server";

export async function getJobs({
  page,
  pageSize,
  search,
}: {
  page: number;
  pageSize: number;
  search: string;
}) {
  const api = await apiServer();
  const res = await api.get("/jobs", {
    params: { page, pageSize, search },
  });

  return res.data;
}
