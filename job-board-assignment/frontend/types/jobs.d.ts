export interface Job {
  id: number;
  title: string;
  description: string;
  location: string;
  salary: number;
  status: "OPEN" | "CLOSED";
  createdAt: string;
}
