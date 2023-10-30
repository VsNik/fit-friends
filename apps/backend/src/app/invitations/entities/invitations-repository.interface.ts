import { InvitationEntity } from './invitation.entity';

export interface IInvitationsRepository {
  save(entity: InvitationEntity): Promise<InvitationEntity>;
  findById(id: string): Promise<InvitationEntity | null>;
  update(entity: InvitationEntity): Promise<void>;
}

export const INVITATIONS_REPO = Symbol('INVITATIONS_REPO');
