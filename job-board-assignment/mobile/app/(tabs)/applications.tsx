import React from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ApplicationCard } from '@/components/ApplicationCard';
import { Loading } from '@/components/ui/Loading';
import { EmptyState } from '@/components/ui/EmptyState';
import { useMyApplications } from '@/hooks/useApplications';

export default function ApplicationsScreen() {
  const { data: applications, isLoading, refetch, isRefetching } = useMyApplications();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-6 py-4 border-b border-gray-200">
        <Text className="text-2xl font-bold text-gray-900">
          My Applications
        </Text>
        <Text className="text-base text-gray-600 mt-1">
          Track your application status
        </Text>
      </View>

      {/* Applications List */}
      <FlatList
        data={applications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ApplicationCard application={item} />}
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
            title="No applications yet"
            description="Start applying to jobs to see your applications here"
          />
        }
      />
    </SafeAreaView>
  );
}
