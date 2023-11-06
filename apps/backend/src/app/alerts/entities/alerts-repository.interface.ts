import { Pagination } from '@fit-friends/libs/types';
import { AlertEntity } from './alert.entity';

export const ALERT_REPO = Symbol('ALERT_REPO');

export interface IAlertsRepository {
  save(entity: AlertEntity): Promise<AlertEntity>;
  findById(id: string): Promise<AlertEntity | null>;
  findByUserId(id: string, pagination: Pagination): Promise<[AlertEntity[], number]>;
  delete(id: string): Promise<boolean>;
}
