import React from 'react'
import { View } from 'react-native'
import { AuthProvider } from './context/AuthContext'
import RootNavigator from './navigation/RootNavigator'
import { ToastProvider } from './components/ui/ToastProvider'

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <RootNavigator />
      </ToastProvider>
    </AuthProvider>
  )
}
