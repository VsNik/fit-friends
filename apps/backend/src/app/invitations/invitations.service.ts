import { BadRequestException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InviteStatus } from '@fit-friends/shared';
import { AppEvent } from '@fit-friends/libs/constants';
import { IInvitationsRepository, INVITATIONS_REPO } from './entities/invitations-repository.interface';
import { UsersService } from '../users/users.service';
import { InvitationEntity } from './entities/invitation.entity';
import { InviteCreatedEvent } from './events/invite-created.event';
import { InviteStatusChangedEvent } from './events/invite-status-changed.event';
import { INVITATION_NOT_FOUND, SELF_INVITE_ERROR, UNAUTHORIZED_ERROR } from '@fit-friends/libs/validation';

@Injectable()
export class InvitationsService {
  constructor(
    @Inject(INVITATIONS_REPO)
    private readonly invitationsRepository: IInvitationsRepository,
    private readonly usersService: UsersService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(toUserId: string, initiatorId: string): Promise<InvitationEntity> {
    if (initiatorId === toUserId) {
      throw new BadRequestException(SELF_INVITE_ERROR);
    }

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

    const createdInvitation = await this.invitationsRepository.save(invitation);

    this.eventEmitter.emit(
        AppEvent.InviteCreated, 
        new InviteCreatedEvent(initiatorUser.id, initiatorUser.name, toUser.id)
    );

    return createdInvitation;
  }

  async changeStatus(invitationId: string, status: InviteStatus, userId: string): Promise<InvitationEntity> {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnauthorizedException(UNAUTHORIZED_ERROR);
    }

    const invitation = await this.invitationsRepository.findById(invitationId);
    if (!invitation) {
      throw new NotFoundException(INVITATION_NOT_FOUND);
    }

    invitation.changeStatus(status);
    await this.invitationsRepository.update(invitation);

    this.eventEmitter.emit(
        AppEvent.InviteStatusChanged, 
        new InviteStatusChangedEvent(userId, user.name, invitation.initiatorId, status)
    );

    return invitation;
  }
}
