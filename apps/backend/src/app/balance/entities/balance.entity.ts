import { randomUUID } from 'crypto';
import { ITraining } from '../../trainings/training.interface';
import { IBalance } from '../balance.intrface';

export class balanceEntity implements IBalance {
  id?: string = randomUUID();
  userId: string;
  training: ITraining;
  count: number;
  createdAt: string = new Date().toISOString();

  public static create(item: IBalance): balanceEntity {
    const balance = new balanceEntity();
    Object.assign(balance, item);
    return balance;
  }

  public admission(count: number): void {
    this.count += count;
  }

  public dismission(count: number): void {
    this.count -= count;
  }
}
