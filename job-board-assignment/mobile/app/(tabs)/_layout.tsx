import { Tabs, Redirect } from 'expo-router';
import { Briefcase, FileText, User, Users, PlusCircle } from 'lucide-react-native';
import { useAuth } from '@/lib/auth-context';
import { Loading } from '@/components/ui/Loading';

export default function TabsLayout() {
  const { user, isLoading, isAdmin } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: '#9ca3af',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      {isAdmin ? (
        <>
          <Tabs.Screen
            name="admin/jobs"
            options={{
              title: 'Jobs',
              tabBarIcon: ({ color, size }) => <Briefcase size={size} color={color} />,
            }}
          />
          <Tabs.Screen
            name="admin/create-job"
            options={{
              title: 'Create Job',
              tabBarIcon: ({ color, size }) => <PlusCircle size={size} color={color} />,
            }}
          />
          <Tabs.Screen
            name="admin/job-seekers"
            options={{
              title: 'Job Seekers',
              tabBarIcon: ({ color, size }) => <Users size={size} color={color} />,
            }}
          />
          <Tabs.Screen
            name="admin/profile"
            options={{
              title: 'Profile',
              tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
            }}
          />
          {/* Hide job seeker tabs */}
          <Tabs.Screen name="jobs" options={{ href: null }} />
          <Tabs.Screen name="applications" options={{ href: null }} />
          <Tabs.Screen name="profile" options={{ href: null }} />
        </>
      ) : (
        <>
          <Tabs.Screen
            name="jobs"
            options={{
              title: 'Jobs',
              tabBarIcon: ({ color, size }) => <Briefcase size={size} color={color} />,
            }}
          />
          <Tabs.Screen
            name="applications"
            options={{
              title: 'My Applications',
              tabBarIcon: ({ color, size }) => <FileText size={size} color={color} />,
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: 'Profile',
              tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
            }}
          />
          {/* Hide admin tabs */}
          <Tabs.Screen name="admin/jobs" options={{ href: null }} />
          <Tabs.Screen name="admin/create-job" options={{ href: null }} />
          <Tabs.Screen name="admin/job-seekers" options={{ href: null }} />
          <Tabs.Screen name="admin/profile" options={{ href: null }} />
        </>
      )}
    </Tabs>
  );
}
