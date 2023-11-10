import { InviteStatus } from './common';

export interface IInvitation {
  id?: string;
  initiatorId: string;
  toUserId: string;
  status: InviteStatus;
  createdAt?: string;
  changedAt?: string;
}
