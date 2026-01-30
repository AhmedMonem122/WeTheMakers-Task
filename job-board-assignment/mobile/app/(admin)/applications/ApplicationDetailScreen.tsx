import React from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { fetchAdminApplicationById } from '../../../lib/admin-applications'
import PageHeader from '../../../components/ui/PageHeader'

type Props = { route: { params: { id: string } } }

export default function AdminApplicationDetailScreen({ route }: Props) {
  const { id } = route.params
  const { data, isLoading, error } = useQuery({
    queryKey: ['admin-application', id],
    queryFn: () => fetchAdminApplicationById(id),
  })

  if (isLoading) return (
    <View style={styles.center}><ActivityIndicator size="large" /></View>
  )
  if (error) return (
    <View style={styles.center}><Text>Error loading application</Text></View>
  )

  const app = data
  return (
    <View style={styles.container}>
      <PageHeader title={`Application #${id}`} />
      <Text style={styles.label}>Candidate: {app?.candidateName ?? 'Unknown'}</Text>
      <Text style={styles.label}>Job: {app?.jobTitle ?? 'Unknown'}</Text>
      <Text style={styles.section}>Resume</Text>
      <Text style={styles.body}>{app?.resumeText ?? app?.resume ?? ''}</Text>
      <Text style={styles.section}>Cover Letter</Text>
      <Text style={styles.body}>{app?.coverLetter ?? ''}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: '700' },
  label: { fontSize: 14, color: '#555', marginVertical: 4 },
  section: { fontSize: 16, fontWeight: '700', marginTop: 8 },
  body: { fontSize: 14, color: '#333' },
})
