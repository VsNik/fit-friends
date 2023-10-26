import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Balance } from './models/balance.model';
import { Repository } from 'typeorm';
import { IBalanceRepository } from './entities/balance-repository.interface';
import { balanceEntity } from './entities/balance.entity';

@Injectable()
export class BalanceRepository implements IBalanceRepository {
  constructor(
    @InjectRepository(Balance)
    private readonly repository: Repository<Balance>,
  ) {}

  async getAllByUserId(userId: string): Promise<[balanceEntity[], number]> {
    const [data, count] = await this.repository.findAndCount({
      where: { userId },
      relations: { training: true },
    });
    return [data.map((item) => balanceEntity.create(item)), count];
  }

  async findByTrainingId(trainingId: string): Promise<balanceEntity | null> {
    const balance = await this.repository.findOne({
      where: {
        training: { id: trainingId },
      },
      relations: { training: true },
    });
    return balance ? balanceEntity.create(balance) : null;
  }

  async save(entity: balanceEntity): Promise<balanceEntity> {
    return this.repository.save(entity);
  }

  async update(entity: balanceEntity): Promise<void> {
    const { id, ...toUpdate } = entity;
    await this.repository.update({ id }, toUpdate);
  }
}
