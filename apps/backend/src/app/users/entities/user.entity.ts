import { Gender, Role, TrainingDuration, TrainingLevel, TrainingType, Location } from '@fit-friends/libs/types';
import { IUser } from '../user.interface';
import { randomUUID } from 'crypto';

export class UserEntity implements IUser {
  id: string = randomUUID();
  name: string;
  email: string;
  avatar?: string;
  password: string;
  gender: Gender;
  birthDay?: string;
  role: Role;
  bio?: string;
  location: Location;
  bgImage: string;
  trainingLevel: TrainingLevel;
  trainingType: TrainingType[];
  trainingDuration?: TrainingDuration;
  loseCalories?: number;
  burnCalories?: number;
  ready?: boolean;
  certificate?: string;
  merits?: string;
  personalTraining?: boolean;
  createdAt: string = new Date().toISOString();

  public static create(iten: Partial<IUser>): UserEntity {
    const user = new UserEntity();
    Object.assign(user, iten);

    return user;
  }

  public update(user: Partial<IUser>): UserEntity {
    Object.assign(this, user);
    return this;
  }

  public toObject(): IUser {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      avatar: this.avatar ?? '',
      gender: this.gender,
      birthDay: this.birthDay ?? '',
      role: this.role,
      bio: this.bio ?? '',
      location: this.location,
      bgImage: this.bgImage,
      trainingLevel: this.trainingLevel,
      trainingType: this.trainingType,
      trainingDuration: this.trainingDuration,
      loseCalories: this.loseCalories,
      burnCalories: this.burnCalories,
      ready: this.ready,
      certificate: this.certificate ?? '',
      merits: this.merits ?? '',
      personalTraining: this.personalTraining,
      createdAt: this.createdAt,
    };
  }
}
