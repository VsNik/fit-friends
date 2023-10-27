import { Gender, Role, Location, TrainingLevel, TrainingType, TrainingDuration } from '@fit-friends/libs/types';

export interface IUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  password?: string;
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
  subscribers?: IUser[];
  createdAt: string;
}

export type UserType = Omit<IUser, 'certificate' | 'merits' | 'personalTraining'>;
export type CoachType = Omit<IUser, 'trainingDuration' | 'loseCalories' | 'burnCalories' | 'ready'>;
