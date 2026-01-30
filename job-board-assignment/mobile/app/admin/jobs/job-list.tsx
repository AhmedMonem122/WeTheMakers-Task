import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import PageHeader from "../../../components/ui/PageHeader";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAdminJobs, deleteAdminJob } from "../../../lib/admin-jobs";
import { useNavigation } from "@react-navigation/native";
import { useToast } from "../../../components/ui/ToastProvider";

type Job = {
  id: string;
  title: string;
  location: string;
  salary?: number;
  description?: string;
};

export default function AdminJobList() {
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const toast = useToast();
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-jobs"],
    queryFn: () => fetchAdminJobs(),
  });

  const onDelete = async (id: string) => {
    try {
      await deleteAdminJob(id);
      queryClient.invalidateQueries({ queryKey: ["admin-jobs"] });
      toast.showToast("Job deleted");
    } catch {
      toast.showToast("Failed to delete job");
    }
  };

  if (isLoading)
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );
  if (error)
    return (
      <View style={styles.center}>
        <Text>Error loading jobs</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <PageHeader title="Admin Jobs" />
      <TouchableOpacity
        onPress={() => navigation.navigate("AdminJobForm" as any)}
      >
        <Text style={styles.create}>Create Job</Text>
      </TouchableOpacity>
      <FlatList
        data={data as Job[]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }: { item: Job }) => (
          <View style={styles.card}>
            <Text style={styles.jobTitle}>{item.title}</Text>
            <Text style={styles.meta}>
              {item.location}
              {item.salary ? ` · ${item.salary}` : ""}
            </Text>
            <Text style={styles.desc} numberOfLines={2}>
              {item.description}
            </Text>
            <View style={styles.actions}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("AdminJobForm" as any, { id: item.id })
                }
              >
                <Text style={styles.action}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onDelete(item.id)}>
                <Text style={styles.action}>Delete</Text>
              </TouchableOpacity>
            </View>
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
  create: { color: "#1d4ed8", fontWeight: "600", marginVertical: 6 },
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
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  action: { color: "#1d4ed8", fontWeight: "600" },
});
