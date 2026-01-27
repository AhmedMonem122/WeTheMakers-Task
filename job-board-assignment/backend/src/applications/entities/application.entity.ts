export enum ApplicationStatus {
  SUBMITTED = 'SUBMITTED',
  REVIEWED = 'REVIEWED',
  REJECTED = 'REJECTED'
}

export interface ApplicationEntity {
  id: number;
  jobId: number;
  userId: number;
  resumeText: string;
  coverLetter: string;
  status: ApplicationStatus;
  createdAt: Date;
}


