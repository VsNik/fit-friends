import { Pagination } from '@fit-friends/filters';
import { BalanceEntity } from './balance.entity';

export const BALANCE_REPO = Symbol('BALANCE_REPO');

export interface IBalanceRepository {
  getManyByUserId(userId: string, pagination: Pagination): Promise<[BalanceEntity[], number]>;
  findByTrainingId(trainingId: string, userId: string): Promise<BalanceEntity | null>;
  save(entity: BalanceEntity): Promise<BalanceEntity>;
  update(entity: BalanceEntity): Promise<void>;
  findActive(userId: string): Promise<BalanceEntity | null>; 
}
