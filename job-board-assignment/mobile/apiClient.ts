import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Base Axios instance for the mobile app to talk to the backend API
const api = axios.create({
  baseURL: 'https://we-the-makers-task.vercel.app/api',
  timeout: 15000,
})

// Automatically attach auth token if available (RN environment)
api.interceptors.request.use(async (config) => {
  try {
    const token = await AsyncStorage.getItem('token')
    if (token) {
      config.headers = config.headers || {}
      ;(config.headers as any)['Authorization'] = `Bearer ${token}`
    }
  } catch {
    // ignore
  }
  return config
})

export default api
