import React, { useContext } from 'react'
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import api from '../../apiClient'
import { AuthContext } from '../../context/AuthContext'
import { useNavigation } from '@react-navigation/native'
import Button from '../../components/ui/Button'

const LoginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password required'),
})

export default function LoginScreen() {
  const { control, handleSubmit, formState } = useForm({
    resolver: zodResolver(LoginSchema),
  })

  const navigation = useNavigation()
  const { login } = useContext(AuthContext) ?? { login: async () => null }

  const onSubmit = async (data: any) => {
    try {
      const res = await api.post('/auth/login', data)
      const token = res?.data?.token
      if (token) {
        await login(token)
        // navigate to appropriate screen based on role in token payload is handled by RootNavigator bootstrap
        navigation.reset({ index: 0, routes: [{ name: 'JobList' }] as any })
      } else {
        Alert.alert('Login failed', 'No token returned')
      }
    } catch {
      Alert.alert('Login failed', 'Unable to login')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput style={styles.input} placeholder="Email" value={value} onChangeText={onChange} keyboardType="email-address" />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput style={styles.input} placeholder="Password" value={value} onChangeText={onChange} secureTextEntry />
        )}
      />
      <Button title={formState.isSubmitting ? 'Logging in...' : 'Login'} onPress={handleSubmit(onSubmit)} loading={formState.isSubmitting} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
  input: { height: 40, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, paddingHorizontal: 8, marginVertical: 6 },
})
