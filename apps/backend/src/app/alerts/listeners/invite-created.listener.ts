import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { AppEvent } from '@fit-friends/libs/constants';
import { AlertsService } from '../alerts.service';
import { InviteCreatedEvent } from '../../invitations/events/invite-created.event';

const getInviteMessage = (userName: string) => `Пользователь ${userName} прмглашает Вас на совместную/персональную тренировку.`;

@Injectable()
export class InviteCreatedListener {
  constructor(private readonly alertService: AlertsService) {}

  @OnEvent(AppEvent.InviteCreated)
  async handleInvitationCreatedEvent(event: InviteCreatedEvent) {
    const text = getInviteMessage(event.initiatorName);

    await this.alertService.create(
        event.initiatorId, 
        event.toUserId, 
        text
    );
  }
}
