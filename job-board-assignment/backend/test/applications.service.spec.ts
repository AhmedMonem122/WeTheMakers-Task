import { ApplicationsService } from '../src/applications/applications.service';

describe('ApplicationsService', () => {
  let service: ApplicationsService;
  let prisma: any;

  beforeEach(() => {
    prisma = {
      job: {
        findUniqueOrThrow: jest.fn().mockResolvedValue({ id: 1 })
      },
      application: {
        create: jest.fn(),
        findMany: jest.fn()
      }
    };

    service = new ApplicationsService(prisma);
  });

  it('should create an application for a job', async () => {
    const createdApp = {
      id: 1,
      jobId: 1,
      userId: 2,
      resumeText: 'My resume text',
      coverLetter: 'I am interested',
      status: 'SUBMITTED',
      createdAt: new Date()
    };

    prisma.application.create.mockResolvedValue(createdApp);

    const app = await service.create(1, 2, {
      resumeText: 'My resume text',
      coverLetter: 'I am interested'
    });

    expect(prisma.job.findUniqueOrThrow).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(prisma.application.create).toHaveBeenCalled();
    expect(app.id).toBe(1);
    expect(app.jobId).toBe(1);
  });
});

