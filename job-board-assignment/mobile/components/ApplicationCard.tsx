import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Briefcase, Calendar, FileText } from 'lucide-react-native';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Application } from '@/lib/schemas';
import { cn } from '@/lib/utils';

interface ApplicationCardProps {
  application: Application;
  onPress?: () => void;
  className?: string;
}

export const ApplicationCard = ({ application, onPress, className }: ApplicationCardProps) => {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push(`/application/${application.id}`);
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'success';
      case 'rejected':
        return 'danger';
      case 'reviewing':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={handlePress}>
      <Card className={cn('mb-4', className)}>
        {application.job && (
          <View className="mb-3">
            <Text className="text-lg font-bold text-gray-900 mb-1">
              {application.job.title}
            </Text>
            <View className="flex-row items-center">
              <Briefcase size={16} color="#6b7280" />
              <Text className="text-base text-gray-600 ml-2">
                {application.job.company}
              </Text>
            </View>
          </View>
        )}

        <View className="flex-row items-center mb-3">
          <Calendar size={16} color="#6b7280" />
          <Text className="text-sm text-gray-600 ml-2">
            Applied on {formatDate(application.createdAt)}
          </Text>
        </View>

        <View className="flex-row items-center justify-between">
          <Badge variant={getStatusVariant(application.status)}>
            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
          </Badge>
          
          <View className="flex-row items-center">
            <FileText size={14} color="#9ca3af" />
            <Text className="text-sm text-gray-500 ml-1.5">
              View Details
            </Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};
