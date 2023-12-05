import { Gender, Role, TrainingDuration, TrainingLevel, TrainingType, Location } from './common';
import { IAuthToken } from './token.types';

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
  bgImage?: string[];
  trainingLevel?: TrainingLevel;
  trainingType?: TrainingType[];
  trainingDuration?: TrainingDuration;
  loseCalories?: number;
  burnCalories?: number;
  ready?: boolean;
  certificate?: string[];
  merits?: string;
  personalTraining?: boolean;
  subscribers?: IUser[];
  isFollow?: boolean;
  createdAt: string;
}

export interface ICreatedProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
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
  token?: IAuthToken;
  createdAt: string;
}

export type UserType = Omit<IUser, 'certificate' | 'merits' | 'personalTraining'>;
export type CoachType = Omit<IUser, 'trainingDuration' | 'loseCalories' | 'burnCalories' | 'ready'>;
