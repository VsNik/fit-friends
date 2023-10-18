import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/models/user.model';
import { Training } from '../../trainings/models/training.model';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.reviews)
  user: User;

  @ManyToOne(() => Training, (training) => training.reviews)
  training: string;

  @Column()
  rating: number;

  @Column()
  text: string;

  @Column()
  createdAt: Date;
}
