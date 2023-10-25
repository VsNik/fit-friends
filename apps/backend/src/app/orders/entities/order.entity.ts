import { randomUUID } from 'crypto';
import { OrderType, PaymentType } from '@fit-friends/libs/types';
import { IOrder } from '../order.interface';
import { ITraining } from '../../trainings/training.interface';
import { IUser } from '../../users/user.interface';

export class OrderEntity implements IOrder {
  id: string = randomUUID();
  type: OrderType;
  price: number;
  count: number;
  totalPrice: number;
  paymentType: PaymentType;
  training: ITraining;
  user: IUser;
  createdAt: string = new Date().toISOString();

  public static create(item: Partial<IOrder>): OrderEntity {
    const order = new OrderEntity();
    Object.assign(order, item);
    return order;
  }

  public toObject(): IOrder {
    return { ...this };
  }
}
