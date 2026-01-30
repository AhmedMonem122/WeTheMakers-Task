import api from '../apiClient'

export const fetchApplications = async () => {
  const res = await api.get('/me/applications')
  return res.data
}
