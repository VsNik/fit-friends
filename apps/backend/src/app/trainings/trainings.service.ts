import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { TrainingsFilter } from '@fit-friends/libs/types';
import { ITrainingsRepository, TRAININGS_REPO } from './entities/trainings-repository.interface';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UsersService } from '../users/users.service';
import { TrainingEntity } from './entities/training.entity';
import { ITraining } from './training.interface';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { FilesService } from '../files/files.service';

const NOT_OWNER_ERROR = 'Your is not owner this training';

@Injectable()
export class TrainingsService {
  constructor(
    @Inject(TRAININGS_REPO)
    private readonly trainingsRepository: ITrainingsRepository,
    private readonly usersService: UsersService,
    private readonly filesService: FilesService,
  ) {}

  async all(coachId: string, filters: TrainingsFilter): Promise<[ITraining[], number]> {
    const [data, count] = await this.trainingsRepository.all(coachId, filters);
    return [data.map((item) => item.toObject()), count];
  }

  async create(dto: CreateTrainingDto, coachId: string): Promise<ITraining> {
    const coach = await this.usersService.getUser(coachId);
    const bgImage = await this.filesService.getRandomBgTraining();
    const trainingEntity = TrainingEntity.create({ ...dto, coach, bgImage });
    const savedTraining = await this.trainingsRepository.create(trainingEntity);
    return savedTraining.toObject();
  }

  async getTraining(trainingId: string): Promise<ITraining> {
    const existTraining = await this.trainingsRepository.get(trainingId);
    return existTraining.toObject();
  }

  async update(dto: UpdateTrainingDto, trainingId: string, coachId: string): Promise<ITraining> {
    const existTraining = await this.trainingsRepository.get(trainingId);
    const coach = await this.usersService.getUser(coachId);

    if (existTraining.coach.id !== coach.id) {
      throw new BadRequestException(NOT_OWNER_ERROR);
    }

    Object.assign(existTraining, dto);
    const updatedTraining = await this.trainingsRepository.update(existTraining);
    return updatedTraining.toObject();
  }
}
