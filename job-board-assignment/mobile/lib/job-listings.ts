import api from '../apiClient'

export const fetchJobs = async (params?: Record<string, any>) => {
  const res = await api.get('/jobs', { params })
  return res.data
}

export const fetchJobById = async (id: string) => {
  const res = await api.get(`/jobs/${id}`)
  return res.data
}
