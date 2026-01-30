"use client";
import React from 'react'
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import api from '../../apiClient'
import { useNavigation, RouteProp } from '@react-navigation/native'
import PageHeader from '../../../mobile/components/ui/PageHeader'
import Button from '../../../mobile/components/ui/Button'

const ApplicationSchema = z.object({
  resumeText: z.string().min(1, 'Resume text is required'),
  coverLetter: z.string().min(5, 'Cover letter is required'),
})

type FormData = z.infer<typeof ApplicationSchema>

type Props = { route: { params: { id: string } } }
export default function ApplyScreen({ route }: Props) {
  const { id } = route.params
  const navigation = useNavigation()
  const { control, handleSubmit, formState } = useForm<FormData>({
    resolver: zodResolver(ApplicationSchema),
  })

  const onSubmit = async (values: FormData) => {
    try {
      const res = await api.post(`/jobs/${id}/applications`, values, {
        headers: { 'Content-Type': 'application/json' },
      })
      Alert.alert('Application', res?.data?.message ?? 'Submitted')
      navigation.goBack()
    } catch {
      Alert.alert('Error', 'Failed to submit')
    }
  }

  return (
    <View style={styles.container}>
      <PageHeader title={`Apply to Job #${id}`} />
      <Controller
        control={control}
        name="resumeText"
        render={({ field: { onChange, value } }) => (
          <TextInput style={styles.input} placeholder="Resume text" value={value} onChangeText={onChange} multiline />
        )}
      />
      <Controller
        control={control}
        name="coverLetter"
        render={({ field: { onChange, value } }) => (
          <TextInput style={styles.input} placeholder="Cover letter" value={value} onChangeText={onChange} multiline />
        )}
      />
      <Button title={formState.isSubmitting ? 'Submitting...' : 'Submit Application'} onPress={handleSubmit(onSubmit)} loading={formState.isSubmitting} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: { height: 40, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, paddingHorizontal: 8, marginVertical: 6 },
})
