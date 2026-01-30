import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { User } from "./schemas";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAdmin: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: User) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const savedUser = await AsyncStorage.getItem("user");

      if (token && savedUser) {
        // Verify token is not expired
        try {
          const decoded: any = jwtDecode(token);
          if (decoded.exp * 1000 < Date.now()) {
            // Token expired
            await logout();
          } else {
            setUser(JSON.parse(savedUser));
          }
        } catch (error) {
          await logout();
        }
      }
    } catch (error) {
      console.error("Failed to load user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (token: string) => {
    try {
      await AsyncStorage.setItem("authToken", token);
      const decoded: any = jwtDecode(token);

      setUser(decoded);
    } catch (error) {
      console.error("Failed to save auth data:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      await AsyncStorage.removeItem("user");
      setUser(null);
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  const updateUser = async (userData: User) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const isAdmin = user?.role === "ADMIN";

  return (
    <AuthContext.Provider
      value={{ user, isLoading, isAdmin, login, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
