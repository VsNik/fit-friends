import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Alert } from './models/alert.model';
import { IAlertsRepository } from './entities/alerts-repository.interface';
import { AlertEntity } from './entities/alert.entity';
import { UserAddedToFriendsEvent } from '../users/events/user-added-to-friends.event';
import { IAlert } from './alert.interface';

const ALERT_NOT_FOUND_ERROR = 'Alert not found.';
const NOT_YOUR_ALERT_ERROR = 'this not your alert';

@Injectable()
export class AlertsService {
  constructor(
    @InjectRepository(Alert)
    private readonly alertsRepository: IAlertsRepository,
  ) {}

  async find(userId: string): Promise<IAlert[]> {
    const alerts = await this.alertsRepository.findByUserId(userId);
    return alerts.map((alert) => alert.toObject())
  }

  async create(event: UserAddedToFriendsEvent): Promise<void> {
    const hasAlert = await this.alertsRepository.has(event.fromUserId, event.toUserId);

    if (hasAlert) {
      return;
    }

    const text = `Пользователь ${event.fromUserName} добавил Вас в друзья`;
    const alert = AlertEntity.create({
      fromUserId: event.fromUserId,
      userId: event.toUserId,
      text,
    });

    await this.alertsRepository.save(alert);
  }

  async delete(alertId: string, currentUserId: string): Promise<void> {
    const alert = await this.alertsRepository.findById(alertId);
    if (!alert) {
      throw new NotFoundException(ALERT_NOT_FOUND_ERROR);
    }

    if (alert.userId !== currentUserId) {
      throw new BadRequestException(NOT_YOUR_ALERT_ERROR);
    }

    await this.alertsRepository.delete(alertId);
  }
}
