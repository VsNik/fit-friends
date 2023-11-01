import { OrderType, PaymentType } from '@fit-friends/libs/types';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from '../../users/models/user.model';
import { Training } from '../../trainings/models/training.model';

@Entity('orders')
export class Order {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: OrderType })
  type: OrderType;

  @Column()
  price: number;

  @Column()
  count: number;

  @Column()
  totalPrice: number;

  @Column({ type: 'enum', enum: PaymentType })
  paymentType: PaymentType;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @ManyToOne(() => Training, (training) => training.orders)
  training: Training;

  @Column()
  createdAt: string;
}
