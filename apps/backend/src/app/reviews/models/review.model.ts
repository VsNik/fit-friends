import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from '../../users/models/user.model';
import { Training } from '../../trainings/models/training.model';

@Entity('reviews')
export class Review {
  @PrimaryColumn('uuid')
  id: string;

  @Column({default: 0})
  rating: number;

  @Column()
  text: string;

  @ManyToOne(() => User, (user) => user.reviews)
  user: User;

  @ManyToOne(() => Training, (training) => training.reviews, {cascade: true})
  training: Training;

  @Column()
  createdAt: string;
}
