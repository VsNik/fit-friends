import { Pagination } from '@fit-friends/libs/types';
import { BalanceEntity } from './balance.entity';

export const BALANCE_REPO = Symbol('BALANCE_REPO');

export interface IBalanceRepository {
  getManyByUserId(userId: string, pagination: Pagination): Promise<[BalanceEntity[], number]>;
  findByTrainingId(trainingId: string): Promise<BalanceEntity | null>;
  save(entity: BalanceEntity): Promise<BalanceEntity>;
  update(entity: BalanceEntity): Promise<void>;
}
