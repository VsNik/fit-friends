import { OrderType, PaymentType } from '@fit-friends/libs/types';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: OrderType })
  type: OrderType;

  @Column()
  training: string;

  @Column()
  price: number;

  @Column()
  count: number;

  @Column()
  totalPrice: number;

  @Column({ type: 'enum', enum: PaymentType })
  paymentType: PaymentType;

  @Column()
  createdAt: Date;
}
