"use server";
import apiServer from "@/app/lib/apiServer.server";
import { User } from "@/types/users";

export async function getJobSeekers(): Promise<User[]> {
  const api = await apiServer();
  const res = await api.get<User[]>("/admin/users");

  // Only job seekers
  return res.data.filter((user) => user.role === "JOBSEEKER");
}
