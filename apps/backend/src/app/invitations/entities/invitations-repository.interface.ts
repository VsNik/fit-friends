import { InvitationEntity } from './invitation.entity';

export const INVITATIONS_REPO = Symbol('INVITATIONS_REPO');

export interface IInvitationsRepository {
  save(entity: InvitationEntity): Promise<InvitationEntity>;
  findById(id: string): Promise<InvitationEntity | null>;
  findForUserId(id: string): Promise<InvitationEntity[]>;
  update(entity: InvitationEntity): Promise<void>;
}
