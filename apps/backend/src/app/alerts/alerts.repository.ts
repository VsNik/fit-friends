import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from '@fit-friends/filters';
import { ALERTS_MAX_SHOW_COUNT } from '@fit-friends/libs/constants';
import { IAlertsRepository } from './entities/alerts-repository.interface';
import { Alert } from './models/alert.model';
import { AlertEntity } from './entities/alert.entity';

@Injectable()
export class AlertsRepository implements IAlertsRepository {
  constructor(
    @InjectRepository(Alert)
    private readonly repository: Repository<Alert>,
  ) {}

  async save(entity: AlertEntity): Promise<AlertEntity> {
    return this.repository.save(entity);
  }

  async findByUserId(userId: string, pagination: Pagination): Promise<[AlertEntity[], number]> {
    const { limit = ALERTS_MAX_SHOW_COUNT, page } = pagination;

    const [data, count] = await this.repository.findAndCount({
      where: { userId },
      order: {
        createdAt: pagination.direction,
      },
      take: limit,
      skip: limit * (page - 1),
    });
    return [data.map((alert) => AlertEntity.create(alert)), count];
  }

  async findById(id: string): Promise<AlertEntity | null> {
    const alert = await this.repository.findOneBy({ id });
    return alert ? AlertEntity.create(alert) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete({ id });
    return !!result;
  }
}
