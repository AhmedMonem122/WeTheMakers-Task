import React from 'react';
import { View, Text } from 'react-native';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}

export const EmptyState = ({ title, description, icon, className }: EmptyStateProps) => {
  return (
    <View className={cn('flex-1 items-center justify-center px-8 py-12', className)}>
      {icon && <View className="mb-4">{icon}</View>}
      <Text className="text-xl font-bold text-gray-900 text-center mb-2">
        {title}
      </Text>
      {description && (
        <Text className="text-base text-gray-600 text-center">
          {description}
        </Text>
      )}
    </View>
  );
};
