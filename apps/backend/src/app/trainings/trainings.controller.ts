import { Body, Controller, Get, Param, Patch, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { FileInterceptor } from '@nestjs/platform-express';
import { ExpressFile, ITraining, Role, TrainingFilter, TrainingOrderFilter } from '@fit-friends/libs/types';
import { fillObject } from '@fit-friends/libs/utils';
import { TrainingCollectionRdo, TrainingRdo, TrainingStatisticRdo, UserRdo } from '@fit-friends/libs/rdo';
import { VideoValidatePipe } from '@fit-friends/libs/pipes';
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

  // Каталог тренировок
  @UseGuards(AuthGuard)
  @Get()
  async list(@Query() query: TrainingFilter): Promise<TrainingCollectionRdo> {
    const filter = plainToInstance(TrainingFilter, query);
    const [data, total] = await this.trainingsService.list(filter);
    return fillObject(TrainingCollectionRdo, {
      data: data.map((training) => this.mapTraining(training)),
      page: filter.page,
      total,
    });
  }

  // Список тренировок тренера
  @Roles(Role.Coach)
  @UseGuards(RoleGuard)
  @Get('list-coach')
  async listCoach(@UserId() coachId: string, @Query() query: TrainingFilter): Promise<TrainingCollectionRdo> {
    const filter = plainToInstance(TrainingFilter, query);
    const [data, total] = await this.trainingsService.listCoach(coachId, filter);
    return fillObject(TrainingCollectionRdo, {
      data: data.map((training) => this.mapTraining(training)),
      page: filter.page,
      total,
    });
  }

  // Мои заказы
  @Roles(Role.Coach)
  @UseGuards(RoleGuard)
  @Get('orders')
  async ordersListCoach(@UserId() coachId: string, @Query() query: TrainingOrderFilter): Promise<TrainingCollectionRdo> {
    const filter = plainToInstance(TrainingOrderFilter, query);
    const [data, total] = await this.trainingsService.getTrainingsOrders(coachId, filter);
    return fillObject(TrainingCollectionRdo, {
      data: data.map((training) => fillObject(TrainingStatisticRdo, { ...training, coach: fillObject(UserRdo, training.coach) })),
      page: filter.page,
      total,
    });
  }

  // Создание тренировки
  @Roles(Role.Coach)
  @UseGuards(RoleGuard)
  @UseInterceptors(FileInterceptor('video'))
  @Post()
  async create(
    @Body() dto: CreateTrainingDto,
    @UserId() coachId: string,
    @UploadedFile(new VideoValidatePipe()) video: ExpressFile,
  ): Promise<TrainingRdo> {
    const training = await this.trainingsService.create(dto, coachId, video);
    return this.mapTraining(training);
  }

  // Редактирование тренировки
  @Roles(Role.Coach)
  @UseGuards(RoleGuard)
  @UseInterceptors(FileInterceptor('video'))
  @Patch(':id')
  async update(
    @Body() dto: UpdateTrainingDto,
    @Param('id') trainingId: string,
    @UserId() coachId: string,
    @UploadedFile(new VideoValidatePipe(true)) video: ExpressFile,
  ): Promise<TrainingRdo> {
    const training = await this.trainingsService.update(dto, trainingId, coachId, video);
    return this.mapTraining(training);
  }

  // Детальная информация о тренировке
  @UseGuards(AuthGuard)
  @Get(':id')
  async show(@Param('id') trainingId: string): Promise<TrainingRdo> {
    const training = await this.trainingsService.getTraining(trainingId);
    return this.mapTraining(training);
  }

  private mapTraining(training: ITraining): TrainingRdo {
    return fillObject(TrainingRdo, { ...training, coach: fillObject(UserRdo, training.coach) });
  }
}
