import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// Ported screens (RN equivalents) - ensure these files exist
import LoginScreen from '../app/(auth)/LoginScreen'
import RegisterScreen from '../app/(auth)/RegisterScreen'
import JobListScreen from '../app/(jobseeker)/JobListScreen'
import JobDetailScreen from '../app/(jobseeker)/JobDetailScreen'
import ApplyScreen from '../app/(jobseeker)/ApplyScreen'
import MyApplicationsScreen from '../app/(jobseeker)/my-applications/index'
import AdminJobListScreen from '../app/admin/jobs/job-list'
import AdminJobFormScreen from '../app/(admin)/JobFormScreen.v2'
import AdminUsersScreen from '../app/(admin)/UsersScreen'
import AdminApplicationsScreen from '../app/(admin)/ApplicationsScreen'
import AdminApplicationDetailScreen from '../app/(admin)/applications/ApplicationDetailScreen'

import { useAuth } from '../context/AuthContext'
import PageHeader from '../../mobile/components/ui/PageHeader'
import Button from '../../mobile/components/ui/Button'

type RootStackParamList = {
  Login: undefined
  Register: undefined
}

const AuthStack = createNativeStackNavigator<RootStackParamList>()
const JobSeekerTabs = createBottomTabNavigator()
const AdminTabs = createBottomTabNavigator()

function JobSeekerNavigator() {
  return (
    <JobSeekerTabs.Navigator initialRouteName="JobList" screenOptions={{ headerShown: false }}>
      <JobSeekerTabs.Screen name="JobList" component={JobListScreen} />
      <JobSeekerTabs.Screen name="JobDetail" component={JobDetailScreen} />
      <JobSeekerTabs.Screen name="Apply" component={ApplyScreen} />
      <JobSeekerTabs.Screen name="MyApplications" component={MyApplicationsScreen} />
    </JobSeekerTabs.Navigator>
  )
}

function AdminNavigator() {
  return (
    <AdminTabs.Navigator initialRouteName="AdminJobList" screenOptions={{ headerShown: false }}>
      <AdminTabs.Screen name="AdminJobList" component={AdminJobListScreen} />
      <AdminTabs.Screen name="AdminJobForm" component={AdminJobFormScreen} />
      <AdminTabs.Screen name="AdminUsers" component={AdminUsersScreen} />
      <AdminTabs.Screen name="AdminApplications" component={AdminApplicationsScreen} />
      <AdminTabs.Screen name="AdminApplicationDetail" component={AdminApplicationDetailScreen} />
    </AdminTabs.Navigator>
  )
}

export default function RootNavigator() {
  const { userType } = useAuth()

  if (!userType) {
    return (
      <NavigationContainer>
        <AuthStack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <AuthStack.Screen name="Login" component={LoginScreen} />
          <AuthStack.Screen name="Register" component={RegisterScreen} />
        </AuthStack.Navigator>
      </NavigationContainer>
    )
  }

  return (
    <NavigationContainer>
      {userType === 'admin' ? <AdminNavigator /> : <JobSeekerNavigator />}
    </NavigationContainer>
  )
}
