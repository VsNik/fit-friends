import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Role, TrainingFilter, TrainingOrderFilter } from '@fit-friends/libs/types';
import { TrainingsService } from './trainings.service';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UserId } from '../auth/decorators/user-id.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { RoleGuard } from '../auth/guards/role.guard';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('trainings')
export class TrainingsController {
  constructor(private readonly trainingsService: TrainingsService) {}

  @Roles(Role.Coach)
  @UseGuards(RoleGuard)
  @Get()
  async trainingList(@UserId() coachId: string, @Query() query: TrainingFilter) {
    const filters = plainToInstance(TrainingFilter, query);
    const [data, count] = await this.trainingsService.all(coachId, filters);
    return {
      data,
      page: filters.page,
      total: count,
    };
  }

  @Roles(Role.Coach)
  @UseGuards(RoleGuard)
  @Get('orders')
  async ordersList(@UserId() coachId: string, @Query() query: TrainingOrderFilter) {
    const filter = plainToInstance(TrainingOrderFilter, query);
    const [data, count] = await this.trainingsService.getTrainingsOrders(coachId, filter);
    return {
      data,
      page: filter.page,
      total: count,
    };
  }

  @Roles(Role.Coach)
  @UseGuards(RoleGuard)
  @Post()
  create(@Body() dto: CreateTrainingDto, @UserId() coachId: string) {
    return this.trainingsService.create(dto, coachId);
  }

  @Roles(Role.Coach)
  @UseGuards(RoleGuard)
  @Patch(':id')
  update(@Body() dto: UpdateTrainingDto, @Param('id') trainingId: string, @UserId() coachId: string) {
    return this.trainingsService.update(dto, trainingId, coachId);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  show(@Param('id') trainingId: string) {
    return this.trainingsService.getTraining(trainingId);
  }
}
