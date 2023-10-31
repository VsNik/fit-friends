import { Gender, TrainingDuration, TrainingLevel, TrainingType } from '@fit-friends/libs/types';
import { randomUUID } from 'crypto';
import { ITraining } from '../training.interface';
import { IUser } from '../../users/user.interface';
import { IReview } from '../../reviews/review.interface';

export class TrainingEntity implements ITraining {
  id: string = randomUUID();
  title: string;
  bgImage: string;
  level: TrainingLevel;
  type: TrainingType;
  duration: TrainingDuration;
  price: number;
  calories: number;
  description: string;
  gender: Gender;
  video: string;
  rating: number;
  coach: IUser;
  isSpecial: boolean;
  ordersCount?: number;
  ordersSumm?: number;
  reviews?: IReview[];
  createdAt: string = new Date().toISOString();

  public static create(item: Partial<ITraining>): TrainingEntity {
    const training = new TrainingEntity();
    Object.assign(training, item);
    return training;
  }

  public toObject(): ITraining {
    return {
      id: this.id,
      title: this.title,
      bgImage: this.bgImage,
      level: this.level,
      type: this.type,
      duration: this.duration,
      price: this.price,
      calories: this.calories,
      description: this.description,
      gender: this.gender,
      video: this.video,
      coach: this.coach,
      rating: this.rating,
      isSpecial: this.isSpecial,
      ordersCount: this.ordersCount,
      ordersSumm: this.ordersSumm,
      createdAt: this.createdAt,
    };
  }

  public addStatistic(count: number) {
    this.ordersCount = this.ordersCount + count;
    this.ordersSumm = this.ordersSumm + this.price * count;
  }

  public updateRating(rating: number): void {
    if (rating > 0) {
      const reviewCount = this.reviews.length + 1;
      const totalRating = this.reviews.reduce((summ, review) => summ + review.rating, 0);
      this.rating = Math.round((totalRating + rating) / reviewCount);
    }
  }
}
