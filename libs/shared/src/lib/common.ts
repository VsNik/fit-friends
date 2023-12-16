export enum UploadType {
  Avatar = 'avatar',
  BgUser = 'bg-user',
  BgTraining = 'bg-training',
  Certificate = 'certificates',
  Video = 'video',
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  AnyGender = 'any',
}

export enum Role {
  User = 'user',
  Coach = 'coach',
}

export enum Location {
  Pionerskaya = 'pionerskaya',
  Udelnaya = 'udelnaya',
  Zvezdnaya = 'zvezdnaya',
  Sportivnaya = 'sportivnaya',
}

export enum TrainingType {
  Yoga = 'yoga',
  Beg = 'beg',
  Boxing = 'boxing',
  Power = 'power',
  Stretching = 'stretching',
  Crossfit = 'crossfit',
  Aerobic = 'aerobic',
  Pilates = 'pilates',
}

export enum TrainingLevel {
  Novice = 'novice',
  Amateur = 'amateur',
  Professional = 'professional',
}

export enum TrainingDuration {
  Low = 'low',
  Normal = 'normal',
  Hi = 'hi',
  Extra = 'extra',
}

export enum OrderType {
  Abonement = 'abonement',
}

export enum PaymentType {
  Visa = 'visa',
  Mir = 'mir',
  Umoney = 'umoney',
}

export enum InviteStatus {
  Waiting = 'waiting',
  Rejected = 'rejected',
  Accepted = 'accepted',
}

export enum TrainingSorting {
  Created = 'createdAt',
  Price = 'price',
}

export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC',
}

export enum TrainingSortDirection {
  Asc = 'ASC',
  Desc = 'DESC',
  Free = 'free',
}

export enum StatisticSorting {
  OrderCount = 'ordersCount',
  OrderSumm = 'ordersSumm',
}

export enum UserSorting {
  Created = 'createdAt',
  Role = 'role',
}

export enum BalanceFiter {
  All = 'all',
  Active = 'active',
}

export type ValidateError = {
  field: string;
  error: string;
}

export interface IErrorResponse {
  error: string;
  message: string | ValidateError[];
  statusCode: number;
}

export const SlidesMaxCount = {
  Popular: 8,
  Special: 3, 
  ForUser: 9,
  Company: 8,
} as const;
