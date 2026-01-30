import api from '../apiClient'

export const fetchAdminJobs = async (params?: Record<string, any>) => {
  const res = await api.get('/admin/jobs', { params })
  return res.data
}

export const createAdminJob = async (payload: any) => {
  const res = await api.post('/admin/jobs', payload)
  return res.data
}

export const updateAdminJob = async (id: string, payload: any) => {
  const res = await api.patch(`/admin/jobs/${id}`, payload)
  return res.data
}

export const deleteAdminJob = async (id: string) => {
  const res = await api.delete(`/admin/jobs/${id}`)
  return res.data
}

export const fetchAdminJobById = async (id: string) => {
  const res = await api.get(`/admin/jobs/${id}`)
  return res.data
}
