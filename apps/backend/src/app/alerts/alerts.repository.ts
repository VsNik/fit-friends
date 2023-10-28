import { Injectable } from '@nestjs/common';
import { IAlertsRepository } from './entities/alerts-repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Alert } from './models/alert.model';
import { Repository } from 'typeorm';
import { AlertEntity } from './entities/alert.entity';

const ALERTS_SHOW_COUNT = 5;

@Injectable()
export class AlertsRepository implements IAlertsRepository {
  constructor(
    @InjectRepository(Alert)
    private readonly repository: Repository<Alert>,
  ) {}

  async has(fromUserId: string, userId: string): Promise<boolean> {
    const count = await this.repository.count({
      where: {
        fromUserId,
        userId,
      },
    });

    return count > 0;
  }

  async save(entity: AlertEntity): Promise<AlertEntity> {
    return this.repository.save(entity);
  }

  async findByUserId(userId: string): Promise<AlertEntity[]> {
    const alerts = await this.repository.find({
      where: { userId },
      order: {
        createdAt: 'DESC',
      },
      take: ALERTS_SHOW_COUNT,
    });
    return alerts.map((alert) => AlertEntity.create(alert));
  }

  async findById(id: string): Promise<AlertEntity | null> {
    const alert = await this.repository.findOneBy({id});
    return alert ? AlertEntity.create(alert) : null;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete({ id });
  }
}
