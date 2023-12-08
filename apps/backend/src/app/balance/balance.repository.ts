import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BalanceQuery } from '@fit-friends/filters';
import { Balance } from './models/balance.model';
import { IBalanceRepository } from './entities/balance-repository.interface';
import { BalanceEntity } from './entities/balance.entity';
import { BalanceFiter } from '@fit-friends/shared';

@Injectable()
export class BalanceRepository implements IBalanceRepository {
  constructor(
    @InjectRepository(Balance)
    private readonly repository: Repository<Balance>,
  ) {}

  async getManyByUserId(userId: string, query: BalanceQuery): Promise<[BalanceEntity[], number]> {
    const qb = this.repository.createQueryBuilder('balance')
    .leftJoinAndSelect('balance.training', 'training')
    .andWhere('balance.userId = :userId', {userId});

    if(query.filter === BalanceFiter.Active) {
      qb.andWhere('balance.count > 0');
    }

    qb.limit(query.limit);
    qb.offset(query.limit * (query.page - 1));
    qb.orderBy('balance.createdAt', query.direction);

    const [data, count] = await qb.getManyAndCount();
    return [data.map((item) => BalanceEntity.create(item)), count];
  }

  async findByTrainingId(trainingId: string, userId: string): Promise<BalanceEntity | null> {
    const balance = await this.repository.findOne({
      where: {
        userId,
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

  async findActive(userId: string): Promise<BalanceEntity | null> {
    const balance = await this.repository.findOne({
      where: {
        userId,
        isActive: true,
      }
    })
    return balance ? BalanceEntity.create(balance) : null;
  }
}
