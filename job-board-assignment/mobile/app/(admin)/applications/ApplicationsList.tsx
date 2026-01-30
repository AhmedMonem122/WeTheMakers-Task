import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import ApplicationsCard from './ApplicationsCard'

export default function ApplicationsList({ data }: { data: any[] | undefined }) {
  return (
    <FlatList
      data={data ?? []}
      keyExtractor={(item) => String(item?.id ?? Math.random())}
      renderItem={({ item }: { item: any }) => <ApplicationsCard item={item} />}
    />
  )
}
