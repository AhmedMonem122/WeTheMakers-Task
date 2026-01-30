import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { useNavigation, RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

type RouteParams = { id: string }
type NavProps = {
  route: { params: RouteParams }
  navigation: any
}

type Props = { route: { params: { id: string } } }

export default function JobDetailScreen({ route }: any) {
  const { id } = route.params
  // In a real app, fetch job detail by id
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Job #{id}</Text>
      <Text style={styles.subtitle}>Location: Remote</Text>
      <Text style={styles.desc}>Job description details go here.</Text>
      <Button title="Apply" onPress={() => navigation.navigate('Apply' as any, { id })} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 20, fontWeight: '700' },
  subtitle: { fontSize: 14, color: '#666' },
  desc: { fontSize: 14, marginTop: 8 },
})
