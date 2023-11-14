import { Gender, Location, TrainingLevel } from '@fit-friends/shared';

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
