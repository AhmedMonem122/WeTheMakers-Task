import { useEffect } from 'react';
import { Redirect } from 'expo-router';
import { useAuth } from '@/lib/auth-context';
import { Loading } from '@/components/ui/Loading';

export default function Index() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  // Redirect based on user role
  if (user.role === 'admin') {
    return <Redirect href="/(tabs)/admin/jobs" />;
  }

  return <Redirect href="/(tabs)/jobs" />;
}
