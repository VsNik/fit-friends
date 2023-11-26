import { Gender, Location, TrainingDuration, TrainingLevel, TrainingType } from '@fit-friends/shared';

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

export const TrainingsList = [
  {value: TrainingType.Yoga, label: 'Йога'},
  {value: TrainingType.Power, label: 'Силовые'},
  {value: TrainingType.Crossfit, label: 'Кроссфит'},
  {value: TrainingType.Boxing, label: 'Бокс'},
  {value: TrainingType.Beg, label: 'Бег'},
  {value: TrainingType.Aerobic, label: 'Аэробика'},
  {value: TrainingType.Pilates, label: 'Пилатес'},
  {value: TrainingType.Stretching, label: 'Стрейчинг'},
]

export const DurationList = [
  {value: TrainingDuration.Low, label: '10 мин - 30 мин'},
  {value: TrainingDuration.Normal, label: '30 мин - 50 мин'},
  {value: TrainingDuration.Hi, label: '50 мин - 80 мин'},
  {value: TrainingDuration.Extra, label: '80 мин - 100 мин'},
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
  Min = 1,
  Max = 5,
}
