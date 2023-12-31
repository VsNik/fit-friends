import { randomUUID } from 'crypto';
import { IReview, ITraining, IUser } from '@fit-friends/shared';

export class ReviewEntity implements IReview {
  id: string = randomUUID();
  user: IUser;
  training: ITraining;
  rating: number;
  text: string;
  createdAt: string = new Date().toISOString();

  public static create(item: IReview): ReviewEntity {
    const review = new ReviewEntity();
    Object.assign(review, item);
    return review;
  }

  public toObject(): IReview {
    return {
      id: this.id,
      user: this.user,
      training: this.training,
      rating: this.rating,
      text: this.text,
      createdAt: this.createdAt,
    };
  }
}
