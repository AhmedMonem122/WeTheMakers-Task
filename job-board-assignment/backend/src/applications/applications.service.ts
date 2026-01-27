import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateApplicationDto } from './dto/create-application.dto';

@Injectable()
export class ApplicationsService {
  constructor(private prisma: PrismaService) {}

  async create(jobId: number, userId: number, dto: CreateApplicationDto) {
    await this.prisma.job.findUniqueOrThrow({ where: { id: jobId } });

    return this.prisma.application.create({
      data: {
        jobId,
        userId,
        resumeText: dto.resumeText,
        coverLetter: dto.coverLetter
      }
    });
  }

  async findAll() {
    return this.prisma.application.findMany({
      include: {
        job: { select: { id: true, title: true } },
        user: { select: { id: true, fullName: true, email: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async findByUser(userId: number) {
    return this.prisma.application.findMany({
      where: { userId },
      include: {
        job: { select: { id: true, title: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async findOne(id: number) {
    const app = await this.prisma.application.findUnique({
      where: { id },
      include: {
        job: { select: { id: true, title: true } },
        user: { select: { id: true, fullName: true, email: true } }
      }
    });
    if (!app) {
      throw new NotFoundException(`Application with id ${id} not found`);
    }
    return app;
  }
}


