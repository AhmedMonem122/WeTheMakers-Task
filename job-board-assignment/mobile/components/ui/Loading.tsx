import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { cn } from '@/lib/utils';

interface LoadingProps {
  text?: string;
  className?: string;
}

export const Loading = ({ text = 'Loading...', className }: LoadingProps) => {
  return (
    <View className={cn('flex-1 items-center justify-center', className)}>
      <ActivityIndicator size="large" color="#2563eb" />
      {text && (
        <Text className="text-gray-600 mt-4 text-base">
          {text}
        </Text>
      )}
    </View>
  );
};
