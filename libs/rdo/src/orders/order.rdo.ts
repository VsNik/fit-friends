import { OrderType, PaymentType } from '@fit-friends/libs/types';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class OrderRdo {

  @ApiProperty({ description: 'Уникальный идентификатор заказа', example: 'ea2038cf-0956-4897-8af5-b8a5bbe1861f' })
  @Expose()
  id?: string;

  @ApiProperty({
    description: 'Вид покупки',
    example: OrderType.Abonement,
  })
  @Expose()
  type: OrderType;

  @ApiProperty({
    description: 'Уникальный идентификатор тренировки',
    example: 'ea2038cf-0956-4897-8af5-b8a5bbe1861f'
  })
  @Transform(({value}) => value.id)
  @Expose()
  training: string;

  @ApiProperty({
    description: 'Цена тренировки',
    example: 5000
  })
  @Expose()
  price: number;

  @ApiProperty({
    description: 'Количество покупаемых тренировок',
    example: 10
  })
  @Expose()
  count: number;

  @ApiProperty({
    description: 'Сумма заказа',
    example: 50000
  })
  @Expose()
  totalPrice: number;

  @ApiProperty({
    description: 'Способ оплаты',
    example: PaymentType.Mir
  })
  @Expose()
  paymentType: PaymentType;

  @ApiProperty({
    description: 'Дата заказа',
    example: '2012-01-23T17:07:00.565Z',
  })
  @Expose()
  createdAt?: string;
}
