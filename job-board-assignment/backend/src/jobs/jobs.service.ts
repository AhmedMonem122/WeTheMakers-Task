import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JobStatus } from './entities/job.entity';

@Injectable()
export class JobsService {
  constructor(private prisma: PrismaService) {}

  create(createJobDto: CreateJobDto, creatorId: number) {
    return this.prisma.job.create({
      data: {
        title: createJobDto.title,
        description: createJobDto.description,
        location: createJobDto.location,
        salary: createJobDto.salary,
        status: createJobDto.status ?? JobStatus.OPEN,
        createdBy: creatorId
      }
    });
  }

  async findAll(params: {
    page?: number;
    pageSize?: number;
    location?: string;
    status?: JobStatus;
    search?: string;
  }) {
    const page = params.page && params.page > 0 ? params.page : 1;
    const pageSize = params.pageSize && params.pageSize > 0 ? params.pageSize : 10;
    const skip = (page - 1) * pageSize;

    const where: any = {};

    if (params.location) {
      where.location = { contains: params.location, mode: 'insensitive' };
    }
    if (params.status) {
      where.status = params.status;
    }
    if (params.search) {
      where.OR = [
        { title: { contains: params.search, mode: 'insensitive' } },
        { description: { contains: params.search, mode: 'insensitive' } }
      ];
    }

    const [items, total] = await this.prisma.$transaction([
      this.prisma.job.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' }
      }),
      this.prisma.job.count({ where })
    ]);

    return {
      items,
      total,
      page,
      pageSize
    };
  }

  async findOne(id: number) {
    const job = await this.prisma.job.findUnique({ where: { id } });
    if (!job) {
      throw new NotFoundException(`Job with id ${id} not found`);
    }
    return job;
  }

  async update(id: number, dto: UpdateJobDto) {
    await this.findOne(id);
    return this.prisma.job.update({
      where: { id },
      data: {
        title: dto.title,
        description: dto.description,
        location: dto.location,
        salary: dto.salary,
        status: dto.status
      }
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.job.delete({ where: { id } });
  }
}


