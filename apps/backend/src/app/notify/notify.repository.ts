import { Injectable } from '@nestjs/common';
import { INotifyRepository } from './entities/notify-repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Notify } from './models/notify.model';
import { Repository } from 'typeorm';
import { NotifyEntity } from './entities/notify.entity';

@Injectable()
export class NotifyRepository implements INotifyRepository {
  constructor(
    @InjectRepository(Notify)
    private readonly repository: Repository<Notify>,
  ) {}

  async save(entity: NotifyEntity): Promise<NotifyEntity> {
    return this.repository.save(entity);
  }

  async findByCoachId(coachId: string): Promise<NotifyEntity[]> {
    return this.repository.find({
      where: { coachId },
    });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete({ id });
  }
}
