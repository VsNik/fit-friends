import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { BalanceEntity } from './entities/balance.entity';
import { BALANCE_REPO, IBalanceRepository } from './entities/balance-repository.interface';
import { IBalance, ITraining } from '@fit-friends/shared';
import { Pagination } from '@fit-friends/filters';
import { OtherError } from '@fit-friends/libs/validation';

@Injectable()
export class BalanceService {
  constructor(
    @Inject(BALANCE_REPO)
    private readonly balanceRepository: IBalanceRepository,
  ) {}

  async getManyByUserId(userId: string, pagination: Pagination): Promise<[IBalance[], number]> {
    const [data, count] = await this.balanceRepository.getManyByUserId(userId, pagination);
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

  async admission(userId: string, trainingId: string, count: number) {
    const existTBalance = await this.getByTriningId(trainingId, userId);
    existTBalance.admission(count);
    await this.balanceRepository.update(existTBalance);
    return existTBalance;
  }

  async dismission(userId: string, trainingId: string, count: number) {
    const existTBalance = await this.getByTriningId(trainingId, userId);

    if (existTBalance.count < count) {
      throw new BadRequestException(OtherError.TrainingCount);
    }

    existTBalance.dismission(count);
    await this.balanceRepository.update(existTBalance);
    return existTBalance;
  }

  async getByTriningId(trainingId: string, currentUserId: string): Promise<BalanceEntity | null> {
    const balance = await this.balanceRepository.findByTrainingId(trainingId, currentUserId);

    // if (!balance || balance.userId !== currentUserId) {
    //   throw new NotFoundException(AppError.TrainingNotFound);
    // }

    return balance ?? null;
  }
}
