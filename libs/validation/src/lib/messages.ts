import { MAX_AVATAR_SIZE, OrderValidate, ReviewValidate, TrainingValidate, UserValidate } from './constants';
import { Gender, Role, Location, TrainingLevel, TrainingType, TrainingDuration, OrderType, PaymentType, InviteStatus } from '@fit-friends/shared';

export const AVATAR_SIZE_ERROR = `Максимальный размер Аватара - ${MAX_AVATAR_SIZE}.`;
export const USER_NAME_LENGTH = `Длина имени пользователя от ${UserValidate.NameMinLength} до ${UserValidate.NameMaxLength}`;
export const PASSWORD_LENGTH = `Длина пароля должена быть от ${UserValidate.PasswordMinLength}, до ${UserValidate.PasswordMaxLength}`;
export const GENDER_VALUES = `Допустимые значения: "${Gender.Male}, ${Gender.Female}, ${Gender.AnyGender}"`;
export const ROLE_VALUES = `Доступные роли: "${Role.User}, ${Role.Coach}"`;
export const BIO_LENGTH = `Длина описания пользователя должна быть от ${UserValidate.BioMinLength} до ${UserValidate.BioMaxLength}`;
export const LOCATION_VALUES = `Допустимые значения: "${Location.Pionerskaya}, ${Location.Sportivnaya}, ${Location.Udelnaya}, ${Location.Zvezdnaya}"`;
export const LEVEL_VALUES = `Доступные значения: "${TrainingLevel.Amateur}, ${TrainingLevel.Novice}, ${TrainingLevel.Professional}"`;
export const TRAININGTYPE_VALUES = `Допустимые тренировки: "${TrainingType.Aerobic}, ${TrainingType.Beg}, ${TrainingType.Boxing}, ${TrainingType.Crossfit}, ${TrainingType.Pilates}, ${TrainingType.Stretching}, ${TrainingType.Yoga}"`;
export const TRAININGTYPE_MAX_SIZE = `Максимальное количество тренировок - ${UserValidate.TrainingTypeMaxCount}`;
export const LOSE_CALORY_MIN = `Минимальное количество калорий для сброса - ${UserValidate.CaloryMin}`;
export const LOSE_CALORY_MAX = `Максимальное количество калорий для сброса - ${UserValidate.CaloryMax}`;
export const BURN_CALORY_MIN = `Минимальное количество калорий для траты в день - ${UserValidate.CaloryMin}`;
export const BURN_CALORY_MAX = `Максимальное количество калорий для траты в день - ${UserValidate.CaloryMax}`;
export const DURATION_VALUES = `Доступные значения длительности тренировки: ${TrainingDuration.Low}, ${TrainingDuration.Normal}, ${TrainingDuration.Hi}, ${TrainingDuration.Extra}`;
export const MERTIS_LENGTH = `Длина текста с заслугами тренера - от ${UserValidate.MeritsMinLength} до ${UserValidate.MeritsMaxLength} символов`;
export const TRAINING_TITLE_LENGTH = `Длина названия тренировки от ${TrainingValidate.TitleMinLength} до ${TrainingValidate.TitleMaxLength} символов`;
export const TRAINING_DESCRIPTION_LENGTH = `Длина описания тренировки должна быть от ${TrainingValidate.DescriptionMinLength} до ${TrainingValidate.DescriptionMaxLength} символов`;
export const RATING_IS_NUMBER = `Оценка тренировки должна быть целым числом от ${ReviewValidate.RatingMin} до ${ReviewValidate.RatingMax}`;
export const REVIEW_IS_STRING = `Отзыв должен быть строкой, от ${ReviewValidate.TextMinLength} до ${ReviewValidate.TextMaxLength} символов`;
export const ORDER_TYPE_VALUE = `Допустимые значения вида покупки: ${OrderType.Abonement}`;
export const ORDER_COUNT_IS_NUMBER = `Количество приобретаемых тренировок должно быть целым положительным числом от ${OrderValidate.CountMin} до ${OrderValidate.CountMax}`;
export const PAYMENT_TYPE_VALUE = `Доступные спозобы оплаты: ${PaymentType.Visa}, ${PaymentType.Mir}, ${PaymentType.Umoney}`;
export const INVITE_STATUS_VALUE = `Статус заявки может быть: ${InviteStatus.Waiting}, ${InviteStatus.Accepted}, ${InviteStatus.Rejected}`;

