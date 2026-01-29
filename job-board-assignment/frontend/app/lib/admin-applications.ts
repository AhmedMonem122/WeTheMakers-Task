"use server";
import apiServer from "@/app/lib/apiServer.server";
import { AdminApplication } from "@/types/admin-applications";

export async function getAdminApplications(): Promise<AdminApplication[]> {
  const api = await apiServer();
  const res = await api.get<AdminApplication[]>("/admin/applications");
  return res.data;
}
