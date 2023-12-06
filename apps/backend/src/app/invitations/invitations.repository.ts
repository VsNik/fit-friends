import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IInvitationsRepository } from './entities/invitations-repository.interface';
import { Invitation } from './models/invitation.model';
import { InvitationEntity } from './entities/invitation.entity';

@Injectable()
export class InvitationsRepository implements IInvitationsRepository {
  constructor(
    @InjectRepository(Invitation)
    private readonly repository: Repository<Invitation>,
  ) {}

  async save(entity: InvitationEntity): Promise<InvitationEntity> {
    return this.repository.save(entity);
  }

  async findById(id: string): Promise<InvitationEntity | null> {
    const invitation = await this.repository.findOneBy({ id });
    return invitation ? InvitationEntity.create(invitation) : null;
  }

  async findForUserId(id: string): Promise<InvitationEntity[]> {
    const invitations = await this.repository.find({
      where: [
        {toUserId: id},
        {initiatorId: id},
      ]
    });
    return invitations.map((item) => InvitationEntity.create(item));
  }

  async update(entity: InvitationEntity): Promise<void> {
    const { id, ...toUpdate } = entity;
    await this.repository.update({ id }, toUpdate);
  }
}
