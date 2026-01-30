import React from 'react'
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import api from '../../apiClient'
import Button from '../../components/ui/Button'

const RegisterSchema = z.object({
  fullName: z.string().min(1, 'Full name required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be 6+ chars'),
})

export default function RegisterScreen() {
  const { control, handleSubmit, formState } = useForm({
    resolver: zodResolver(RegisterSchema),
  })

  const onSubmit = async (data: any) => {
    try {
      const res = await api.post('/auth/register', data)
      Alert.alert('Registration', 'Account created')
    } catch {
      Alert.alert('Registration failed', 'Unable to register')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <Controller
        control={control}
        name="fullName"
        render={({ field: { onChange, value } }) => (
          <TextInput style={styles.input} placeholder="Full name" value={value} onChangeText={onChange} />
        )}
      />
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
      <Button title={formState.isSubmitting ? 'Creating...' : 'Register'} onPress={handleSubmit(onSubmit)} loading={formState.isSubmitting} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
  input: { height: 40, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, paddingHorizontal: 8, marginVertical: 6 },
})
