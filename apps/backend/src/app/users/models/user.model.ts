import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Gender, Role, TrainingDuration, TrainingLevel, TrainingType, Location } from '@fit-friends/libs/types';
import { IUser } from '../user.interface';
import { Training } from '../../trainings/models/training.model';
import { Review } from '../../reviews/models/review.model';
import { Order } from '../../orders/models/order.model';

@Entity('users')
export class User implements IUser {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: '' })
  avatar?: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Gender, default: Gender.AnyGender })
  gender: Gender;

  @Column({ default: '' })
  birthDay?: string;

  @Column({ type: 'enum', enum: Role })
  role: Role;

  @Column({ default: '' })
  bio?: string;

  @Column({ type: 'enum', enum: Location })
  location: Location;

  @Column()
  bgImage: string;

  @Column({ type: 'enum', enum: TrainingLevel })
  trainingLevel: TrainingLevel;

  @Column({ type: 'enum', array: true, enum: TrainingType })
  trainingType: TrainingType[];

  @Column({ type: 'enum', enum: TrainingDuration, nullable: true })
  trainingTime?: TrainingDuration;

  @Column({ nullable: true })
  loseCalories?: number;

  @Column({ nullable: true })
  burnCalories?: number;

  @Column({ nullable: true })
  ready?: boolean;

  @Column({ nullable: true })
  certificate?: string;

  @Column({ nullable: true })
  merits?: string;

  @Column({ nullable: true })
  personalTraining?: boolean;

  @OneToMany(() => Training, (training) => training.coach)
  trainings: Training[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @Column()
  createdAt: string;
}
