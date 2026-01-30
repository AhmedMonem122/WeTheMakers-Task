import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Update this to your backend API URL
export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      await AsyncStorage.removeItem("authToken");
      await AsyncStorage.removeItem("user");
    }
    return Promise.reject(error);
  },
);

export default apiClient;
