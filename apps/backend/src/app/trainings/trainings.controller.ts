import { Body, Controller, Get, Param, Patch, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { FileInterceptor } from '@nestjs/platform-express';
import { ExpressFile, ITraining, Role, SortDirection, StatisticSorting, TrainingDuration, TrainingFilter, TrainingOrderFilter, TrainingSorting, TrainingType } from '@fit-friends/libs/types';
import { fillObject, getLimit } from '@fit-friends/libs/utils';
import { TrainingCollectionRdo, TrainingRdo, TrainingStatisticCollectionRdo, TrainingStatisticRdo, UserRdo } from '@fit-friends/libs/rdo';
import { VideoValidatePipe } from '@fit-friends/libs/pipes';
import { TrainingsService } from './trainings.service';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UserId } from '../auth/decorators/user-id.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { RoleGuard } from '../auth/guards/role.guard';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ApiBearerAuth, ApiConsumes, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Trainings')
@ApiBearerAuth()
@Controller('trainings')
export class TrainingsController {
  constructor(private readonly trainingsService: TrainingsService) {}

  @ApiQuery({name: 'limit', required: false, type: Number})
  @ApiQuery({name: 'page', required: false, type: Number})
  @ApiQuery({name: 'sorting', required: false, enum: TrainingSorting})
  @ApiQuery({name: 'direction', required: false, enum: SortDirection})
  @ApiQuery({name: 'priceTo', required: false, type: Number})
  @ApiQuery({name: 'priceFrom', required: false, type: Number})
  @ApiQuery({name: 'caloriesTo', required: false, type: Number})
  @ApiQuery({name: 'caloriesFrom', required: false, type: Number})
  @ApiQuery({name: 'rating', required: false, type: Number})
  @ApiQuery({name: 'type', required: false, enum: TrainingType})
  @ApiOkResponse({type: TrainingCollectionRdo})
  @ApiOperation({ summary: 'Каталог тренировок' })
  @UseGuards(AuthGuard)
  @Get()
  async list(@Query() query: TrainingFilter): Promise<TrainingCollectionRdo> {
    const limit = getLimit(query.limit);
    const filter = plainToInstance(TrainingFilter, { ...query, limit });
    const [data, total] = await this.trainingsService.list(filter);
    return fillObject(TrainingCollectionRdo, {
      data: data.map((training) => this.mapTraining(training)),
      page: filter.page,
      total,
    });
  }

  @ApiQuery({name: 'limit', required: false, type: Number})
  @ApiQuery({name: 'page', required: false, type: Number})
  @ApiQuery({name: 'direction', required: false, enum: SortDirection})
  @ApiQuery({name: 'priceTo', required: false, type: Number})
  @ApiQuery({name: 'priceFrom', required: false, type: Number})
  @ApiQuery({name: 'caloriesTo', required: false, type: Number})
  @ApiQuery({name: 'caloriesFrom', required: false, type: Number})
  @ApiQuery({name: 'rating', required: false, type: Number})
  @ApiQuery({name: 'duration', required: false, enum: TrainingDuration})
  @ApiOkResponse({type: TrainingCollectionRdo})
  @ApiOperation({ summary: 'Список тренировок тренера' })
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

  @ApiQuery({name: 'limit', required: false, type: Number})
  @ApiQuery({name: 'page', required: false, type: Number})
  @ApiQuery({name: 'sorting', required: false, enum: StatisticSorting})
  @ApiQuery({name: 'direction', required: false, enum: SortDirection})
  @ApiOkResponse({type: TrainingStatisticCollectionRdo})
  @ApiOperation({ summary: 'Заказы тренера' })
  @Roles(Role.Coach)
  @UseGuards(RoleGuard)
  @Get('orders')
  async ordersListCoach(@UserId() coachId: string, @Query() query: TrainingOrderFilter): Promise<TrainingStatisticCollectionRdo> {
    const limit = getLimit(query.limit);
    const filter = plainToInstance(TrainingOrderFilter, { ...query, limit });
    const [data, total] = await this.trainingsService.getTrainingsOrders(coachId, filter);
    return fillObject(TrainingStatisticCollectionRdo, {
      data: data.map((training) => fillObject(TrainingStatisticRdo, { ...training, coach: fillObject(UserRdo, training.coach) })),
      page: filter.page,
      total,
    });
  }

  @ApiCreatedResponse({type: TrainingRdo})
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Создание тренировки' })
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

  @ApiOkResponse({type: TrainingRdo})
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Редактирование тренировки' })
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

  @ApiOkResponse({type: TrainingRdo})
  @ApiOperation({ summary: 'Детальная информация о тренировке' })
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
