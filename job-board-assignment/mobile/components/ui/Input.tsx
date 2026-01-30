import React from 'react'
import { TextInput, View, Text, StyleSheet } from 'react-native'

type Props = {
  value?: string
  onChangeText?: (t: string) => void
  placeholder?: string
  secureTextEntry?: boolean
  keyboardType?: any
  label?: string
}

export default function Input({ value, onChangeText, placeholder, secureTextEntry, keyboardType, label }: Props) {
  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        style={styles.input}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { marginVertical: 6 },
  label: { fontSize: 12, color: '#555', marginBottom: 4 },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
})