export enum AppError {
  Unauthorized = 'Unauthorized',
  UserNotFound = 'User not found',
  CoachNotFound = 'Coach not found.',
  TrainingNotFound = 'Training not found',
  InvitationNotFound = 'Invitation not found',
  AlertNotFound = 'Alert not found.',
}

export enum OtherError {
  Credentials = 'Неверный Email адрес и/или Пароль',
  UserExist = 'Пользователь с таким Email уже существует.',
  FollowEqual = 'Нельзя добавить себя в друзья.',
  SubscribeRole = 'Подписатся можно только на пользователя с ролью "Тренир".',
  NotOwner = 'Вы не автор.',
  NotifyEmpty = 'Список уведомлений пуст.',
  SelfInvite = 'Нельзя пригласить себя.',
  TrainingCount = 'Недостаточно тренировок для списания',
  NotYouAlert = 'Это не ваше оповещение',
  AvatarType = 'Аватар должен быть изображением: "jpg / png."',
  ReviewRequired = 'Текст отзыва обязателен для заполнения',
  PaymentRequired = 'Способ оплаты обязателен для заполнения',
  OrderCountRequired = 'Количество приобретаемых тренировок обязательно для звполнения',
  InviteStatusRequired = 'Статус заявки обязателен для заполнения',
}

export enum UserError {
  NameString = 'Мия должно быть строкой.',
  NameRequired = 'Имя Обязательно для заполнения.',
  EmailIncorrect = 'Некоректный Email адрес.',
  EmailRequired = 'Email не может быть пустым.',
  PasswordString = 'Пароль должен быть строкой.',
  PasswordRequired = 'Пароль не может быть пустым.',
  GenderRequired = 'Пол должен быть указан',
  BirtdayReqyured = 'Укажите дату рождения',
  BirtdayString = 'День рождения должен быть строкой',
  RoleRequired = 'Роль не может быть пустой.',
  BioString = 'Описание пользователя должно быть строкой.',
  LocationRequired = 'Локация не может быть пустой.',
  LevelRequired = 'Укажите уровень подготовки.',
  TypeMinCount = 'Выберите типы тренировок',
  DurationRequired = 'Укажите длительность тренировок',
  LoseCaloryNumber = 'Количество калорий для траты в день должно быть числом',
  LoseCaloryRequired = 'Укажите количество калорий',
  BurnCaloryNumber = 'Количество калорий для сброса должно быть числом',
  BurnCaloryRequired = 'Укажите количество калорий для траты в день',
  ReadyBoolean = 'Готовность к тренировке длжно быть булиевым значением',
  ReadyRequired = 'Готовность к тренировке не может быть пустым',
  MeritsRequired = 'Укажите Ваши заслуги',
  MeritsString = 'Заслуги тренера должно выть текстом',
  PersonalBoolean = 'Готовность к личным тренировкам длжно быть булиевым значением',
  PersonalRequired = 'Готовность к личным тренировкам не может быть пустым',
}

export enum TrainingError {
  TitleString = 'Название тренировки должно быть строкой',
  TitleRequired = 'Название тренировки обязательно для заполнения',
  TypeRequired = 'Тип тренировки обязательно для заполнения',
  PriceNumber = 'Цена тренировки должна быть числом больше или равным нулю',
  PriceRequired = 'Цена тренировки обязательно для заполнения',
  DescString = 'Описание тренировки должно быть строкой',
  DescRequired = 'Описание тренировки обязательно для заполнения',
  SpecialBoolean = 'Признак специального предложения должно выть булиевым значением',
  SpecialRequired = 'Признак специального предложения обязателен для заполнения',
  VideoRequired = 'Видео тренировки обязательно для загрузки',
  VideoType = 'Видео тренировки должно быть в формате "mov / avi / mp4"',
}

export enum CertificateError {
  Required = 'Фаил сертификата обязателен для загрузки.',
  Type = 'Фаил сертификата должен быть в формате "pdf".',
}

export enum BalanceError {
  Required = 'Количество тренировок обязательно для звполнения',
  Number = 'Количество тренировок должно быть целым положительным числом',
}
