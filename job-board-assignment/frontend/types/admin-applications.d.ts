export type AdminApplication = {
  id: number;
  jobId: number;
  userId: number;
  resumeText: string;
  coverLetter: string;
  status: "SUBMITTED" | "ACCEPTED" | "REJECTED";
  createdAt: string;
  job: {
    id: number;
    title: string;
  };
  user: {
    id: number;
    fullName: string;
    email: string;
  };
};
