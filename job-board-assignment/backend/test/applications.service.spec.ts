import { ApplicationsService } from '../src/applications/applications.service';
import { JobsService } from '../src/jobs/jobs.service';

describe('ApplicationsService', () => {
  let jobsService: JobsService;
  let service: ApplicationsService;

  beforeEach(() => {
    jobsService = new JobsService();
    const job = jobsService.create({
      title: 'Backend Engineer',
      description: 'Build APIs',
      company: 'WeTheMakers',
      location: 'Remote',
      isRemote: true,
      tags: []
    });

    service = new ApplicationsService(jobsService);

    // Ensure at least one job exists
    expect(job.id).toBeDefined();
  });

  it('should create an application for a job', () => {
    const job = jobsService.findAll()[0];

    const app = service.create(job.id, {
      fullName: 'Ahmed',
      email: 'ahmed@example.com',
      coverLetter: 'I am interested'
    });

    expect(app.id).toBeDefined();
    expect(app.jobId).toBe(job.id);
    expect(service.findAll()).toHaveLength(1);
  });
});

