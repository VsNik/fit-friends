import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Alert } from './models/alert.model';
import { IAlertsRepository } from './entities/alerts-repository.interface';
import { AlertEntity } from './entities/alert.entity';
import { IAlert, Pagination } from '@fit-friends/libs/types';
import { ALERT_NOT_FOUND, NOT_YOUR_ALERT } from '@fit-friends/libs/validation';

@Injectable()
export class AlertsService {
  constructor(
    @InjectRepository(Alert)
    private readonly alertsRepository: IAlertsRepository,
  ) {}

  async getByUserId(currentUserId: string, pagination: Pagination): Promise<[IAlert[], number]> {
    const [data, count] = await this.alertsRepository.findByUserId(currentUserId, pagination);
    return [data.map((alert) => alert.toObject()), count];
  }

  async create(fromUserId: string, userId: string, text: string): Promise<void> {
    const alert = AlertEntity.create({ fromUserId, userId, text });
    await this.alertsRepository.save(alert);
  }

  async delete(alertId: string, currentUserId: string): Promise<void> {
    const alert = await this.alertsRepository.findById(alertId);
    if (!alert) {
      throw new NotFoundException(ALERT_NOT_FOUND);
    }

    if (alert.userId !== currentUserId) {
      throw new BadRequestException(NOT_YOUR_ALERT);
    }

    await this.alertsRepository.delete(alertId);
  }
}
