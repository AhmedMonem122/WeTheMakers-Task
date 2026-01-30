import React from 'react'
import { View, Text, Button as RNButton, Platform } from 'react-native'
import * as DocumentPicker from 'expo-document-picker'
import * as FileSystem from 'expo-file-system'

export default function ResumeUploaderRN({ onPick }: { onPick?: (uri: string, name: string) => void }) {
  const pick = async () => {
    const res = await DocumentPicker.getDocumentAsync({ type: [ 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ] })
    if (res.type === 'success' && res.uri) {
      const name = res.name ?? 'resume'
      onPick?.(res.uri, name)
    }
  }
  return (
    <View>
      <RNButton title="Upload Resume" onPress={pick} />
    </View>
  )
}
