import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../lib/api";
import { useAuth } from "../lib/auth-context";
import { LoginFormData, RegisterFormData, AuthResponse } from "../lib/schemas";

export const useLogin = () => {
  const { login } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: LoginFormData) => {
      const response = await apiClient.post<AuthResponse>("/auth/login", data);

      return response.data;
    },
    onSuccess: async (data) => {
      await login(data.accessToken);
      queryClient.invalidateQueries();
    },
  });
};

export const useRegister = () => {
  const { login } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: RegisterFormData) => {
      const {
        // confirmPassword,
        ...registerData
      } = data;
      const response = await apiClient.post<AuthResponse>(
        "/auth/register",
        registerData,
      );
      return response.data;
    },
    onSuccess: async (data) => {
      await login(data.accessToken);
      queryClient.invalidateQueries();
    },
  });
};

export const useLogout = () => {
  const { logout } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await logout();
    },
    onSuccess: () => {
      queryClient.clear();
    },
  });
};
