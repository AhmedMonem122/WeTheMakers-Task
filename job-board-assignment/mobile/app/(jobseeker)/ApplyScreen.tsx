import React from 'react'
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import api from '../../apiClient'
import { useNavigation, RouteProp } from '@react-navigation/native'
import { useAuth } from '../../context/AuthContext'
import Button from '../../components/ui/Button'
import ResumeUploaderRN from '../../components/ui/ResumeUploaderRN'
import { useState } from 'react'
import * as FileSystem from 'expo-file-system'

type Props = { route: { params: { id: string } } }
const ApplicationSchema = z.object({
  resumeText: z.string().min(1, 'Resume text is required'),
  coverLetter: z.string().min(5, 'Cover letter is required'),
})

export default function ApplyScreen({ route }: Props) {
  const { id } = route.params
  const navigation = useNavigation()
  const [resumeUri, setResumeUri] = useState<string | null>(null)
  const [resumeName, setResumeName] = useState<string | null>(null)
  const { control, handleSubmit, formState } = useForm({
    resolver: zodResolver(ApplicationSchema),
  })
  const { login } = useAuth() // not used for apply, but ready for tokens

  const onSubmit = async (values: any) => {
    try {
      const res = await api.post(`/jobs/${id}/applications`, values, {
        headers: {
          'Content-Type': 'application/json',
          },
      })
      Alert.alert('Application', res?.data?.message ?? 'Submitted')
      navigation.goBack()
    } catch {
      Alert.alert('Error', 'Failed to submit application')
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Apply to Job</Text>
      <ResumeUploaderRN onPick={(uri, name) => { setResumeUri(uri); setResumeName(name); Alert.alert('Resume selected', name ?? 'resume') }} />
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
  title: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  input: { height: 40, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, paddingHorizontal: 8, marginVertical: 6 },
})
