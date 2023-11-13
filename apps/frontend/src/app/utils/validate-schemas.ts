import {
  AVATAR_SIZE_ERROR,
  AVATAR_TYPE_ERROR,
  BURN_CALORY_MAX,
  BURN_CALORY_MIN,
  BURN_CALORY_NOT_EMPTY,
  CERTIFICATE_REQUIRED_ERROR,
  CERTIFICATE_TYPE,
  CERTIFICATE_TYPE_ERROR,
  DURATION_NOT_EMPTY,
  EMAIL_NOT_EMPTY,
  GENDER_NOT_EMPTY,
  IMAGE_TYPES,
  INVALID_EMAIL,
  LEVEL_NOT_EMPTY,
  LOCATION_NOT_EMPTY,
  LOSE_CALORY_MAX,
  LOSE_CALORY_MIN,
  LOSE_CALORY_NOT_EMPTY,
  MAX_AVATAR_SIZE,
  MERITS_NOT_EMPTY,
  NAME_NOT_EMPTY,
  PASSWORD_LENGTH,
  PASSWORD_NOT_EMPTY,
  ROLE_NOT_EMPTY,
  TRAININGTYPE_MAX_SIZE,
  TRAININGTYPE_MIN_SIZE,
  USER_NAME_LENGTH,
  UserValidate,
} from '@fit-friends/libs/validation';
import * as Yup from 'yup';

export const loginSchema = Yup.object({
  email: Yup.string().required(EMAIL_NOT_EMPTY).email(INVALID_EMAIL),
  password: Yup.string().required(PASSWORD_NOT_EMPTY),
});

export const signupSchema = Yup.object({
  name: Yup.string()
    .required(NAME_NOT_EMPTY)
    .min(UserValidate.NameMinLength, USER_NAME_LENGTH)
    .max(UserValidate.NameMaxLength, USER_NAME_LENGTH),
  email: Yup.string().required(EMAIL_NOT_EMPTY).email(INVALID_EMAIL),
  birthday: Yup.string().optional(),
  location: Yup.string().required(LOCATION_NOT_EMPTY),
  password: Yup.string()
    .required(PASSWORD_NOT_EMPTY)
    .min(UserValidate.PasswordMinLength, PASSWORD_LENGTH)
    .max(UserValidate.PasswordMaxLength, PASSWORD_LENGTH),
  gender: Yup.string().required(GENDER_NOT_EMPTY),
  role: Yup.string().required(ROLE_NOT_EMPTY),
  avatar: Yup.mixed()
    .test('is-valid-type', AVATAR_TYPE_ERROR, (value) => {
      return value instanceof FileList && value[0] ? IMAGE_TYPES.includes(value[0].type) : true;
    })
    .test('is-valid-size', AVATAR_SIZE_ERROR, (value) => {
      return value instanceof FileList && value[0] ? value[0].size <= MAX_AVATAR_SIZE : true;
    }),
});

export const questionUserSchema = Yup.object({
  trainingType: Yup.array()
    .required()
    .test('is-valid-min--length', TRAININGTYPE_MIN_SIZE, (value) => value.length >= UserValidate.TrainingTypeMinCount)
    .test('is-valid-max--length', TRAININGTYPE_MAX_SIZE, (value) => value.length <= UserValidate.TrainingTypeMaxCount),
  trainingDuration: Yup.string().required(DURATION_NOT_EMPTY),
  trainingLevel: Yup.string().required(LEVEL_NOT_EMPTY),
  loseCalories: Yup.number()
    .transform((value) => (isNaN(value) || value === undefined ? null : value))
    .required(LOSE_CALORY_NOT_EMPTY)
    .min(1000, LOSE_CALORY_MIN)
    .max(5000, LOSE_CALORY_MAX),
  burnCalories: Yup.number()
    .transform((value) => (isNaN(value) || value === undefined ? null : value))
    .required(BURN_CALORY_NOT_EMPTY)
    .min(1000, BURN_CALORY_MIN)
    .max(5000, BURN_CALORY_MAX),
});

export const questionCoachSchema = Yup.object({
  trainingType: Yup.array()
    .required()
    .test('is-valid-min--length', TRAININGTYPE_MIN_SIZE, (value) => value.length >= UserValidate.TrainingTypeMinCount)
    .test('is-valid-max--length', TRAININGTYPE_MAX_SIZE, (value) => value.length <= UserValidate.TrainingTypeMaxCount),
  trainingLevel: Yup.string().required(LEVEL_NOT_EMPTY),
  merits: Yup.string()
    .required(MERITS_NOT_EMPTY)
    .min(UserValidate.MeritsMinLength)
    .max(UserValidate.MeritsMaxLength),
  personalTraining: Yup.boolean().required(),
  certificate: Yup.mixed()
    .required()
    .test('is-required', CERTIFICATE_REQUIRED_ERROR, (value) => {
      return !!(value instanceof FileList && value[0]);
    })
    .test('is-valid-type', CERTIFICATE_TYPE_ERROR, (value) => {
      return value instanceof FileList && value[0] ? CERTIFICATE_TYPE.includes(value[0].type) : true;
    }),
});
