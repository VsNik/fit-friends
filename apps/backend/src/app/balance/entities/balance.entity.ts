import { randomUUID } from 'crypto';
import { IBalance, ITraining } from '@fit-friends/shared';

export class BalanceEntity implements IBalance {
  id?: string = randomUUID();
  userId: string;
  training: ITraining;
  count: number;
  createdAt: string = new Date().toISOString();

  public static create(item: IBalance): BalanceEntity {
    const balance = new BalanceEntity();
    Object.assign(balance, item);
    return balance;
  }

  public toObject(): IBalance {
    return {
      id: this.id,
      userId: this.userId,
      training: this.training,
      count: this.count,
      createdAt: this.createdAt,
    }
  }

  public admission(count: number): void {
    this.count += count;
  }

  public dismission(count: number): void {
    this.count -= count;
  }
}
