import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { BalanceEntity } from './entities/balance.entity';
import { BALANCE_REPO, IBalanceRepository } from './entities/balance-repository.interface';
import { IBalance, ITraining } from '@fit-friends/shared';
import { BalanceQuery } from '@fit-friends/filters';
import { OtherError } from '@fit-friends/libs/validation';

@Injectable()
export class BalanceService {
  constructor(
    @Inject(BALANCE_REPO)
    private readonly balanceRepository: IBalanceRepository,
  ) {}

  async getManyByUserId(userId: string, query: BalanceQuery): Promise<[IBalance[], number]> {
    const [data, count] = await this.balanceRepository.getManyByUserId(userId, query);
    return [data.map((item) => item.toObject()), count];
  }

  async add(userId: string, training: ITraining, count: number) {
    const existTBalance = await this.balanceRepository.findByTrainingId(training.id, userId);
    
    if (existTBalance && existTBalance.userId === userId) {
      existTBalance.admission(count);
      await this.balanceRepository.update(existTBalance);
      return existTBalance;
    }

    const balance = BalanceEntity.create({ userId, training, count });
    const savedBalance = await this.balanceRepository.save(balance);
    return savedBalance;
  }

  async admission(userId: string, trainingId: string, count: number): Promise<IBalance> {
    const existTBalance = await this.getByTriningId(trainingId, userId);
    existTBalance.admission(count);
    return this.update(existTBalance);
  }

  async dismission(userId: string, trainingId: string, count: number): Promise<IBalance> {
    const existTBalance = await this.getByTriningId(trainingId, userId);

    if (existTBalance.count < count) {
      throw new BadRequestException(OtherError.TrainingCount);
    }

    const activeBalance = await this.balanceRepository.findActive(userId);
    if (activeBalance) {
      activeBalance.setNoActive();
      await this.update(activeBalance);
    }

    existTBalance.setIsActive();
    existTBalance.dismission(count);
    return this.update(existTBalance);
  }

  async setActive(userId: string, trainingId: string): Promise<IBalance> {
    const existTBalance = await this.getByTriningId(trainingId, userId);
    const activeBalance = await this.balanceRepository.findActive(userId);

    if (activeBalance) {
      activeBalance.setNoActive();
    }

    existTBalance.setIsActive();
    return this.update(existTBalance);
  }

  async setNoActive(userId: string, trainingId: string): Promise<IBalance> {
    const existTBalance = await this.getByTriningId(trainingId, userId);
    existTBalance.setNoActive();
    return this.update(existTBalance);
  }

  async getByTriningId(trainingId: string, currentUserId: string): Promise<BalanceEntity | null> {
    const balance = await this.balanceRepository.findByTrainingId(trainingId, currentUserId);
    return balance ?? null;
  }

  private async update(balance: BalanceEntity): Promise<IBalance> {
    await this.balanceRepository.update(balance);
    return balance.toObject();
  }
}
