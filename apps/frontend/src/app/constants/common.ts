import { Gender, Location, TrainingDuration, TrainingLevel, TrainingType } from '@fit-friends/shared';

export const API_URL = '/api';
export const VIDEO_POSTER = '/assets/img/video-thumbnail.png';
export const DEFAULT_AVATAR = '/assets/img/default_avatar.png';

export enum DefaultPaginate {
  Page = 1,
  Total = 0,
}

export enum StatusCode {
  Ok = 200,
  Created = 201,
  NoContent = 204,
}

export enum ErrorCode {
  BadRequest = 400,
  unauthorized = 401,  
  NotFound = 404,
  UnprocsableEntity = 422,
  ServerError = 500,
}

export enum SliceName {
  Auth = 'AUTH',
  User = 'USER',
  Users = 'USERS',
  Training = 'TRAINING',
  Trainings = 'TRAININGS',
  ForYou = 'FOR_YOU',
  Popular = 'POPULAR',
  Special = 'SPECIAL',
  Reviews = 'REVIEWS',
  Notifications = 'NOTIFICATIONS',
  Order = 'ORDER',
  Balance = 'BALANCE',
  Balances = 'BALANCES',
  Invites = 'INVITES',
}

export enum LoadStatus {
  Never = 'never',
  Loading = 'loading',
  Loaded = 'loaded',
}

export const CountSlide = {
  ForYou: 3,
  Popular: 4,
  Company: 4,
  Certificate: 3,
  PopupCertificate: 1,
  CoachCard: 4,
} as const;

export const locationsList = [
  { value: Location.Pionerskaya, label: 'Пионерская' },
  { value: Location.Udelnaya, label: 'Удельная' },
  { value: Location.Zvezdnaya, label: 'Звездная' },
  { value: Location.Sportivnaya, label: 'Спортивная' },
];

export const gendersList = [
  { value: Gender.Male, label: 'Мужской' },
  { value: Gender.Female, label: 'Женский' },
  { value: Gender.AnyGender, label: 'Неважно' },
];

export const levelsList = [
  { value: TrainingLevel.Novice, label: 'Новичек' },
  { value: TrainingLevel.Amateur, label: 'Любитель' },
  { value: TrainingLevel.Professional, label: 'Профессионал' },
];

export const trainingsList = [
  { value: TrainingType.Yoga, label: 'Йога' },
  { value: TrainingType.Power, label: 'Силовые' },
  { value: TrainingType.Crossfit, label: 'Кроссфит' },
  { value: TrainingType.Boxing, label: 'Бокс' },
  { value: TrainingType.Beg, label: 'Бег' },
  { value: TrainingType.Aerobic, label: 'Аэробика' },
  { value: TrainingType.Pilates, label: 'Пилатес' },
  { value: TrainingType.Stretching, label: 'Стрейчинг' },
];

export const durationsList = [
  { value: TrainingDuration.Low, label: '10 мин - 30 мин' },
  { value: TrainingDuration.Normal, label: '30 мин - 50 мин' },
  { value: TrainingDuration.Hi, label: '50 мин - 80 мин' },
  { value: TrainingDuration.Extra, label: '80 мин - 100 мин' },
];

export enum PriceRange {
  Min = 0,
  Max = 10000,
  Step = 100,
}

export enum CaloryRange {
  Min = 1000,
  Max = 5000,
  Step = 100,
}

export enum RatingRange {
  Min = 0,
  Max = 5,
}

export enum ReadyTrainingText {
  UserReady = 'Готов к тренировке',
  UserNotReady = 'Не готов к тренировке',
  CoachReady = 'Готов тренировать',
  CoachNotReady = 'Не готов тренировать',
}

export const CardsOnPage = {
  MyTraining: 6,
  MyOrders: 4,
  Friends: 6,
  Purchases: 4,
  Trainings: 6,
  Users: 6,
} as const;
