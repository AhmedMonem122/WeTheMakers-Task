import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function ErrorState({ message }: { message?: string }) {
  return (
    <View style={styles.container}>
      <Text>{message ?? 'Something went wrong'}</Text>
    </View>
  )
}

const styles = StyleSheet.create({ container: { padding: 16 } })
