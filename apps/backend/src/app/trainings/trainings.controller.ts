import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { FileInterceptor } from '@nestjs/platform-express';
import { ExpressFile } from '@fit-friends/libs/types';
import {
  ITraining,
  Role,
  SortDirection,
  StatisticSorting,
  TrainingDuration,
  TrainingSortDirection,
  TrainingSorting,
  TrainingType,
} from '@fit-friends/shared';
import { TrainingFilter, TrainingOrderFilter } from '@fit-friends/filters';
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
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { VideoDto } from './dto/video.dto';

@ApiTags('Trainings')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@Controller('trainings')
export class TrainingsController {
  constructor(private readonly trainingsService: TrainingsService) {}

  @ApiOperation({ summary: 'Каталог тренировок' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'sorting', required: false, enum: TrainingSorting })
  @ApiQuery({ name: 'direction', required: false, enum: TrainingSortDirection })
  @ApiQuery({ name: 'priceTo', required: false, type: Number })
  @ApiQuery({ name: 'priceFrom', required: false, type: Number })
  @ApiQuery({ name: 'caloriesTo', required: false, type: Number })
  @ApiQuery({ name: 'caloriesFrom', required: false, type: Number })
  @ApiQuery({ name: 'rating', required: false, type: Number })
  @ApiQuery({ name: 'type', required: false, enum: TrainingType })
  @ApiOkResponse({ type: TrainingCollectionRdo })
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

  @ApiOperation({ summary: 'Список популярных тренировок' })
  @ApiOkResponse({ type: TrainingCollectionRdo })
  @Roles(Role.User)
  @UseGuards(RoleGuard)
  @Get('popular')
  async popular(): Promise<TrainingCollectionRdo> {
    const [data, total] = await this.trainingsService.getPopular();
    return fillObject(TrainingCollectionRdo, {
      data: data.map((training) => this.mapTraining(training)),
      total,
    });
  }

  @ApiOperation({ summary: 'Список специальных предложений' })
  @ApiOkResponse({ type: TrainingCollectionRdo })
  @Roles(Role.User)
  @UseGuards(RoleGuard)
  @Get('special')
  async special(): Promise<TrainingCollectionRdo> {
    const [data, total] = await this.trainingsService.getSpecial();
    return fillObject(TrainingCollectionRdo, {
      data: data.map((training) => this.mapTraining(training)),
      total,
    });
  }

  @ApiOperation({ summary: 'Список тренировок тренера' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'direction', required: false, enum: SortDirection })
  @ApiQuery({ name: 'priceTo', required: false, type: Number })
  @ApiQuery({ name: 'priceFrom', required: false, type: Number })
  @ApiQuery({ name: 'caloriesTo', required: false, type: Number })
  @ApiQuery({ name: 'caloriesFrom', required: false, type: Number })
  @ApiQuery({ name: 'rating', required: false, type: Number })
  @ApiQuery({ name: 'duration', required: false, enum: TrainingDuration })
  @ApiOkResponse({ type: TrainingCollectionRdo })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @UseGuards(AuthGuard)
  @Get(':coachId/coach')
  async listCoach(@Param('coachId', new ParseUUIDPipe()) coachId: string, @Query() query: TrainingFilter): Promise<TrainingCollectionRdo> {
    const filter = plainToInstance(TrainingFilter, query);
    const [data, total] = await this.trainingsService.listCoach(coachId, filter);
    return fillObject(TrainingCollectionRdo, {
      data: data.map((training) => this.mapTraining(training)),
      page: filter.page,
      total,
    });
  }

  @ApiOperation({ summary: 'Заказы тренера' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'sorting', required: false, enum: StatisticSorting })
  @ApiQuery({ name: 'direction', required: false, enum: SortDirection })
  @ApiOkResponse({ type: TrainingStatisticCollectionRdo })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
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

  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Создание тренировки' })
  @ApiCreatedResponse({ type: TrainingRdo })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
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

  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Редактирование тренировки'})
  @ApiOkResponse({ type: TrainingRdo })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Roles(Role.Coach)
  @UseGuards(RoleGuard)
  @UseInterceptors(FileInterceptor('video'))
  @Patch(':id')
  async update(
    @Body() dto: UpdateTrainingDto,
    @Param('id', new ParseUUIDPipe()) trainingId: string,
    @UserId() coachId: string,
    @UploadedFile(new VideoValidatePipe(true)) video: ExpressFile,
  ): Promise<TrainingRdo> {
    const training = await this.trainingsService.update(dto, trainingId, coachId, video);
    return this.mapTraining(training);
  }

  @ApiOperation({ summary: 'Детальная информация о тренировке' })
  @ApiOkResponse({ type: TrainingRdo })
  @UseGuards(AuthGuard)
  @Get(':id')
  async show(@Param('id', new ParseUUIDPipe()) trainingId: string): Promise<TrainingRdo> {
    const training = await this.trainingsService.getTraining(trainingId);
    return this.mapTraining(training);
  }

  @ApiOperation({ summary: 'Загрузка видео тренировки'})
  @ApiOkResponse({ type: TrainingRdo })
  @UseInterceptors(FileInterceptor('video'))
  @Roles(Role.Coach)
  @UseGuards(RoleGuard)
  @Patch(':id/upload/video')
  async uploadVideo(@Param('id', new ParseUUIDPipe()) id: string, @UploadedFile(new VideoValidatePipe(true)) video: ExpressFile) {
    const training = await this.trainingsService.saveVideo(id, video);
    return this.mapTraining(training);
  }

  @ApiOperation({ summary: 'Удаление видео тренировки' })
  @ApiOkResponse({ type: TrainingRdo })
  @Roles(Role.Coach)
  @UseGuards(RoleGuard)
  @Patch(':id/remove/video')
  async removeVideo(@Param('id', new ParseUUIDPipe()) id: string, @Body() {src}: VideoDto) {
    const training = await this.trainingsService.removeVideo(id, src);
    return this.mapTraining(training);
  }

  private mapTraining(training: ITraining): TrainingRdo {
    return fillObject(TrainingRdo, { ...training, coach: fillObject(UserRdo, training.coach) });
  }
}
