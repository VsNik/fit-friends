import { InviteStatus } from '@fit-friends/libs/types';

export interface IInvitation {
  id?: string;
  initiatorId: string;
  toUserId: string;
  status: InviteStatus;
  createdAt?: string;
  changedAt?: string;
}
