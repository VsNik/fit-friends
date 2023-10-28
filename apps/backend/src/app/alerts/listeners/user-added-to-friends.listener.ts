import { Inject, Injectable } from '@nestjs/common';
import { ALERT_REPO, IAlertsRepository } from '../entities/alerts-repository.interface';
import { OnEvent } from '@nestjs/event-emitter';
import { UserAddedToFriendsEvent } from '../../users/events/user-added-to-friends.event';
import { AlertEntity } from '../entities/alert.entity';

@Injectable()
export class UserAddedToFriendsListener {
  constructor(
    @Inject(ALERT_REPO)
    private readonly alertsRepository: IAlertsRepository,
  ) {}

  @OnEvent('added-to-friends.event')
  async handleUserAddedToFriendsEvent(event: UserAddedToFriendsEvent): Promise<void> {
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
}
