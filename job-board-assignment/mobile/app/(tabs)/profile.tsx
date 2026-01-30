import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { User, Mail, LogOut, Shield } from 'lucide-react-native';
import Toast from 'react-native-toast-message';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/lib/auth-context';
import { useLogout } from '@/hooks/useAuth';

export default function ProfileScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const logoutMutation = useLogout();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await logoutMutation.mutateAsync();
              Toast.show({
                type: 'success',
                text1: 'Logged out successfully',
              });
              router.replace('/(auth)/login');
            } catch (error) {
              Toast.show({
                type: 'error',
                text1: 'Logout failed',
                text2: 'Please try again',
              });
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView>
        {/* Header */}
        <View className="bg-white px-6 py-4 border-b border-gray-200 mb-6">
          <Text className="text-2xl font-bold text-gray-900">
            Profile
          </Text>
        </View>

        <View className="px-6">
          {/* User Info Card */}
          <Card className="mb-6">
            <View className="items-center py-4">
              <View className="bg-primary-100 rounded-full p-4 mb-4">
                <User size={48} color="#2563eb" />
              </View>
              <Text className="text-2xl font-bold text-gray-900 mb-1">
                {user?.name}
              </Text>
              <View className="flex-row items-center">
                <Mail size={16} color="#6b7280" />
                <Text className="text-base text-gray-600 ml-2">
                  {user?.email}
                </Text>
              </View>
            </View>
          </Card>

          {/* Role Badge */}
          <Card className="mb-6">
            <View className="flex-row items-center">
              <Shield size={20} color="#2563eb" />
              <Text className="text-base text-gray-700 ml-3 font-medium">
                Role:{' '}
                <Text className="text-primary-600 font-bold">
                  {user?.role === 'admin' ? 'Administrator' : 'Job Seeker'}
                </Text>
              </Text>
            </View>
          </Card>

          {/* Logout Button */}
          <Button
            variant="danger"
            size="lg"
            onPress={handleLogout}
            isLoading={logoutMutation.isPending}
            className="mb-6"
          >
            <View className="flex-row items-center">
              <LogOut size={20} color="white" />
              <Text className="text-white font-semibold text-base ml-2">
                Logout
              </Text>
            </View>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
