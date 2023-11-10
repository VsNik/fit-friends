import { Injectable } from '@nestjs/common';
import { InviteStatus } from '@fit-friends/shared';
import { OnEvent } from '@nestjs/event-emitter';
import { AppEvent } from '@fit-friends/libs/constants';
import { AlertsService } from '../alerts.service';
import { InviteStatusChangedEvent } from '../../invitations/events/invite-status-changed.event';

const getInviteAcceptedMessage = (userName: string) => `Пользователь ${userName} принял(а) Ваше приглашение.`;
const getInviteRejectedMessage = (userName: string) => `Пользователь ${userName} отклонил(а) Ваше приглашение.`;

@Injectable()
export class InviteStatusChangedListener {
  constructor(private readonly alertsService: AlertsService) {}

  @OnEvent(AppEvent.InviteStatusChanged)
  async handleInviteStatusChangedEvent(event: InviteStatusChangedEvent) {
    const text = 
        event.status === InviteStatus.Accepted 
            ? getInviteAcceptedMessage(event.fromUserName) 
            : getInviteRejectedMessage(event.fromUserName
    );

    await this.alertsService.create(event.fromUserId, event.toUserId, text);
  }
}
