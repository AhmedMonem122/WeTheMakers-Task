import React from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LinearGradient } from 'expo-linear-gradient';
import { Briefcase } from 'lucide-react-native';
import Toast from 'react-native-toast-message';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { loginSchema, LoginFormData } from '@/lib/schemas';
import { useLogin } from '@/hooks/useAuth';

export default function LoginScreen() {
  const router = useRouter();
  const loginMutation = useLogin();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await loginMutation.mutateAsync(data);
      Toast.show({
        type: 'success',
        text1: 'Welcome back!',
        text2: 'You have successfully logged in.',
      });
      router.replace('/');
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: error.response?.data?.message || 'Invalid credentials. Please try again.',
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 px-6 py-8">
            {/* Header */}
            <View className="items-center mb-8">
              <View className="bg-primary-100 rounded-full p-4 mb-4">
                <Briefcase size={48} color="#2563eb" />
              </View>
              <Text className="text-3xl font-bold text-gray-900 mb-2">
                Welcome Back
              </Text>
              <Text className="text-base text-gray-600 text-center">
                Sign in to continue to your job search
              </Text>
            </View>

            {/* Form */}
            <View className="mb-6">
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
                    placeholder="Enter your password"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.password?.message}
                    secureTextEntry
                    autoCapitalize="none"
                    autoComplete="password"
                  />
                )}
              />

              <Button
                onPress={handleSubmit(onSubmit)}
                isLoading={loginMutation.isPending}
                className="mt-2"
                size="lg"
              >
                Sign In
              </Button>
            </View>

            {/* Footer */}
            <View className="flex-row items-center justify-center mt-auto">
              <Text className="text-gray-600 text-base">
                Don't have an account?{' '}
              </Text>
              <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
                <Text className="text-primary-600 font-semibold text-base">
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
