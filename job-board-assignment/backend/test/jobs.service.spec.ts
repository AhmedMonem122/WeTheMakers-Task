import { JobsService } from '../src/jobs/jobs.service';
import { CreateJobDto } from '../src/jobs/dto/create-job.dto';

describe('JobsService', () => {
  let service: JobsService;

  beforeEach(() => {
    service = new JobsService();
  });

  it('should create a job', () => {
    const dto: CreateJobDto = {
      title: 'Backend Engineer',
      description: 'Build APIs',
      company: 'WeTheMakers',
      location: 'Remote',
      isRemote: true,
      tags: ['node', 'nest']
    };

    const job = service.create(dto);
    expect(job.id).toBeDefined();
    expect(job.title).toBe(dto.title);
    expect(service.findAll().length).toBe(1);
  });

  it('should filter jobs by search', () => {
    service.create({
      title: 'Backend Engineer',
      description: 'Build APIs',
      company: 'WeTheMakers',
      location: 'Remote',
      isRemote: true,
      tags: []
    });
    service.create({
      title: 'Frontend Engineer',
      description: 'Build UIs',
      company: 'Other',
      location: 'Onsite',
      isRemote: false,
      tags: []
    });

    const result = service.findAll({ search: 'backend' });
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Backend Engineer');
  });
});

