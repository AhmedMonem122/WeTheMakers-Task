import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { colors } from '../../styles/tokens'

export default function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 12, paddingVertical: 8, borderBottomWidth: 1, borderColor: colors.border, backgroundColor: colors.bg },
  title: { fontSize: 18, fontWeight: '700', color: colors.text },
  subtitle: { fontSize: 12, color: colors.muted },
})
