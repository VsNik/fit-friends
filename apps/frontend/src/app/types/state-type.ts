import { IReview, ITraining, IUser, Role, SortDirection, TrainingLevel, TrainingSorting, TrainingType, Location } from '@fit-friends/shared';

export interface TrainingFilter {
  priceTo: number;
  priceFrom: number;
  caloriesTo: number;
  caloriesFrom: number;
  ratingTo: number;
  ratingFrom: number;
  types: TrainingType[];
}

export interface UsersFilters {
  location: Location[];
  types?: TrainingType[];
  level: TrainingLevel | '';
}

export type AuthState = {
  authUser: IUser;
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
  direction: SortDirection | 'free' | null;
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
