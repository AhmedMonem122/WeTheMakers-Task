import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import RootNavigator from "@/navigation/RootNavigator";

type UserType = "ADMIN" | "JOBSEEKER" | null;

export default function App() {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const bootstrap = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        try {
          const payload: any = jwtDecode(token);
          const t = (payload?.type ?? payload?.role ?? "")
            .toString()
            .toLowerCase();
          const role: UserType = t === "admin" ? "ADMIN" : "JOBSEEKER";
          if (role === "ADMIN") setInitialRoute("AdminDashboard");
          else if (role === "JOBSEEKER") setInitialRoute("JobList");
          else setInitialRoute("Login");
        } catch {
          setInitialRoute("Login");
        }
      } else {
        setInitialRoute("Login");
      }
      setReady(true);
    };
    bootstrap();
  }, []);

  if (!ready || !initialRoute) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <RootNavigator initialRoute={initialRoute} />;
}
