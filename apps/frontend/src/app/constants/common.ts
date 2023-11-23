import { Gender, Location, TrainingLevel } from '@fit-friends/shared';

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
  Orders = 'ORDERS',
}

export const LocationList = [
  { value: Location.Pionerskaya, label: 'Пионерская' },
  { value: Location.Udelnaya, label: 'Удельная' },
  { value: Location.Zvezdnaya, label: 'Звездная' },
  { value: Location.Sportivnaya, label: 'Спортивная' },
];

export const GendesrList = [
  { value: Gender.Male, label: 'Мужской' },
  { value: Gender.Female, label: 'Женский' },
  { value: Gender.AnyGender, label: 'Неважно' },
];

export const LevelsList = [
  { value: TrainingLevel.Novice, label: 'Новичек' },
  { value: TrainingLevel.Amateur, label: 'Любитель' },
  { value: TrainingLevel.Professional, label: 'Профессионал' },
];
