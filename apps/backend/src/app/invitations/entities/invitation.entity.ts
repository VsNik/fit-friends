import { randomUUID } from 'crypto';
import { IInvitation, InviteStatus } from '@fit-friends/shared';

export class InvitationEntity implements IInvitation {
  id: string = randomUUID();
  initiatorId: string;
  toUserId: string;
  status: InviteStatus;
  createdAt: string = new Date().toISOString();
  changedAt: string = new Date().toISOString();

  public static create(item: IInvitation): InvitationEntity {
    const invitation = new InvitationEntity();
    Object.assign(invitation, item);
    return invitation;
  }

  public changeStatus(status: InviteStatus): void {
    if (this.status !== status) {
      this.status = status;
      this.changedAt = new Date().toISOString();
    }
  }
}
