import { AlertEntity } from './alert.entity';

export const ALERT_REPO = Symbol('ALERT_REPO');

export interface IAlertsRepository {
  save(entity: AlertEntity): Promise<AlertEntity>;
  has(fromUserId: string, userId: string): Promise<boolean>;
  findByUserId(id: string): Promise<AlertEntity[]>;
  delete(id: string): Promise<void>;
}
