import { OrderType, PaymentType } from '@fit-friends/shared';
import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsPositive, Max, Min } from 'class-validator';
import { OrderValidate, ORDER_TYPE_VALUE, ORDER_COUNT_IS_NUMBER, PAYMENT_TYPE_VALUE, OtherError } from '@fit-friends/libs/validation';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    description: 'Вид покупки',
    example: OrderType.Abonement,
  })
  @IsEnum(OrderType, { message: ORDER_TYPE_VALUE })
  type: OrderType;

  @ApiProperty({
    description: 'Количество покупаемых тренировок',
    example: 10,
  })
  @IsInt({ message: ORDER_COUNT_IS_NUMBER })
  @IsNumber({}, { message: ORDER_COUNT_IS_NUMBER })
  @IsPositive({ message: ORDER_COUNT_IS_NUMBER })
  @Min(OrderValidate.CountMin, { message: ORDER_COUNT_IS_NUMBER })
  @Max(OrderValidate.CountMax, { message: ORDER_COUNT_IS_NUMBER })
  @IsNotEmpty({ message: OtherError.OrderCountRequired })
  count: number;

  @ApiProperty({
    description: 'Способ оплаты',
    example: PaymentType.Mir,
  })
  @IsEnum(PaymentType, { message: PAYMENT_TYPE_VALUE })
  @IsNotEmpty({ message: OtherError.PaymentRequired })
  paymentType: PaymentType;
}
