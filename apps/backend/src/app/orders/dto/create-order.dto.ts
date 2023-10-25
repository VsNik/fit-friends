import { OrderType, PaymentType } from '@fit-friends/libs/types';

export class CreateOrderDto {
  type: OrderType;
  count: number;
  paymentType: PaymentType;
}
