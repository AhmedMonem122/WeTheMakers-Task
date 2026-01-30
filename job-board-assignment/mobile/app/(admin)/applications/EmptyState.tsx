import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function EmptyState() {
  return (
    <View style={styles.container}>
      <Text>No applications found.</Text>
    </View>
  )
}

const styles = StyleSheet.create({ container: { padding: 16 } })
