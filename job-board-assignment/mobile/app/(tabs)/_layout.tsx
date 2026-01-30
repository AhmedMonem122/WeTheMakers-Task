import React from "react";
import { View } from "react-native";

export default function TabsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Minimal wrapper to avoid phantom header; content renders directly
  return <View style={{ flex: 1 }}>{children}</View>;
}
