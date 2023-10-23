import { Gender, TrainingDuration, TrainingLevel, TrainingType } from '@fit-friends/libs/types';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ITraining } from '../training.interface';
import { User } from '../../users/models/user.model';
import { Review } from '../../reviews/models/review.model';

@Entity('trainings')
export class Training implements ITraining {
  @PrimaryGeneratedColumn('uuid')
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

  @ManyToOne(() => User, (user) => user.trainings)
  coach: User;

  @Column()
  isSpecial: boolean;

  @OneToMany(() => Review, (review) => review.training)
  reviews: Review[];

  @CreateDateColumn()
  createdAt: string;
}
