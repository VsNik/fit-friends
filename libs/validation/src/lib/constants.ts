export const IMAGE_TYPES = ['image/jpeg', 'image/png'];
export const VIDEO_TYPE = ['.mov', '.avi', '.mp4'];
export const CERTIFICATE_TYPE = 'application/pdf';
export const MAX_AVATAR_SIZE = 1024 * 1024;

export enum UserValidate {
  NameMinLength = 1,
  NameMaxLength = 15,
  PasswordMinLength = 6,
  PasswordMaxLength = 12,
  BioMinLength = 10,
  BioMaxLength = 140,
  CaloryMin = 1000,
  CaloryMax = 5000,
  TrainingTypeMaxCount = 3,
  MeritsMinLength = 10,
  MeritsMaxLength = 140,
}

export enum TrainingValidate {
  TitleMinLength = 1,
  TitleMaxLength = 15,
  CaloryMin = 1000,
  CaloryMax = 5000,
  DescriptionMinLength = 10,
  DescriptionMaxLength = 140,
}

export enum ReviewValidate {
  RatingMin = 1,
  RatingMax = 5,
  TextMinLength = 100,
  TextMaxLength = 1024,
}

export enum OrderValidate {
  CountMin = 1,
  CountMax = 50,
}

export enum AlertValidate {
  TextMinLength = 10,
  TextMaxLength = 140,
}
