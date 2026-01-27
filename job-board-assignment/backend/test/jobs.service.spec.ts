import { JobsService } from '../src/jobs/jobs.service';
import { CreateJobDto } from '../src/jobs/dto/create-job.dto';
import { JobStatus } from '../src/jobs/entities/job.entity';

describe('JobsService', () => {
  let service: JobsService;
  let prisma: any;

  beforeEach(() => {
    prisma = {
      job: {
        create: jest.fn(),
        findMany: jest.fn(),
        count: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
      },
      $transaction: jest.fn(async (promises: any[]) => {
        const [items, total] = await Promise.all(promises);
        return [items, total];
      })
    };

    service = new JobsService(prisma);
  });

  it('should create a job', async () => {
    const dto: CreateJobDto = {
      title: 'Backend Engineer',
      description: 'Build APIs',
      location: 'Remote',
      salary: 60000,
      status: JobStatus.OPEN
    };

    const createdJob = {
      id: 1,
      title: dto.title,
      description: dto.description,
      location: dto.location,
      salary: dto.salary,
      status: dto.status,
      createdBy: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    prisma.job.create.mockResolvedValue(createdJob);

    const job = await service.create(dto, 1);
    expect(prisma.job.create).toHaveBeenCalled();
    expect(job.id).toBe(1);
    expect(job.title).toBe(dto.title);
  });

  it('should filter jobs by search', async () => {
    const jobs = [
      {
        id: 1,
        title: 'Backend Engineer',
        description: 'Build APIs',
        location: 'Remote',
        salary: 60000,
        status: JobStatus.OPEN,
        createdBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        title: 'Frontend Engineer',
        description: 'Build UIs',
        location: 'Onsite',
        salary: 50000,
        status: JobStatus.OPEN,
        createdBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    prisma.job.findMany.mockResolvedValue([jobs[0]]);
    prisma.job.count.mockResolvedValue(1);

    const result = await service.findAll({ search: 'backend' });
    expect(prisma.job.findMany).toHaveBeenCalled();
    expect(result.items).toHaveLength(1);
    expect(result.items[0].title).toBe('Backend Engineer');
  });
});

