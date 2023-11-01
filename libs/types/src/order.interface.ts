import { OrderType, PaymentType } from './common';
import { ITraining } from './training.interface';
import { IUser } from './user.interface';

export interface IOrder {
  id?: string;
  type: OrderType;
  training: ITraining;
  price: number;
  count: number;
  totalPrice: number;
  paymentType: PaymentType;
  user: IUser;
  createdAt?: string;
}
