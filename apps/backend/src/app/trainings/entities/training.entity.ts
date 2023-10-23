import { Gender, TrainingDuration, TrainingLevel, TrainingType } from '@fit-friends/libs/types';
import { ITraining } from '../training.interface';
import { IUser } from '../../users/user.interface';

export class TrainingEntity implements ITraining {
  id: string;
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
  createdAt: string;

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
      createdAt: this.createdAt,
    };
  }
}
