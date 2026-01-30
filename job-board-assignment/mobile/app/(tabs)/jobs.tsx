import React, { useState } from "react";
import { View, Text, FlatList, RefreshControl, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Search } from "lucide-react-native";

import { JobCard } from "@/components/JobCard";
import { Loading } from "@/components/ui/Loading";
import { EmptyState } from "@/components/ui/EmptyState";
import { useJobs } from "@/hooks/useJobs";

export default function JobsScreen() {
  const { data: jobs, isLoading, refetch, isRefetching } = useJobs();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredJobs = jobs?.filter((job) => {
    const query = searchQuery?.toLowerCase();
    return (
      job?.title?.toLowerCase().includes(query) ||
      // job.company.toLowerCase().includes(query) ||
      job?.location?.toLowerCase().includes(query)
      // ||job?.type?.toLowerCase().includes(query)
    );
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-6 py-4 border-b border-gray-200">
        <Text className="text-2xl font-bold text-gray-900 mb-4">
          Find Your Dream Job
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
        renderItem={({ item }) => <JobCard job={item} />}
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
                : "Check back later for new opportunities"
            }
          />
        }
      />
    </SafeAreaView>
  );
}
