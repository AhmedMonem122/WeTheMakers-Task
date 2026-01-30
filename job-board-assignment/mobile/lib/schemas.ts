import { z } from "zod";

// Auth Schemas
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  // confirmPassword: z.string(),
});
// .refine((data) => data.password === data.confirmPassword, {
//   message: "Passwords don't match",
//   path: ["confirmPassword"],
// });

// Job Schemas
export const jobSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  // company: z.string().min(2, "Company name must be at least 2 characters"),
  location: z.string().min(2, "Location is required"),
  status: z.enum(["OPEN", "CLOSED"]),
  salary: z.number().optional(),
  description: z.string().min(10, "Description must be at least 10 characters"),
  // requirements: z
  //   .string()
  //   .min(10, "Requirements must be at least 10 characters"),
});

// Application Schema
export const applicationSchema = z.object({
  resumeText: z.string().min(10, "Resume text is required"),
  coverLetter: z
    .string()
    .min(10, "Cover letter must be at least 10 characters"),
});

// Types
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type JobFormData = z.infer<typeof jobSchema>;
export type ApplicationFormData = z.infer<typeof applicationSchema>;

// Response Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "JOBSEEKER";
  createdAt: string;
}

export interface Job {
  id: string;
  title: string;
  // company: string;
  location: string;
  status: "OPEN" | "CLOSED";
  salary: number;
  description: string;
  // requirements: string;
  postedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Application {
  id: string;
  jobId: string;
  userId: string;
  resume: string;
  coverLetter: string;
  status: "pending" | "reviewing" | "accepted" | "rejected";
  createdAt: string;
  job?: Job;
  user?: User;
}

export interface AuthResponse {
  accessToken: string;
}
