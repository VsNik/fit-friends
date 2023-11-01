import { OrderType, PaymentType } from '@fit-friends/libs/types';
import { Expose } from 'class-transformer';

export class OrderRdo {
  @Expose()
  id?: string;

  @Expose()
  type: OrderType;

  @Expose()
  training: string;

  @Expose()
  price: number;

  @Expose()
  count: number;

  @Expose()
  totalPrice: number;

  @Expose()
  paymentType: PaymentType;

  @Expose()
  createdAt?: string;
}
