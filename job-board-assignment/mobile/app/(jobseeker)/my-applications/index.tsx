import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'

type App = { id: string; jobTitle: string }

export default function MyApplicationsScreen() {
  const data: App[] = []
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Applications</Text>
      <FlatList data={data} renderItem={({ item }) => <Text>{item.jobTitle}</Text>} keyExtractor={(i) => i.id} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 20, fontWeight: '700' },
})
