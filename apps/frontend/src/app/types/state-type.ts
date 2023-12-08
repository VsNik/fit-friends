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
  IErrorResponse,
  IInvitation,
  UserSorting,
  IOrder,
  IBalance,
} from '@fit-friends/shared';
import { LoadStatus } from '../constants/common';

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
  authId: string;
  authRole?: Role;
  isAuth: boolean;
  isReady: boolean;
  loadStatus: LoadStatus;
  error: IErrorResponse | null;
};

export type UserState = {
  user: IUser;
  loadStatus: LoadStatus;
  error: string;
};

export type UsersState = {
  users: IUser[];
  filter: UsersFilters;
  sorting: UserSorting;
  direction: SortDirection | null;
  page: number;
  total: number;
  loadStatus: LoadStatus;
  error: string;
};

export type TrainingState = {
  training: ITraining;
  loadStatus: LoadStatus;
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
  loadStatus: LoadStatus;
  error: string;
};

export type TrainingsState = {
  trainings: ITraining[];
  page: number;
  total: number;
  loadStatus: LoadStatus;
  error: string;
};

export type ReviewsState = {
  reviews: IReview[];
  page: number;
  total: number;
  loadStatus: LoadStatus;
};

export type NotificationsState = {
  notifications: IAlert[];
  page: number;
  total: number;
  loadStatus: LoadStatus;
};

export type OrderState = {
  order: IOrder;
  loadStatus: LoadStatus;
};

export type BalancState = {
  balanc: IBalance | null;
  loadStatus: LoadStatus;
};

export type BalancesState = {
  balances: IBalance[];
  page: number;
  total: number;
  loadStatus: LoadStatus;
};

export type InviteState = {
  invitation: IInvitation;
  loadStatus: LoadStatus;
}

export type InvitesState = {
  invitations: IInvitation[];
  loadStatus: LoadStatus;
}
