import {
  IReview,
  ITraining,
  IUser,
  Role,
  SortDirection,
  TrainingLevel,
  TrainingSorting,
  TrainingType,
  Location,
  IAlert,
  StatisticSorting,
  TrainingSortDirection,
  TrainingDuration,
} from '@fit-friends/shared';
import { CreatedOrderType } from './common';

export interface TrainingFilter {
  priceTo: number;
  priceFrom: number;
  caloriesTo: number;
  caloriesFrom: number;
  ratingTo: number;
  ratingFrom: number;
  types: TrainingType[];
  durations: TrainingDuration[];
}

export interface UsersFilters {
  location: Location[];
  types: TrainingType[];
  level: TrainingLevel | '';
}

export type AuthState = {
  // authUser: IUser;
  authId: string;
  authRole?: Role;
  isAuth: boolean;
  isLoading: boolean;
  error: string;
};

export type UserState = {
  user: IUser;
  isLoading: boolean;
  error: string;
};

export type UsersState = {
  users: IUser[];
  filter: UsersFilters;
  sorting: Role | null;
  direction: SortDirection;
  page: number;
  total: number;
  isLoading: boolean;
  error: string;
};

export type TrainingState = {
  training: ITraining;
  isLoading: boolean;
  error: string;
};

export type TrainingListState = {
  trainings: ITraining[];
  page: number;
  total: number;
  filter: TrainingFilter;
  sorting: TrainingSorting;
  sortStatistic: StatisticSorting;
  direction: TrainingSortDirection;
  isLoading: boolean;
  error: string;
};

export type TrainingsState = {
  trainings: ITraining[];
  page: number;
  total: number;
  isLoading: boolean;
  error: string;
};

export type ReviewsState = {
  reviews: IReview[];
  isLoading: boolean;
};

export type NotificationsState = {
  notifications: IAlert[];
  isLoading: boolean;
};

export type OrderState = {
  order: CreatedOrderType;
  isLoading: boolean;
};
