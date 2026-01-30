import React from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react-native";
import Toast from "react-native-toast-message";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { jobSchema, JobFormData } from "@/lib/schemas";
import { useCreateJob } from "@/hooks/useJobs";
import { Picker } from "@react-native-picker/picker";

const jobStatuses = ["OPEN", "CLOSED"];

export default function CreateJobScreen() {
  const router = useRouter();
  const createJobMutation = useCreateJob();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: "",
      // company: '',
      location: "",
      status: "OPEN",
      salary: undefined,
      description: "",
      // requirements: '',
    },
  });

  const onSubmit = async (data: JobFormData) => {
    try {
      await createJobMutation.mutateAsync(data);
      Toast.show({
        type: "success",
        text1: "Job Created!",
        text2: "The job posting has been published successfully.",
      });
      reset();
      router.back();
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Failed to create job",
        text2: error.response?.data?.message || "Please try again.",
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView keyboardShouldPersistTaps="handled">
          {/* Header */}
          <View className="bg-white px-6 py-4 border-b border-gray-200 mb-6">
            <View className="flex-row items-center">
              <PlusCircle size={28} color="#2563eb" />
              <Text className="text-2xl font-bold text-gray-900 ml-3">
                Create New Job
              </Text>
            </View>
          </View>

          <View className="px-6 pb-6">
            <Controller
              control={control}
              name="title"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Job Title"
                  placeholder="e.g. Senior React Native Developer"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.title?.message}
                />
              )}
            />

            {/* <Controller
              control={control}
              name="company"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Company Name"
                  placeholder="e.g. Tech Corp"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.company?.message}
                />
              )}
            /> */}

            <Controller
              control={control}
              name="location"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Location"
                  placeholder="e.g. San Francisco, CA"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.location?.message}
                />
              )}
            />

            <View className="mb-4">
              <Text className="text-gray-700 font-semibold mb-2 text-base">
                Job Type
              </Text>
              <Controller
                control={control}
                name="status"
                render={({ field: { onChange, value } }) => (
                  <View className="border-2 border-gray-300 rounded-xl overflow-hidden bg-white">
                    <Picker
                      selectedValue={value}
                      onValueChange={onChange}
                      style={{ height: 50 }}
                    >
                      {jobStatuses.map((status) => (
                        <Picker.Item
                          key={status}
                          label={status}
                          value={status}
                        />
                      ))}
                    </Picker>
                  </View>
                )}
              />
              {errors.status && (
                <Text className="text-danger-500 text-sm mt-1 ml-1">
                  {errors.status.message}
                </Text>
              )}
            </View>

            <Controller
              control={control}
              name="salary"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Salary"
                  placeholder="e.g. $80k - $120k"
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  error={errors.salary?.message}
                  keyboardType="numeric"
                />
              )}
            />

            <Controller
              control={control}
              name="description"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Job Description"
                  placeholder="Describe the role and responsibilities..."
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.description?.message}
                  multiline
                  numberOfLines={6}
                  style={{ height: 120, textAlignVertical: "top" }}
                />
              )}
            />

            {/* <Controller
              control={control}
              name="requirements"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Requirements"
                  placeholder="List the qualifications and skills needed..."
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.requirements?.message}
                  multiline
                  numberOfLines={6}
                  style={{ height: 120, textAlignVertical: 'top' }}
                />
              )}
            /> */}

            <Button
              onPress={handleSubmit(onSubmit)}
              isLoading={createJobMutation.isPending}
              size="lg"
              className="mt-2"
            >
              Create Job Posting
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
