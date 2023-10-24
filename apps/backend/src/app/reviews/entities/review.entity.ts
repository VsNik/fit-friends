import { randomUUID } from 'crypto';
import { ITraining } from '../../trainings/training.interface';
import { IUser } from '../../users/user.interface';
import { IReview } from '../review.interface';

export class ReviewEntity implements IReview {
  id: string = randomUUID();
  user: IUser;
  training: ITraining;
  rating: number;
  text: string;
  createdAt: string = new Date().toISOString();

  public static create(user: IUser, training: ITraining, rating: number, text: string): ReviewEntity {
    const review = new ReviewEntity();
    review.user = user;
    review.training = training;
    review.rating = rating;
    review.text = text;
    return review;
  }
}
