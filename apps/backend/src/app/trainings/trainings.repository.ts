import { Injectable, NotFoundException } from '@nestjs/common';
import { ITrainingsRepository } from './entities/trainings-repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Training } from './models/training.model';
import { In, Repository, SelectQueryBuilder } from 'typeorm';
import { TrainingEntity } from './entities/training.entity';
import { ITraining, TrainingDuration, TrainingLevel, TrainingSortDirection, TrainingType } from '@fit-friends/shared';
import { TrainingFilter, TrainingOrderFilter } from '@fit-friends/filters';
import { AppError } from '@fit-friends/libs/validation';

const TrainingMaxCount = {
  Popular: 9,
  Special: 3, 
  ForUser: 9,
} as const;

@Injectable()
export class TrainingsRepository implements ITrainingsRepository {
  constructor(@InjectRepository(Training) private readonly repository: Repository<Training>) {}

  async get(id: string): Promise<TrainingEntity> {
    const training = await this.findById(id);
    if (!training) {
      throw new NotFoundException(AppError.TrainingNotFound);
    }
    return training;
  }

  async save(entity: TrainingEntity): Promise<TrainingEntity> {
    return this.repository.save(entity);
  }

  async findById(id: string): Promise<TrainingEntity | null> {
    const training = await this.repository.findOne({
      where: { id },
      relations: { coach: true, reviews: true },
    });
    return training ? TrainingEntity.create(training) : null;
  }

  async update(entity: TrainingEntity): Promise<TrainingEntity> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, reviews, ...toUpdate } = entity;
    await this.repository.update({ id }, toUpdate);
    return this.findById(id);
  }

  async getManyByCoachId(filters: TrainingFilter, coachId?: string): Promise<[TrainingEntity[], number]> {
    const { limit, page, priceTo, priceFrom, caloriesTo, caloriesFrom, ratingTo, ratingFrom, duration, type, sorting, direction } = filters;
    const qb = this.getQueryBuilder();

    if (coachId) {
      qb.andWhere('user.id = :coachId', { coachId });
    }

    if (priceTo && direction !== TrainingSortDirection.Free) {
      qb.andWhere('training.price >= :priceTo', { priceTo });
    }

    if (priceFrom && direction !== TrainingSortDirection.Free) {
      qb.andWhere('training.price <= :priceFrom', { priceFrom });
    }

    if (direction === TrainingSortDirection.Free) {
      qb.andWhere('training.price = :price', { price: 0 });
    }

    if (caloriesTo) {
      qb.andWhere('training.calories >= :caloriesTo', { caloriesTo });
    }

    if (caloriesFrom) {
      qb.andWhere('training.calories <= :caloriesFrom', { caloriesFrom });
    }

    if (ratingTo) {
      qb.andWhere('training.rating >= :ratingTo', { ratingTo });
    }

    if (ratingFrom) {
      qb.andWhere('training.rating <= :ratingFrom', { ratingFrom });
    }

    if (duration) {
      const durations = Array.isArray(duration) ? duration : [duration];
      qb.andWhere('training.duration IN (:...durations)', { durations });
    }

    if (type) {
      const types = Array.isArray(type) ? type : [type];
      qb.andWhere('training.type IN (:...types)', { types });
    }

    if (direction !== TrainingSortDirection.Free) {
      qb.orderBy(`training.${sorting}`, direction);
    }

    qb.limit(limit);
    qb.offset(limit * (page - 1));

    const [data, count] = await qb.getManyAndCount();
    return [data.map((training) => TrainingEntity.create(training)), count];
  }

  async getManyByCoachIdFromOrders(coachId: string, filter: TrainingOrderFilter): Promise<[TrainingEntity[], number]> {
    const { limit, page, sorting, direction } = filter;
    const qb = this.getQueryBuilder().andWhere('user.id = :coachId', { coachId }).andWhere('training.ordersCount > 0');

    qb.orderBy(`training.${sorting}`, direction);
    qb.limit(limit);
    qb.offset(limit * (page - 1));

    const [data, count] = await qb.getManyAndCount();
    return [data.map((training) => TrainingEntity.create(training)), count];
  }

  async getPopular(): Promise<[TrainingEntity[], number]> {
    const [data, count] = await this.repository.findAndCount({
      order: {
        rating: 'DESC',
      },
      take: TrainingMaxCount.Popular,
    });
    return [data.map((training) => TrainingEntity.create(training)), count];
  }

  async getSpecial(): Promise<[TrainingEntity[], number]> {
    const [data, count] = await this.repository.findAndCount({
      where: {
        isSpecial: true,
      },
      take: TrainingMaxCount.Special,
    });
    return [data.map((training) => TrainingEntity.create(training)), count];
  }

  async getForUser(types: TrainingType[], level: TrainingLevel, duration: TrainingDuration): Promise<TrainingEntity[]> {
    const data = await this.repository.find({
      where: [
        {type: In(types)},
        {level: level},
        {duration}
      ],
      take: TrainingMaxCount.ForUser,
    });
    return data.map((training) => TrainingEntity.create(training));
  }

  private getQueryBuilder(): SelectQueryBuilder<ITraining> {
    return this.repository.createQueryBuilder('training')
      .leftJoinAndSelect('training.coach', 'user');
  }
}
