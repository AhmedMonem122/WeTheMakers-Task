import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Clock,
  ArrowLeft,
  FileText,
  X,
} from "lucide-react-native";
import Toast from "react-native-toast-message";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Loading } from "@/components/ui/Loading";
import { useJob } from "@/hooks/useJobs";
import { useSubmitApplication } from "@/hooks/useApplications";
import { applicationSchema, ApplicationFormData } from "@/lib/schemas";

export default function JobDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { data: job, isLoading } = useJob(id);
  const submitApplicationMutation = useSubmitApplication();
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      resumeText: "",
      coverLetter: "",
    },
  });

  const onSubmitApplication = async (data: ApplicationFormData) => {
    try {
      await submitApplicationMutation.mutateAsync({ jobId: id, data });
      Toast.show({
        type: "success",
        text1: "Application Submitted!",
        text2: "Your application has been sent successfully.",
      });
      reset();
      setShowApplicationForm(false);
      router.back();
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Submission Failed",
        text2: error.response?.data?.message || "Please try again.",
      });
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
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!job) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <View className="flex-1 items-center justify-center">
          <Text className="text-xl text-gray-600">Job not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView>
        {/* Header */}
        <View className="bg-white px-6 py-4 border-b border-gray-200">
          <Button
            variant="ghost"
            size="sm"
            onPress={() => router.back()}
            className="self-start mb-4"
          >
            <View className="flex-row items-center">
              <ArrowLeft size={20} color="#2563eb" />
              <Text className="text-primary-600 font-semibold ml-2">Back</Text>
            </View>
          </Button>
        </View>

        <View className="px-6 py-6">
          <Card className="mb-6">
            <Text className="text-2xl font-bold text-gray-900 mb-4">
              {job.title}
            </Text>

            <View className="flex-row items-center mb-3">
              <Briefcase size={20} color="#6b7280" />
              <Text className="text-lg text-gray-700 ml-3 font-medium">
                {job.company}
              </Text>
            </View>

            <View className="flex-row flex-wrap gap-2 mb-4">
              <View className="flex-row items-center bg-gray-50 px-3 py-2 rounded-lg">
                <MapPin size={16} color="#6b7280" />
                <Text className="text-sm text-gray-700 ml-2">
                  {job.location}
                </Text>
              </View>

              {job.salary && (
                <View className="flex-row items-center bg-gray-50 px-3 py-2 rounded-lg">
                  <DollarSign size={16} color="#6b7280" />
                  <Text className="text-sm text-gray-700 ml-1">
                    {job.salary}
                  </Text>
                </View>
              )}

              <View className="flex-row items-center bg-gray-50 px-3 py-2 rounded-lg">
                <Clock size={16} color="#6b7280" />
                <Text className="text-sm text-gray-700 ml-2">
                  Posted {formatDate(job.createdAt)}
                </Text>
              </View>
            </View>

            <Badge variant={getTypeVariant(job.type)}>{job.type}</Badge>
          </Card>

          <Card className="mb-6">
            <Text className="text-xl font-bold text-gray-900 mb-3">
              Job Description
            </Text>
            <Text className="text-base text-gray-700 leading-6">
              {job.description}
            </Text>
          </Card>

          <Card className="mb-6">
            <Text className="text-xl font-bold text-gray-900 mb-3">
              Requirements
            </Text>
            <Text className="text-base text-gray-700 leading-6">
              {job.requirements}
            </Text>
          </Card>

          <Button size="lg" onPress={() => setShowApplicationForm(true)}>
            <View className="flex-row items-center">
              <FileText size={20} color="white" />
              <Text className="text-white font-semibold text-base ml-2">
                Apply Now
              </Text>
            </View>
          </Button>
        </View>
      </ScrollView>

      {/* Application Form Modal */}
      <Modal
        visible={showApplicationForm}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView className="flex-1 bg-gray-50">
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1"
          >
            <View className="bg-white px-6 py-4 border-b border-gray-200">
              <View className="flex-row items-center justify-between">
                <Text className="text-2xl font-bold text-gray-900">
                  Apply for {job.title}
                </Text>
                <Button
                  variant="ghost"
                  size="sm"
                  onPress={() => setShowApplicationForm(false)}
                >
                  <X size={24} color="#6b7280" />
                </Button>
              </View>
            </View>

            <ScrollView keyboardShouldPersistTaps="handled">
              <View className="px-6 py-6">
                <Controller
                  control={control}
                  name="resumeText"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      label="Resume / CV Text"
                      placeholder="Paste your resume or CV content here..."
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      error={errors.resumeText?.message}
                      multiline
                      numberOfLines={8}
                      style={{ height: 200, textAlignVertical: "top" }}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="coverLetter"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      label="Cover Letter"
                      placeholder="Write your cover letter here..."
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      error={errors.coverLetter?.message}
                      multiline
                      numberOfLines={8}
                      style={{ height: 200, textAlignVertical: "top" }}
                    />
                  )}
                />

                <Button
                  onPress={handleSubmit(onSubmitApplication)}
                  isLoading={submitApplicationMutation.isPending}
                  size="lg"
                >
                  Submit Application
                </Button>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}
