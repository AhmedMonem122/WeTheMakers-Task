import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Briefcase, MapPin, DollarSign, Clock } from "lucide-react-native";
import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { Job } from "@/lib/schemas";
import { cn } from "@/lib/utils";

interface JobCardProps {
  job: Job;
  onPress?: () => void;
  className?: string;
}

export const JobCard = ({ job, onPress, className }: JobCardProps) => {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push(`/job/${job.id}`);
    }
  };

  const getTypeVariant = (type: string) => {
    switch (type?.toLowerCase()) {
      case "full-time":
        return "primary";
      case "part-time":
        return "warning";
      case "contract":
        return "secondary";
      case "internship":
        return "success";
      default:
        return "primary";
    }
  };

  const formatDate = (date: string) => {
    const d = new Date(date);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - d.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={handlePress}>
      <Card className={cn("mb-4", className)}>
        <View className="flex-row items-start justify-between mb-3">
          <View className="flex-1">
            <Text
              className="text-xl font-bold text-gray-900 mb-1"
              numberOfLines={2}
            >
              {job.title}
            </Text>
            <View className="flex-row items-center">
              <Briefcase size={16} color="#6b7280" />
              <Text className="text-base text-gray-600 ml-2 font-medium">
                {job.company}
              </Text>
            </View>
          </View>
        </View>

        <View className="flex-row flex-wrap gap-2 mb-3">
          <View className="flex-row items-center bg-gray-50 px-3 py-1.5 rounded-lg">
            <MapPin size={14} color="#6b7280" />
            <Text className="text-sm text-gray-700 ml-1.5">{job.location}</Text>
          </View>

          {job.salary && (
            <View className="flex-row items-center bg-gray-50 px-3 py-1.5 rounded-lg">
              <DollarSign size={14} color="#6b7280" />
              <Text className="text-sm text-gray-700 ml-1">{job.salary}</Text>
            </View>
          )}
        </View>

        <View className="flex-row items-center justify-between">
          <Badge variant={getTypeVariant(job.type)}>{job.type}</Badge>

          <View className="flex-row items-center">
            <Clock size={14} color="#9ca3af" />
            <Text className="text-sm text-gray-500 ml-1.5">
              {formatDate(job.createdAt)}
            </Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};
