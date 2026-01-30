import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

type UserType = "ADMIN" | "JOBSEEKER" | null;

type AuthContextType = {
  token: string | null;
  userType: UserType;
  login: (token: string) => Promise<string | null>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userType, setUserType] = useState<UserType>(null);

  useEffect(() => {
    const bootstrap = async () => {
      const t = await AsyncStorage.getItem("token");
      setToken(t);
      if (t) {
        try {
          const payload = jwtDecode<any>(t);
          const tpe = payload?.type ?? payload?.role ?? "";
          setUserType(tpe ? (tpe === "admin" ? "ADMIN" : "JOBSEEKER") : null);
        } catch {
          // ignore decode errors
        }
      }
    };
    bootstrap();
  }, []);

  const login = async (t: string) => {
    setToken(t);
    await AsyncStorage.setItem("token", t);
    try {
      const payload = jwtDecode<any>(t);
      const tpe = payload?.type ?? payload?.role ?? "";
      const inferred: UserType = tpe
        ? tpe === "admin"
          ? "ADMIN"
          : "JOBSEEKER"
        : null;
      setUserType(inferred);
      return null;
    } catch {
      return "Invalid token";
    }
  };

  const logout = async () => {
    setToken(null);
    setUserType(null);
    await AsyncStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, userType, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
