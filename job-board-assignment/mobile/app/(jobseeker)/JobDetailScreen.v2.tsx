import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { useNavigation, RouteProp } from "@react-navigation/native";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";

type Props = { route: { params: { id: string } } };

export default function JobDetailScreen({ route }: Props) {
  const { id } = route.params;
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <PageHeader title={`Job #${id}`} />
      <Text style={styles.subtitle}>Location: Remote</Text>
      <Text style={styles.desc}>Job description details go here.</Text>
      <Button
        title="Apply"
        onPress={() => navigation.navigate("Apply" as any, { id })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  subtitle: { fontSize: 14, color: "#666", marginVertical: 6 },
  desc: { fontSize: 14, color: "#444" },
});
