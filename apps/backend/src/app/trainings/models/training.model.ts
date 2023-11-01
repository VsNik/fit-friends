import { Gender, ITraining, TrainingDuration, TrainingLevel, TrainingType } from '@fit-friends/libs/types';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { User } from '../../users/models/user.model';
import { Review } from '../../reviews/models/review.model';
import { Order } from '../../orders/models/order.model';

@Entity('trainings')
export class Training implements ITraining {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  bgImage: string;

  @Column({ type: 'enum', enum: TrainingLevel })
  level: TrainingLevel;

  @Column({ type: 'enum', enum: TrainingType })
  type: TrainingType;

  @Column({ type: 'enum', enum: TrainingDuration })
  duration: TrainingDuration;

  @Column()
  price: number;

  @Column()
  calories: number;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @Column()
  video: string;

  @Column({default: 0})
  rating: number;

  @Column()
  isSpecial: boolean;

  @ManyToOne(() => User, (user) => user.trainings)
  coach: User;

  @OneToMany(() => Review, (review) => review.training)
  reviews: Review[];

  @OneToMany(() => Order, (order) => order.training)
  orders: Order[];

  @Column({default: 0})
  ordersCount: number;

  @Column({default: 0})
  ordersSumm: number;

  @Column()
  createdAt: string;
}
