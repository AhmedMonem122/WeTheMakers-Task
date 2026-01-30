import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { fetchAdminApplications } from "../../lib/admin-applications";
import PageHeader from "@/components/ui/PageHeader";

type Application = any;

export default function AdminApplicationsScreen() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-applications"],
    queryFn: () => fetchAdminApplications(),
  });

  if (isLoading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  if (error)
    return (
      <View style={styles.center}>
        <Text>Error loading applications</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <PageHeader title="Admin - Applications" />
      <FlatList
        data={(data as Application[]) ?? []}
        keyExtractor={(item: any) => String(item?.id ?? "")}
        renderItem={({ item }: { item: any }) => (
          <View style={styles.card}>
            <Text style={styles.jobTitle}>{item?.jobTitle ?? "Job"}</Text>
            <Text style={styles.meta}>
              {item?.candidateName ?? "Candidate"}
            </Text>
            <Text style={styles.desc} numberOfLines={2}>
              {item?.resumeSnippet ?? "Resume snippet"}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 12 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 8 },
  card: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginVertical: 6,
    backgroundColor: "#fff",
  },
  jobTitle: { fontSize: 16, fontWeight: "700" },
  meta: { fontSize: 12, color: "#666" },
  desc: { fontSize: 12, color: "#444" },
});
