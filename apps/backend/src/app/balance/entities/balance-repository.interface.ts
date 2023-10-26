import { balanceEntity } from './balance.entity';

export interface IBalanceRepository {
  getAllByUserId(userId: string): Promise<[balanceEntity[], number]>;
  findByTrainingId(trainingId: string): Promise<balanceEntity | null>;
  save(entity: balanceEntity): Promise<balanceEntity>;
  update(entity: balanceEntity): Promise<void>;
}

export const BALANCE_REPO = Symbol('BALANCE_REPO');
