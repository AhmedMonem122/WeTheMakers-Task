import React from 'react'
import { View, StyleSheet } from 'react-native'

export default function ApplicationsSkeleton() {
  return (
    <View style={styles.skeleton} />
  )
}

const styles = StyleSheet.create({
  skeleton: { height: 60, marginVertical: 6, backgroundColor: '#e5e7eb', borderRadius: 6 },
})
