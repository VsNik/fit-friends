import { OrderType, PaymentType } from '@fit-friends/libs/types';
import { ITraining } from '../trainings/training.interface';

export interface IOrder {
  id: string;
  type: OrderType;
  training: ITraining;
  price: number;
  count: number;
  totalPrice: number;
  paymentType: PaymentType;
  createdAt: Date;
}
