import { randomUUID } from 'crypto';
import { IOrder, ITraining, IUser, OrderType, PaymentType } from '@fit-friends/shared';

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
    return {
      id: this.id,
      type: this.type,
      training: this.training,
      price: this.price,
      count: this.count,
      totalPrice: this.totalPrice,
      paymentType: this.paymentType,
      createdAt: this.createdAt
    };
  }
}
