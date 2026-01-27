export enum JobStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED'
}

export interface JobEntity {
  id: number;
  title: string;
  description: string;
  location: string;
  salary?: number;
  status: JobStatus;
  createdBy: number;
  createdAt: Date;
  updatedAt: Date;
}


