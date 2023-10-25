import { OrderType, PaymentType } from '@fit-friends/libs/types';
import { ITraining } from '../trainings/training.interface';
import { IUser } from '../users/user.interface';

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
