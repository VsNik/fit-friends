import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ExpressFile } from '@fit-friends/libs/types';
import { ITraining, UploadType } from '@fit-friends/shared';
import { TrainingFilter, TrainingOrderFilter } from '@fit-friends/filters';
import { AppEvent } from '@fit-friends/libs/constants';
import { getRandomBg } from '@fit-friends/libs/utils';
import { ITrainingsRepository, TRAININGS_REPO } from './entities/trainings-repository.interface';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UsersService } from '../users/users.service';
import { TrainingEntity } from './entities/training.entity';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { FilesService } from '../files/files.service';
import { TrainingCreatedEvent } from './events/training-created.event';
import { OtherError } from '@fit-friends/libs/validation';

@Injectable()
export class TrainingsService {
  constructor(
    @Inject(TRAININGS_REPO)
    private readonly trainingsRepository: ITrainingsRepository,
    private readonly usersService: UsersService,
    private readonly filesService: FilesService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async list(filters: TrainingFilter): Promise<[ITraining[], number]> {
    const [data, count] = await this.trainingsRepository.getManyByCoachId(filters);
    return [data.map((item) => item.toObject()), count];
  }

  async listCoach(coachId: string, filters: TrainingFilter): Promise<[ITraining[], number]> {
    const [data, count] = await this.trainingsRepository.getManyByCoachId(filters, coachId);
    return [data.map((item) => item.toObject()), count];
  }

  async getTrainingsOrders(coachId: string, filter: TrainingOrderFilter): Promise<[ITraining[], number]> {
    const [data, count] = await this.trainingsRepository.getManyByCoachIdFromOrders(coachId, filter);
    return [data.map((item) => item.toObject()), count];
  }

  async create(dto: CreateTrainingDto, coachId: string, fileVideo: ExpressFile): Promise<ITraining> {
    const coach = await this.usersService.getUser(coachId);
    const bgImage = getRandomBg(UploadType.BgTraining);
    const video = await this.filesService.upload(fileVideo, UploadType.Video);
    const trainingEntity = TrainingEntity.create({ ...dto, coach, bgImage, video });
    const savedTraining = await this.trainingsRepository.save(trainingEntity);

    const subscriberList = coach.subscribers.map((user) => user.email);
    console.log(subscriberList);

    if (subscriberList.length) {
      this.eventEmitter.emit(
        AppEvent.TrainingCreated,
        new TrainingCreatedEvent(
          subscriberList,
          coach.id,
          coach.name,
          trainingEntity.title,
          trainingEntity.bgImage,
        ),
      );
    }

    return savedTraining.toObject();
  }

  async update(dto: UpdateTrainingDto, trainingId: string, coachId: string, fileVideo: ExpressFile): Promise<ITraining> {
    const existTraining = await this.trainingsRepository.get(trainingId);
    const coach = await this.usersService.getUser(coachId);

    if (existTraining.coach.id !== coach.id) {
      throw new BadRequestException(OtherError.NotOwner);
    }

    Object.assign(existTraining, dto);

    if (fileVideo) {
      await this.filesService.delete(existTraining.video);
      existTraining.video = await this.filesService.upload(fileVideo, UploadType.Video);
    }

    const updatedTraining = await this.trainingsRepository.update(existTraining);
    return updatedTraining.toObject();
  }

  async getTraining(trainingId: string): Promise<ITraining> {
    const existTraining = await this.trainingsRepository.get(trainingId);
    return existTraining.toObject();
  }

  async findById(id: string): Promise<TrainingEntity> {
    return this.trainingsRepository.findById(id);
  }

  async updateTraining(training: TrainingEntity) {
    await this.trainingsRepository.update(training);
  }

  async getPopular(): Promise<[ITraining[], number]> {
    const [data, count] = await this.trainingsRepository.getPopular()
    return [data.map((item) => item.toObject()), count];
  }

  async getSpecial(): Promise<[ITraining[], number]> {
    const [data, count] = await this.trainingsRepository.getSpecial()
    return [data.map((item) => item.toObject()), count];
  }

  async getForUser(currentUserId: string): Promise<[ITraining[], number]>  {
    const currentUser = await this.usersService.getUser(currentUserId);
    const {trainingType, trainingLevel, trainingDuration} = currentUser;
    const data = await this.trainingsRepository.getForUser(trainingType, trainingLevel, trainingDuration);

    const trainings = data.map((training) => {
      let priority = 0;

      if (trainingType.includes(training.type)) {
        priority ++;
      }

      if (training.level === trainingLevel) {
        priority ++;
      }

      if (training.duration === trainingDuration) {
        priority ++;
      }

      return {...training, priority};
    })

    const sorted = trainings.sort((a, b) => a.priority < b.priority ? 1 : -1);

    return [sorted, sorted.length];
  }

  async removeVideo(id: string, src: string): Promise<ITraining> {
    const existTraining = await this.trainingsRepository.get(id);
    existTraining.video = '';
    await this.filesService.delete(src);
    await this.trainingsRepository.update(existTraining);
    return existTraining.toObject();
  }

  async saveVideo(id: string, videoFile: ExpressFile): Promise<ITraining> {
    const existTraining = await this.trainingsRepository.get(id);
    const video = await this.filesService.upload(videoFile, UploadType.Video);
    existTraining.video = video;
    await this.trainingsRepository.update(existTraining);
    return existTraining.toObject();
  }
}
