export type User = {
  id: number;
  fullName: string;
  email: string;
  role: "ADMIN" | "JOBSEEKER";
  createdAt: string;
};
