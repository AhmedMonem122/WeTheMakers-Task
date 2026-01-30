import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function ApplicationsCard({ item }: { item: any }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{item?.candidateName ?? item?.name ?? 'Applicant'}</Text>
      <Text style={styles.subtitle}>{item?.jobTitle ?? 'Job'}</Text>
      <Text style={styles.description} numberOfLines={2}>{item?.resumeSnippet ?? 'Resume snippet'}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: { padding: 12, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, marginVertical: 6, backgroundColor: '#fff' },
  title: { fontWeight: '700' },
  subtitle: { color: '#666', fontSize: 12 },
  description: { color: '#444', fontSize: 12 },
})
