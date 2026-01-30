import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { fetchAdminUsers } from "../../lib/admin-users";
import { useQuery } from "@tanstack/react-query";
import PageHeader from "@/components/ui/PageHeader";

type User = { id: string; fullName?: string; email?: string; role?: string };

export default function AdminUsersScreen() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-users"],
    queryFn: () => fetchAdminUsers(),
  });

  if (isLoading)
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );
  if (error)
    return (
      <View style={styles.center}>
        <Text>Error loading users</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <PageHeader title="Admin - Users" />
      <FlatList
        data={(data as User[]) ?? []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.fullName ?? "User"}</Text>
            <Text style={styles.meta}>{item.email ?? ""}</Text>
            <Text style={styles.meta}>{item.role ?? "user"}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 12 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginVertical: 6,
    backgroundColor: "#fff",
  },
  name: { fontWeight: "700" },
  meta: { fontSize: 12, color: "#666" },
});
