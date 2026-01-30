import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  TextInput,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Search, Edit, Trash2 } from "lucide-react-native";
import Toast from "react-native-toast-message";

import { JobCard } from "@/components/JobCard";
import { Loading } from "@/components/ui/Loading";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { useJobs, useDeleteJob } from "@/hooks/useJobs";
import { Job } from "@/lib/schemas";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Card } from "@/components/ui/Card";

export default function AdminJobsScreen() {
  const router = useRouter();
  const { data: jobs, isLoading, refetch, isRefetching } = useJobs();
  const deleteJobMutation = useDeleteJob();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredJobs = jobs?.filter((job) => {
    const query = searchQuery?.toLowerCase();
    return (
      job?.title?.toLowerCase().includes(query) ||
      // job?.company?.toLowerCase().includes(query) ||
      job?.location?.toLowerCase().includes(query)
    );
  });

  const handleDeleteJob = (job: Job) => {
    Alert.alert(
      "Delete Job",
      `Are you sure you want to delete "${job.title}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteJobMutation.mutateAsync(job.id);
              Toast.show({
                type: "success",
                text1: "Job deleted successfully",
              });
            } catch (error) {
              Toast.show({
                type: "error",
                text1: "Failed to delete job",
                text2: "Please try again",
              });
            }
          },
        },
      ],
    );
  };

  const renderJobCard = ({ item }: { item: Job }) => (
    <Card className="mb-4">
      <JobCard job={item} className="p-0 border-0 shadow-none mb-4" />
      <View className="flex-row gap-3">
        <Button
          variant="outline"
          size="sm"
          onPress={() => router.push(`/admin/edit-job/${item.id}`)}
          className="flex-1"
        >
          <View className="flex-row items-center">
            <Edit size={16} color="#2563eb" />
            <Text className="text-primary-600 font-semibold ml-2">Edit</Text>
          </View>
        </Button>
        <Button
          variant="danger"
          size="sm"
          onPress={() => handleDeleteJob(item)}
          className="flex-1"
          isLoading={deleteJobMutation.isPending}
        >
          <View className="flex-row items-center">
            <Trash2 size={16} color="white" />
            <Text className="text-white font-semibold ml-2">Delete</Text>
          </View>
        </Button>
      </View>
    </Card>
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-6 py-4 border-b border-gray-200">
        <Text className="text-2xl font-bold text-gray-900 mb-4">
          Manage Jobs
        </Text>

        {/* Search Bar */}
        <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3">
          <Search size={20} color="#6b7280" />
          <TextInput
            className="flex-1 ml-3 text-base text-gray-900"
            placeholder="Search jobs..."
            placeholderTextColor="#9ca3af"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Jobs List */}
      <FlatList
        data={filteredJobs}
        keyExtractor={(item) => item.id}
        renderItem={renderJobCard}
        contentContainerStyle={{ padding: 16 }}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            tintColor="#2563eb"
          />
        }
        ListEmptyComponent={
          <EmptyState
            title="No jobs found"
            description={
              searchQuery
                ? "Try adjusting your search criteria"
                : "Create your first job posting"
            }
          />
        }
      />
    </SafeAreaView>
  );
}
