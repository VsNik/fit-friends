import {
  CERTIFICATE_TYPE,
  IMAGE_TYPES,
  MAX_AVATAR_SIZE,
  UserError,
  UserValidate,
  CertificateError,
  OtherError,
  TrainingError,
  AVATAR_SIZE_ERROR,
  USER_NAME_LENGTH,
  PASSWORD_LENGTH,
  TRAININGTYPE_MAX_SIZE,
  LOSE_CALORY_MIN,
  LOSE_CALORY_MAX,
  BURN_CALORY_MIN,
  BURN_CALORY_MAX,
} from '@fit-friends/libs/validation';
import { Gender, Location, Role, TrainingDuration, TrainingLevel, TrainingType } from '@fit-friends/shared';
import * as Yup from 'yup';

const VIDEO_TYPES = ['video/quicktime', 'video/mp4'];

const avatarValidator = Yup.mixed()
  .test('is-valid-type', OtherError.AvatarType, (value) => {
    return value instanceof FileList && value[0] ? IMAGE_TYPES.includes(value[0].type) : true;
  })
  .test('is-valid-size', AVATAR_SIZE_ERROR, (value) => {
    return value instanceof FileList && value[0] ? value[0].size <= MAX_AVATAR_SIZE : true;
  });

const certificateValidator = Yup.mixed()
  .required()
  .test('is-required', CertificateError.Required, (value) => {
    return !!(value instanceof FileList && value[0]);
  })
  .test('is-valid-type', CertificateError.Type, (value) => {
    return value instanceof FileList && value[0] ? CERTIFICATE_TYPE.includes(value[0].type) : true;
  });

const trainingTypesValidator = Yup.array(Yup.mixed<TrainingType>().oneOf(Object.values(TrainingType)))
  .required()
  .test('is-valid-min--length', UserError.TypeMinCount, (value) => value.length >= UserValidate.TrainingTypeMinCount)
  .test('is-valid-max--length', TRAININGTYPE_MAX_SIZE, (value) => value.length <= UserValidate.TrainingTypeMaxCount);

const trainingTitileValidator = Yup.string().required(TrainingError.TitleRequired);
const trainingDescriptionValidator = Yup.string().required(TrainingError.DescRequired);

const trainingVideoValidator = Yup.mixed()
  .required()
  .test('is-required', TrainingError.VideoRequired, (value) => {
    return !!(value instanceof FileList && value[0]);
  })
  .test('is-valid-type', TrainingError.VideoType, (value) => {
    return value instanceof FileList && value[0] ? VIDEO_TYPES.includes(value[0].type) : true;
  });

const trainingPriceValidator = Yup.number()
  .transform((value) => (isNaN(value) || value === undefined ? null : value))
  .required(TrainingError.PriceRequired);

const userNameValidator = Yup.string()
  .required(UserError.NameRequired)
  .min(UserValidate.NameMinLength, USER_NAME_LENGTH)
  .max(UserValidate.NameMaxLength, USER_NAME_LENGTH);

const emailValidator = Yup.string().required(UserError.EmailRequired).email(UserError.EmailIncorrect);

export const loginSchema = Yup.object({
  email: emailValidator,
  password: Yup.string().required(UserError.PasswordRequired),
});

export const signupSchema = Yup.object({
  name: userNameValidator,
  email: emailValidator,
  birthday: Yup.string().optional(),
  location: Yup.mixed<Location>().oneOf(Object.values(Location), UserError.LocationRequired).required(),
  password: Yup.string()
    .required(UserError.PasswordRequired)
    .min(UserValidate.PasswordMinLength, PASSWORD_LENGTH)
    .max(UserValidate.PasswordMaxLength, PASSWORD_LENGTH),
  gender: Yup.mixed<Gender>().oneOf(Object.values(Gender)).required(UserError.GenderRequired),
  role: Yup.mixed<Role>().oneOf(Object.values(Role)).required(UserError.RoleRequired),
  avatar: avatarValidator,
});

export const questionUserSchema = Yup.object({
  trainingType: trainingTypesValidator,
  trainingDuration: Yup.mixed<TrainingDuration>().oneOf(Object.values(TrainingDuration)).required(UserError.DurationRequired),
  trainingLevel: Yup.mixed<TrainingLevel>().oneOf(Object.values(TrainingLevel)).required(UserError.LevelRequired),
  loseCalories: Yup.number()
    .transform((value) => (isNaN(value) || value === undefined ? null : value))
    .required(UserError.LoseCaloryRequired)
    .min(1000, LOSE_CALORY_MIN)
    .max(5000, LOSE_CALORY_MAX),
  burnCalories: Yup.number()
    .transform((value) => (isNaN(value) || value === undefined ? null : value))
    .required(UserError.BurnCaloryRequired)
    .min(1000, BURN_CALORY_MIN)
    .max(5000, BURN_CALORY_MAX),
  ready: Yup.boolean()
});

export const questionCoachSchema = Yup.object({
  trainingType: trainingTypesValidator,
  trainingLevel: Yup.mixed<TrainingLevel>().oneOf(Object.values(TrainingLevel)).required(UserError.LevelRequired),
  merits: Yup.string().required(UserError.MeritsRequired).min(UserValidate.MeritsMinLength).max(UserValidate.MeritsMaxLength),
  personalTraining: Yup.boolean().required(),
  certificate: certificateValidator,
  ready: Yup.boolean(),
});

export const userInfoSchema = Yup.object({
  name: userNameValidator,
  bio: Yup.string().required(),
  personalTraining: Yup.boolean(),
  ready: Yup.boolean(),
  location: Yup.mixed<Location>().oneOf(Object.values(Location), UserError.LocationRequired).required(),
  gender: Yup.mixed<Gender>().oneOf(Object.values(Gender)).required(UserError.GenderRequired),
  trainingType: trainingTypesValidator,
  trainingLevel: Yup.mixed<TrainingLevel>().oneOf(Object.values(TrainingLevel)).required(UserError.LevelRequired),
  avatar: avatarValidator,
});

export const updateTrainingSchema = Yup.object({
  title: trainingTitileValidator,
  description: trainingDescriptionValidator,
  price: trainingPriceValidator,
  rating: Yup.number(),
});

export const trainingSchema = Yup.object({
  title: trainingTitileValidator,
  trainingType: Yup.string().required(TrainingError.TypeRequired),
  loseCalory: Yup.number()
    .transform((value) => (isNaN(value) || value === undefined ? null : value))
    .required(UserError.LoseCaloryRequired),
  trainingDuration: Yup.string().required(UserError.DurationRequired),
  price: trainingPriceValidator,
  trainingLevel: Yup.string().required(UserError.LevelRequired),
  gender: Yup.string().required(UserError.GenderRequired),
  description: trainingDescriptionValidator,
  video: trainingVideoValidator,
  isSpecial: Yup.boolean().required(),
});

export const videoSchema = Yup.object({
  video: trainingVideoValidator,
});

export const addCertificateSchema = Yup.object({
  certificate: certificateValidator,
});

export const updateCertificateSchema = Yup.object({
  certificate: Yup.mixed()
    .test('is-valid-type', CertificateError.Type, (value) => {
      return value instanceof FileList && value[0] ? CERTIFICATE_TYPE.includes(value[0].type) : true;
    })
})
