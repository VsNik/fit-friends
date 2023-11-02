import { OrderType, PaymentType } from '@fit-friends/libs/types';
import { IsEnum, IsNotEmpty, IsNumber, IsPositive, Max, Min } from 'class-validator';
import {
  ORDER_COUNT_IS_NUMBER,
  ORDER_COUNT_NOT_EMPTY,
  ORDER_TYPE_VALUE,
  OrderValidate,
  PAYMENT_TYPE_NOT_EMPTY,
  PAYMENT_TYPE_VALUE,
} from '@fit-friends/libs/validation';

export class CreateOrderDto {
  @IsEnum(OrderType, { message: ORDER_TYPE_VALUE })
  type: OrderType;

  @IsNumber({}, { message: ORDER_COUNT_IS_NUMBER })
  @IsPositive({ message: ORDER_COUNT_IS_NUMBER })
  @Min(OrderValidate.CountMin, { message: ORDER_COUNT_IS_NUMBER })
  @Max(OrderValidate.CountMax, { message: ORDER_COUNT_IS_NUMBER })
  @IsNotEmpty({ message: ORDER_COUNT_NOT_EMPTY })
  count: number;

  @IsEnum(PaymentType, { message: PAYMENT_TYPE_VALUE })
  @IsNotEmpty({ message: PAYMENT_TYPE_NOT_EMPTY })
  paymentType: PaymentType;
}
