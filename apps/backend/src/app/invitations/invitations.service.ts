import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InviteStatus } from '@fit-friends/libs/types';
import { AppEvent } from '@fit-friends/libs/constants';
import { IInvitationsRepository, INVITATIONS_REPO } from './entities/invitations-repository.interface';
import { UsersService } from '../users/users.service';
import { InvitationEntity } from './entities/invitation.entity';
import { InviteCreatedEvent } from './events/invite-created.event';
import { InviteStatusChangedEvent } from './events/invite-status-changed.event';

@Injectable()
export class InvitationsService {
  constructor(
    @Inject(INVITATIONS_REPO)
    private readonly invitationsRepository: IInvitationsRepository,
    private readonly usersService: UsersService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(toUserId: string, initiatorId: string) {
    const toUser = await this.usersService.getUser(toUserId);
    const initiatorUser = await this.usersService.findById(initiatorId);

    if (!initiatorUser) {
      throw new UnauthorizedException('Unauthorized');
    }

    const invitation = InvitationEntity.create({
      initiatorId: initiatorUser.id,
      toUserId: toUser.id,
      status: InviteStatus.Waiting,
    });

    await this.invitationsRepository.save(invitation);

    this.eventEmitter.emit(
        AppEvent.InviteCreated, 
        new InviteCreatedEvent(initiatorUser.id, initiatorUser.name, toUser.id)
    );
  }

  async changeStatus(invitationId: string, status: InviteStatus, userId: string) {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }

    const invitation = await this.invitationsRepository.findById(invitationId);
    if (!invitation) {
      throw new NotFoundException('Invitation not found');
    }

    invitation.changeStatus(status);
    await this.invitationsRepository.update(invitation);

    this.eventEmitter.emit(
        AppEvent.InviteStatusChanged, 
        new InviteStatusChangedEvent(userId, user.name, invitation.initiatorId, status)
    );
  }
}
