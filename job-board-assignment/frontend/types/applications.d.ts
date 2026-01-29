export interface Application {
  id: number;
  jobId: number;
  resumeText: string;
  coverLetter: string;
  status: string;
  createdAt: string;
  job: {
    id: number;
    title: string;
  };
}
