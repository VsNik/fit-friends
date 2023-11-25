export enum UploadType {
  Avatar = 'avatar',
  BgUser = 'bg-user',
  BgTraining = 'bg-training',
  Certificate = 'certificate',
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
  Low = '10-30 мин',
  Normal = '30-50 мин',
  Hi = '50-80 мин',
  Extra = '80-100 мин',
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
  OrderCount = 'count',
  OrderSumm = 'summ',
}

export enum UserSorting {
  Created = 'createdAt',
  Role = 'role',
}
