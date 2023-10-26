import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ITraining } from '../trainings/training.interface';
import { balanceEntity } from './entities/balance.entity';
import { BALANCE_REPO, IBalanceRepository } from './entities/balance-repository.interface';

const TRAINING_NOT_FOUND_ERROR = 'Training not found';
const TRAININGS_COUNT_ERROR = 'Available number of trainings is less than those written off';

@Injectable()
export class BalanceService {
  constructor(
    @Inject(BALANCE_REPO)
    private readonly balanceRepository: IBalanceRepository,
  ) {}

  async getAllByUserId(userId: string) {
    const [data, count] = await this.balanceRepository.getAllByUserId(userId);
    return [data, count];
  }

  async admission(userId: string, training: ITraining, count: number) {
    const existTBalance = await this.balanceRepository.findByTrainingId(training.id);

    if (existTBalance && existTBalance.userId === userId) {
      existTBalance.admission(count);
      await this.balanceRepository.update(existTBalance);
      return existTBalance;
    }

    const balance = balanceEntity.create({ userId, training, count });
    const savedBalance = await this.balanceRepository.save(balance);
    return savedBalance;
  }

  async dismission(userId: string, trainingId: string, count: number) {
    const balance = await this.getByTriningId(trainingId, userId);

    if (balance.count < count) {
      throw new BadRequestException(TRAININGS_COUNT_ERROR);
    }

    balance.dismission(count);
    await this.balanceRepository.update(balance);
    return balance;
  }

  async getByTriningId(trainingId: string, currentUserId: string): Promise<balanceEntity> {
    const balance = await this.balanceRepository.findByTrainingId(trainingId);
    if (!balance || balance.userId !== currentUserId) {
      throw new NotFoundException(TRAINING_NOT_FOUND_ERROR);
    }
    return balance;
  }
}
