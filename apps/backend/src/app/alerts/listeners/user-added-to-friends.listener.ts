import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserAddedToFriendsEvent } from '../../users/events/user-added-to-friends.event';
import { AlertsService } from '../alerts.service';

@Injectable()
export class UserAddedToFriendsListener {
  constructor(private readonly alertsService: AlertsService) {}

  @OnEvent('added-to-friends.event')
  async handleUserAddedToFriendsEvent(event: UserAddedToFriendsEvent): Promise<void> {
    await this.alertsService.create(event);
  }
}
