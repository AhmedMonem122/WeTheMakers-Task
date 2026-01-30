import api from "../apiClient";

export const fetchAdminApplications = async (params?: Record<string, any>) => {
  const res = await api.get("/admin/applications", { params });
  return res.data;
};

export const fetchAdminApplicationById = async (id: string) => {
  const res = await api.get(`/admin/applications/${id}`);
  return res.data;
};
