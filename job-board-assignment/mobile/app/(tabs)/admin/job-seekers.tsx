import React, { useState } from "react";
import { View, Text, FlatList, RefreshControl, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Search, User, Mail, Calendar } from "lucide-react-native";

import { Card } from "@/components/ui/Card";
import { Loading } from "@/components/ui/Loading";
import { EmptyState } from "@/components/ui/EmptyState";
import { useJobSeekers } from "@/hooks/useUsers";
import { User as UserType } from "@/lib/schemas";

export default function JobSeekersScreen() {
  const {
    data: jobSeekers,
    isLoading,
    refetch,
    isRefetching,
  } = useJobSeekers();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredJobSeekers = jobSeekers?.filter((seeker) => {
    const query = searchQuery?.toLowerCase();
    return (
      seeker?.name?.toLowerCase()?.includes(query) ||
      seeker?.email?.toLowerCase()?.includes(query)
    );
  });

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const renderJobSeeker = ({ item }: { item: UserType }) => (
    <Card className="mb-4">
      <View className="flex-row items-start">
        <View className="bg-primary-100 rounded-full p-3 mr-4">
          <User size={24} color="#2563eb" />
        </View>

        <View className="flex-1">
          <Text className="text-lg font-bold text-gray-900 mb-2">
            {item.name}
          </Text>

          <View className="flex-row items-center mb-2">
            <Mail size={16} color="#6b7280" />
            <Text className="text-sm text-gray-600 ml-2">{item.email}</Text>
          </View>

          <View className="flex-row items-center">
            <Calendar size={16} color="#6b7280" />
            <Text className="text-sm text-gray-600 ml-2">
              Joined {formatDate(item.createdAt)}
            </Text>
          </View>
        </View>
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
          Job Seekers
        </Text>

        {/* Search Bar */}
        <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3">
          <Search size={20} color="#6b7280" />
          <TextInput
            className="flex-1 ml-3 text-base text-gray-900"
            placeholder="Search job seekers..."
            placeholderTextColor="#9ca3af"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Job Seekers List */}
      <FlatList
        data={filteredJobSeekers}
        keyExtractor={(item) => item.id}
        renderItem={renderJobSeeker}
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
            title="No job seekers found"
            description={
              searchQuery
                ? "Try adjusting your search criteria"
                : "No users have registered yet"
            }
          />
        }
      />
    </SafeAreaView>
  );
}
