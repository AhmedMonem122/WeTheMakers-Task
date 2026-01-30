import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

type Props = {
  onPress?: () => void
  title: string
  loading?: boolean
}

export default function Button({ onPress, title, loading }: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.btn} disabled={!!loading}>
      <Text style={styles.text}>{loading ? 'Loading...' : title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  text: { color: '#fff', fontWeight: '600' },
})
