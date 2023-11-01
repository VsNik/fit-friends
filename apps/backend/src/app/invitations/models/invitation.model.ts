import { InviteStatus } from '@fit-friends/libs/types';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('invitations')
export class Invitation {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  initiatorId: string;

  @Column({ type: 'uuid' })
  toUserId: string;

  @Column({ type: 'enum', enum: InviteStatus, default: InviteStatus.Waiting })
  status: InviteStatus;

  @Column()
  createdAt: string;

  @Column()
  changedAt: string;
}
