import React, { useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  fetchAdminJobById,
  createAdminJob,
  updateAdminJob,
} from "../../lib/admin-jobs";
import { useRoute, useNavigation } from "@react-navigation/native";
import { colors } from "@/styles/tokens";
import Button from "@/components/ui/Button";
import PageHeader from "@/components/ui/PageHeader";

const JobSchema = z.object({
  title: z.string().min(1, "Title required"),
  description: z.string().min(1, "Description required"),
  location: z.string().min(1, "Location required"),
  salary: z.number().positive("Salary must be positive").optional(),
  status: z.enum(["OPEN", "CLOSED"]),
});

type FormData = z.infer<typeof JobSchema>;

export default function AdminJobFormScreen() {
  const route = useRoute();
  const id = (route.params as any)?.id;
  const navigation = useNavigation();
  const { control, handleSubmit, reset, formState } = useForm<FormData>({
    resolver: zodResolver(JobSchema),
  });

  useEffect(() => {
    const load = async () => {
      if (id) {
        try {
          const data = await fetchAdminJobById(id);
          reset({
            title: data.title,
            description: data.description,
            location: data.location,
            salary: data.salary,
            status: data.status,
          });
        } catch {
          // ignore
        }
      }
    };
    load();
  }, [id, reset]);

  const onSubmit = async (payload: FormData) => {
    try {
      if (id) {
        await updateAdminJob(id, payload);
      } else {
        await createAdminJob(payload);
      }
      Alert.alert("Success", "Job saved");
      navigation.goBack();
    } catch {
      Alert.alert("Error", "Failed to save");
    }
  };

  return (
    <View style={styles.container}>
      <PageHeader title={id ? "Edit Job" : "Create Job"} />
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={value}
            onChangeText={onChange}
            multiline
          />
        )}
      />
      <Controller
        control={control}
        name="location"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Location"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      <Controller
        control={control}
        name="salary"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Salary"
            value={String(value ?? "")}
            onChangeText={(t) => onChange(Number(t))}
            keyboardType="numeric"
          />
        )}
      />
      <Controller
        control={control}
        name="status"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Status (OPEN/CLOSED)"
            value={String(value ?? "")}
            onChangeText={onChange}
          />
        )}
      />
      <Button
        title={formState.isSubmitting ? "Saving..." : "Save Job"}
        onPress={handleSubmit(onSubmit)}
        loading={formState.isSubmitting}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: {
    height: 40,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginVertical: 6,
    backgroundColor: colors.bg,
    color: colors.text,
  },
});
