import { Injectable, NotFoundException } from '@nestjs/common';
import { ITrainingsRepository } from './entities/trainings-repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Training } from './models/training.model';
import { Repository } from 'typeorm';
import { TrainingEntity } from './entities/training.entity';
import { TrainingsFilter } from '@fit-friends/libs/types';

const TRAINING_NOT_FOUND_ERROR = 'Training not found';

@Injectable()
export class TrainingsRepository implements ITrainingsRepository {
  constructor(@InjectRepository(Training) private readonly repository: Repository<Training>) {}

  async get(id: string): Promise<TrainingEntity> {
    const training = await this.findById(id);
    if (!Training) {
      throw new NotFoundException(TRAINING_NOT_FOUND_ERROR);
    }
    return training;
  }

  async create(entity: TrainingEntity): Promise<TrainingEntity> {
    return this.repository.save(entity);
  }

  async findById(id: string): Promise<TrainingEntity | null> {
    const training = await this.repository.findOne({
      where: { id },
      relations: { coach: true },
    });
    return training ? TrainingEntity.create(training) : null;
  }

  async update(entity: TrainingEntity): Promise<TrainingEntity> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, coach, ...toUpdate } = entity;
    await this.repository.update({ id }, toUpdate);
    return this.findById(id);
  }

  async all(id: string, filters: TrainingsFilter): Promise<[TrainingEntity[], number]> {
    const { limit, page, priceTo, priceFrom, caloriesTo, caloriesFrom, rating, duration } = filters;

    const qb = this.repository.createQueryBuilder('training').leftJoinAndSelect('users', 'u', 'u.id = training.coach').andWhere('u.id = :id', { id });

    if (priceTo) {
      qb.andWhere('training.price >= :priceTo', { priceTo });
    }

    if (priceFrom) {
      qb.andWhere('training.price <= :priceFrom', { priceFrom });
    }

    if (caloriesTo) {
      qb.andWhere('training.calories >= :caloriesTo', { caloriesTo });
    }

    if (caloriesFrom) {
      qb.andWhere('training.calories <= :caloriesFrom', { caloriesFrom });
    }

    if (rating) {
      qb.andWhere('training.rating = :rating', { rating });
    }

    if (duration) {
      const durations = Array.isArray(duration) ? duration : [duration];
      qb.andWhere('training.duration IN (:...durations)', { durations });
    }

    qb.orderBy(`training.createdAt`, 'DESC');
    qb.limit(limit);
    qb.offset(limit * (page - 1));

    const [data, count] = await qb.getManyAndCount();
    return [data.map((training) => TrainingEntity.create(training)), count];
  }
}
