import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Balance } from './models/balance.model';
import { Repository } from 'typeorm';
import { IBalanceRepository } from './entities/balance-repository.interface';
import { BalanceEntity } from './entities/balance.entity';
import { Pagination } from '@fit-friends/libs/types';

@Injectable()
export class BalanceRepository implements IBalanceRepository {
  constructor(
    @InjectRepository(Balance)
    private readonly repository: Repository<Balance>,
  ) {}

  async getManyByUserId(userId: string, pagination: Pagination): Promise<[BalanceEntity[], number]> {
    const [data, count] = await this.repository.findAndCount({
      where: { userId },
      relations: { training: true },
      take: pagination.limit,
      skip: pagination.limit * (pagination.page - 1),
    });
    return [data.map((item) => BalanceEntity.create(item)), count];
  }

  async findByTrainingId(trainingId: string): Promise<BalanceEntity | null> {
    const balance = await this.repository.findOne({
      where: {
        training: { id: trainingId },
      },
      relations: { training: true },
    });
    return balance ? BalanceEntity.create(balance) : null;
  }

  async save(entity: BalanceEntity): Promise<BalanceEntity> {
    return this.repository.save(entity);
  }

  async update(entity: BalanceEntity): Promise<void> {
    const { id, ...toUpdate } = entity;
    await this.repository.update({ id }, toUpdate);
  }
}
