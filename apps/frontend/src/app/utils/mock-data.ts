import { faker } from '@faker-js/faker';
import {
  Gender,
  IAlert,
  IAlertCollection,
  IBalance,
  IBalanceCollection,
  IInvitation,
  IOrder,
  IReview,
  IReviewCollection,
  ITraining,
  ITrainingCollection,
  IUser,
  InviteStatus,
  OrderType,
  PaymentType,
  Role,
  TrainingDuration,
  TrainingLevel,
  TrainingType,
  Location,
  IUserCollection,
} from '@fit-friends/shared';
import { TrainingFilter, UsersFilters } from '../types/state-type';
import { ReviewValidate, TrainingValidate } from '@fit-friends/libs/validation';

export const MOCK_ID = 1;
export const UNKNOWN_ACTION = 'UNKNOWN_ACTION';

export const fakeError = {
  error: 400,
  message: {
    field: 'field',
    error: faker.lorem.words(),
  },
  statusCode: 400,
};

export const mockTrainingFilter: TrainingFilter = {
  priceTo: TrainingValidate.PriceMin,
  priceFrom: TrainingValidate.PriceMax,
  caloriesTo: TrainingValidate.CaloryMin,
  caloriesFrom: TrainingValidate.CaloryMax,
  ratingTo: ReviewValidate.RatingMin,
  ratingFrom: ReviewValidate.RatingMax,
  types: [],
  durations: [],
};

export const mockUsersFilter: UsersFilters = {
  location: [],
  types: [],
  level: '',
};

export const makeFakeBalance = (): IBalance => ({
  id: faker.string.uuid(),
  userId: faker.string.uuid(),
  training: {} as ITraining,
  count: faker.number.int(),
  createdAt: faker.date.anytime().toISOString(),
  isActive: faker.datatype.boolean(),
});

export const makeFakeBalanceCollection = (length = 2): IBalanceCollection => ({
  data: Array.from({ length }, () => makeFakeBalance()),
  page: 1,
  total: 2,
});

export const makeFakeInvitation = (): IInvitation => ({
  id: faker.string.uuid(),
  initiatorId: faker.string.uuid(),
  toUserId: faker.string.uuid(),
  status: faker.helpers.enumValue(InviteStatus),
  createdAt: faker.date.anytime().toISOString(),
  changedAt: faker.date.anytime().toISOString(),
});

export const makeFakeInvitations = (): IInvitation[] => Array.from({ length: 2 }, () => makeFakeInvitation());

export const makeFakeNotification = (): IAlert => ({
  id: faker.string.uuid(),
  fromUserId: faker.string.uuid(),
  userId: faker.string.uuid(),
  text: faker.lorem.words(),
  createdAt: faker.date.anytime().toISOString(),
});

export const makeFakeNotifications = (length = 2): IAlertCollection => ({
  data: Array.from({ length }, () => makeFakeNotification()),
  page: 1,
  total: 2,
});

export const makeFakeOrder = (): IOrder => ({
  id: faker.string.uuid(),
  type: OrderType.Abonement,
  training: {} as ITraining,
  price: faker.number.int(),
  count: faker.number.int(),
  totalPrice: faker.number.int(),
  paymentType: faker.helpers.enumValue(PaymentType),
  user: {} as IUser,
  createdAt: faker.date.anytime().toISOString(),
});

export const makeFakeReview = (): IReview => ({
  id: faker.string.uuid(),
  user: {} as IUser,
  training: {} as ITraining,
  rating: faker.number.int(),
  text: faker.lorem.words(),
  createdAt: faker.date.anytime().toISOString(),
});

export const makeFakeReviewCollection = (length = 2): IReviewCollection => ({
  data: Array.from({ length }, () => makeFakeReview()),
  page: 1,
  total: 0,
});

export const makeFakeTraining = (): ITraining => ({
  id: faker.string.uuid(),
  title: faker.lorem.words(),
  bgImage: faker.image.url(),
  level: faker.helpers.enumValue(TrainingLevel),
  type: faker.helpers.enumValue(TrainingType),
  duration: faker.helpers.enumValue(TrainingDuration),
  price: faker.number.int(),
  calories: faker.number.int(),
  description: faker.lorem.words(),
  gender: faker.helpers.enumValue(Gender),
  video: 'video.mp4',
  rating: faker.number.int({ min: 0, max: 5 }),
  coach: {} as IUser,
  isSpecial: faker.datatype.boolean(),
  ordersCount: faker.number.int(),
  ordersSumm: faker.number.int(),
  createdAt: faker.date.anytime().toISOString(),
});

export const makeFakeTrainingCollection = (length = 2): ITrainingCollection => ({
  data: Array.from({ length }, () => makeFakeTraining()),
  page: 1,
  total: 0,
});

export const makeFakeUser = (): IUser => ({
  id: faker.string.uuid(),
  name: faker.internet.userName(),
  email: faker.internet.email(),
  avatar: faker.internet.avatar(),
  gender: faker.helpers.enumValue(Gender),
  birthDay: faker.date.anytime().toISOString(),
  role: faker.helpers.enumValue(Role),
  bio: faker.lorem.words(),
  location: faker.helpers.enumValue(Location),
  bgImage: [],
  trainingLevel: faker.helpers.enumValue(TrainingLevel),
  trainingType: [faker.helpers.enumValue(TrainingType)],
  createdAt: faker.date.anytime().toISOString(),
});

export const makeFakeUserCollection = (length = 2): IUserCollection => ({
  data: Array.from({ length }, () => makeFakeUser()),
  page: 1,
  total: 0,
});
