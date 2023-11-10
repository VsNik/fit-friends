import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ALERT_REPO, IAlertsRepository } from './entities/alerts-repository.interface';
import { AlertEntity } from './entities/alert.entity';
import { IAlert } from '@fit-friends/shared';
import {Pagination} from '@fit-friends/filters';
import { ALERT_NOT_FOUND, NOT_YOUR_ALERT } from '@fit-friends/libs/validation';

@Injectable()
export class AlertsService {
  constructor(
    @Inject(ALERT_REPO)
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

  async delete(alertId: string, currentUserId: string): Promise<boolean> {
    const alert = await this.alertsRepository.findById(alertId);
    if (!alert) {
      throw new NotFoundException(ALERT_NOT_FOUND);
    }

    if (alert.userId !== currentUserId) {
      throw new BadRequestException(NOT_YOUR_ALERT);
    }

    return this.alertsRepository.delete(alertId);
  }
}
