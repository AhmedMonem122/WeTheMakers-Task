import React from 'react'
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import api from '../../apiClient'
import { useQuery } from '@tanstack/react-query'

type Job = { id: string; title: string; location: string; description: string }

export default function JobListScreen() {
  const navigation = useNavigation()
  const { data, isLoading, error } = useQuery({
    queryKey: ['jobs'],
    queryFn: async () => {
      const res = await api.get<Job[]>('/jobs?page=1&pageSize=10')
      return res.data
    },
  })

  if (isLoading) return (
    <View style={styles.center}><ActivityIndicator size="large" /></View>
  )
  if (error) return <View style={styles.center}><Text>Error loading jobs</Text></View>

  return (
    <FlatList
      data={data ?? []}
      keyExtractor={(item) => item.id}
      renderItem={({ item }: { item: any }) => (
        <TouchableOpacity onPress={() => navigation.navigate('JobDetail', { id: item.id } as any)}>
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.location}</Text>
            <Text numberOfLines={2} style={styles.desc}>{item.description}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  )
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { padding: 12, margin: 8, borderWidth: 1, borderColor: '#ddd', borderRadius: 12, backgroundColor: '#fff' },
  title: { fontSize: 16, fontWeight: '600' },
  subtitle: { fontSize: 12, color: '#666' },
  desc: { fontSize: 12, color: '#444' },
})
