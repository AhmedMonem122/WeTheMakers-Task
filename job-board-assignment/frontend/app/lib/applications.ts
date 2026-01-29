"use server";
import apiServer from "@/app/lib/apiServer.server";
import { Application } from "@/types/applications";

export async function getMyApplications(page = 1) {
  const api = await apiServer();
  const res = await api.get<Application[]>("/me/applications", {
    params: { page, pageSize: 10 },
  });

  return res.data;
}
