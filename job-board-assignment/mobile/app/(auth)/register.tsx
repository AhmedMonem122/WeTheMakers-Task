import React from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Briefcase } from "lucide-react-native";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { registerSchema, RegisterFormData } from "@/lib/schemas";
import { useRegister } from "@/hooks/useAuth";

export default function RegisterScreen() {
  const router = useRouter();
  const registerMutation = useRegister();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      // confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerMutation.mutateAsync(data);
      Toast.show({
        type: "success",
        text1: "Account Created!",
        text2: "Welcome to Job Board.",
      });
      router.replace("/");
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Registration Failed",
        text2: error.response?.data?.message || "Please try again.",
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 px-6 py-8">
            {/* Header */}
            <View className="items-center mb-6">
              <View className="bg-primary-100 rounded-full p-4 mb-4">
                <Briefcase size={48} color="#2563eb" />
              </View>
              <Text className="text-3xl font-bold text-gray-900 mb-2">
                Create Account
              </Text>
              <Text className="text-base text-gray-600 text-center">
                Join us to find your dream job
              </Text>
            </View>

            {/* Form */}
            <View className="mb-6">
              <Controller
                control={control}
                name="fullName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Full Name"
                    placeholder="Enter your full name"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.fullName?.message}
                    autoCapitalize="words"
                  />
                )}
              />

              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Email Address"
                    placeholder="Enter your email"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.email?.message}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                  />
                )}
              />

              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Password"
                    placeholder="Create a password"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.password?.message}
                    secureTextEntry
                    autoCapitalize="none"
                  />
                )}
              />

              {/* <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Confirm Password"
                    placeholder="Confirm your password"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.confirmPassword?.message}
                    secureTextEntry
                    autoCapitalize="none"
                  />
                )}
              /> */}

              <Button
                onPress={handleSubmit(onSubmit)}
                isLoading={registerMutation.isPending}
                className="mt-2"
                size="lg"
              >
                Create Account
              </Button>
            </View>

            {/* Footer */}
            <View className="flex-row items-center justify-center mt-auto">
              <Text className="text-gray-600 text-base">
                Already have an account?{" "}
              </Text>
              <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
                <Text className="text-primary-600 font-semibold text-base">
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
