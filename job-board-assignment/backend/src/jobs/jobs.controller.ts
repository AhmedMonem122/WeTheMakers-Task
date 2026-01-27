import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, UseGuards } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.enum';
import { RolesGuard } from '../auth/roles.guard';

@Controller()
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  // Public list with pagination & filters
  @Get('jobs')
  findAll(
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
    @Query('location') location?: string,
    @Query('status') status?: string,
    @Query('search') search?: string
  ) {
    return this.jobsService.findAll({
      page: Number(page),
      pageSize: Number(pageSize),
      location,
      status: status as any,
      search
    });
  }

  // Public details
  @Get('jobs/:id')
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(Number(id));
  }

  // Admin only CRUD
  @Post('admin/jobs')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  create(@Body() createJobDto: CreateJobDto, @Req() req: any) {
    return this.jobsService.create(createJobDto, req.user.userId);
  }

  @Patch('admin/jobs/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobsService.update(Number(id), updateJobDto);
  }

  @Delete('admin/jobs/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.jobsService.remove(Number(id));
  }
}


