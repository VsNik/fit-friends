import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { AppEvent } from '@fit-friends/libs/constants';
import { UserAddedToFriendsEvent } from '../../users/events/user-added-to-friends.event';
import { AlertsService } from '../alerts.service';

const getAddedToFriendsMessage = (userName: string) => `Пользователь ${userName} добавил(а) Вас в друзья`;

@Injectable()
export class UserAddedToFriendsListener {
  constructor(private readonly alertsService: AlertsService) {}

  @OnEvent(AppEvent.AddedToFriends)
  async handleUserAddedToFriendsEvent(event: UserAddedToFriendsEvent): Promise<void> {
    const text = getAddedToFriendsMessage(event.fromUserName);

    await this.alertsService.create(
      event.fromUserId,
      event.toUserId,
      text
    );
  }
}
