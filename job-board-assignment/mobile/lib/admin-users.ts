import api from '../apiClient'

export const fetchAdminUsers = async () => {
  const res = await api.get('/admin/users')
  return res.data
}
