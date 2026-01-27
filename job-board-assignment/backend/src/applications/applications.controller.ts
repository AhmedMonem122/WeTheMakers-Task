import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.enum';

@Controller()
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  // Job seeker: apply
  @Post('jobs/:jobId/applications')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.JOBSEEKER)
  create(@Param('jobId') jobId: string, @Body() dto: CreateApplicationDto, @Req() req: any) {
    return this.applicationsService.create(Number(jobId), req.user.userId, dto);
  }

  // Job seeker: list own apps
  @Get('me/applications')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.JOBSEEKER)
  findMine(@Req() req: any) {
    return this.applicationsService.findByUser(req.user.userId);
  }

  // Admin: list all
  @Get('admin/applications')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  findAll() {
    return this.applicationsService.findAll();
  }

  // Admin: single application
  @Get('admin/applications/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  findOne(@Param('id') id: string) {
    return this.applicationsService.findOne(Number(id));
  }
}


