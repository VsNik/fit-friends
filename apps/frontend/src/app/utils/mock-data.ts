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
  IAuthToken,
} from '@fit-friends/shared';
import { TrainingFilter, UsersFilters } from '../types/state-type';
import { ReviewValidate, TrainingValidate } from '@fit-friends/libs/validation';
import { CreateReviewType, LoginType, QuestionUserType, UpdateTrainingType } from '../types/forms-type';
import { CreatedOrderType } from '../types/common';

export const UNKNOWN_ACTION = 'UNKNOWN_ACTION';

export const makeMockToken = (): IAuthToken => ({
  accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWQiOiIxIiwicm9sZSI6InVzZXIifQ.WbnlGx36yAxEK2bjR9bxBQzbDZoqVbAfiOBE10u-kwk',
  refreshToken: 'refresh-token',
})

export enum TokenName {
  Access = 'access_token',
  Refresh = 'refresh_token',
}

export enum MockData {
  Id = '1',
  QueryString = '?page=1',
  Src = 'some-src',
}

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
  training: makeFakeTraining(),
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

export const makeFakeInvitations = (): IInvitation[] => 
  Array.from({ length: 2 }, () => makeFakeInvitation());

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
  user: makeFakeUser(Role.User),
  training: {} as ITraining,
  rating: faker.number.int({min: 0, max: 4}),
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

export const makeFakeUser = (role?: Role): IUser => ({
  id: faker.string.uuid(),
  name: faker.internet.userName(),
  email: faker.internet.email(),
  avatar: faker.internet.avatar(),
  gender: faker.helpers.enumValue(Gender),
  birthDay: faker.date.anytime().toISOString(),
  role: role ?? faker.helpers.enumValue(Role),
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

export const makeMockAuthData = (): LoginType => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const makeMockProfile = () => ({
  ...makeFakeUser(),
  token: makeMockToken(),
})

export const makeMockiSnupData = (): FormData => {
  const formData = new FormData();
  formData.append('email', faker.internet.email());
  formData.append('password', faker.internet.password());
  formData.append('name', faker.internet.userName());
  formData.append('location', Location.Pionerskaya);
  formData.append('role', Role.User);
  formData.append('gender',  Gender.AnyGender);
  return formData;
};

export const makMockUserData = (): QuestionUserType => ({
  trainingType: [faker.helpers.enumValue(TrainingType)],
  trainingDuration: faker.helpers.enumValue(TrainingDuration),
  trainingLevel: faker.helpers.enumValue(TrainingLevel),
  loseCalories: faker.number.int(),
  burnCalories: faker.number.int(),
  ready: faker.datatype.boolean(),
});

export const makeMockCoachData = (): FormData => {
  const formData = new FormData();
  formData.append('trainingType', faker.helpers.enumValue(TrainingType));
  formData.append('trainingLevel', faker.helpers.enumValue(TrainingLevel));
  formData.append('merits', faker.lorem.sentence());
  formData.append('personalTraining', `${faker.datatype.boolean()}`);
  return formData;
}

export const makeMockOrderData = (): CreatedOrderType => ({
  type: OrderType.Abonement,
  training: faker.string.uuid(),
  count: faker.number.int({min: 1, max: 3}),
  paymentType: PaymentType.Mir,
})

export const makeMockReviewData = (): CreateReviewType => ({
  rating: faker.number.int({min: 0, max: 5}),
  text: faker.lorem.sentence(),
})

export const makeMockAddTrainingData = (): FormData => {
  const formData = new FormData();
  formData.append('title', faker.lorem.words());
  formData.append('type', faker.helpers.enumValue(TrainingType));
  formData.append('calories', `${faker.number.int()}`);
  formData.append('duration', faker.helpers.enumValue(TrainingDuration));
  formData.append('price', `${faker.number.int()}`);
  formData.append('level', faker.helpers.enumValue(TrainingLevel));
  formData.append('gender', faker.helpers.enumValue(Gender));
  formData.append('description', faker.lorem.sentence());
  formData.append('isSpecial', `${faker.datatype.boolean()}`);
  return formData;
}

export const makeMockUpdateTrainingData = (): UpdateTrainingType => ({
  title: faker.lorem.words(),
  description: faker.lorem.sentence(),
  price: faker.number.int(),
  rating: faker.number.int({min: 0, max: 5}),
  isSpecial: faker.datatype.boolean()
})

export const makeMockAddVideoData = (): FormData => {
  const formData = new FormData();
  formData.append('video', 'some-video');
  return  formData;
}

export const makeMockAddCertificateData = (): FormData => {
  const formData = new FormData();
  formData.append('video', 'some-video');
  return  formData;
}

export const makeMockUpdateUserData = (): FormData => {
  const formData = new FormData();
  formData.append('name', faker.internet.userName());
  formData.append('bio', faker.lorem.sentence());
  formData.append('bio', faker.lorem.sentence());
  formData.append('personalTraining', `${faker.datatype.boolean()}`);
  formData.append('ready', `${faker.datatype.boolean()}`);
  formData.append('location', faker.helpers.enumValue(Location));
  formData.append('gender', faker.helpers.enumValue(Gender));
  formData.append('trainingType', faker.helpers.enumValue(TrainingType));
  formData.append('trainingLevel', faker.helpers.enumValue(TrainingLevel));
  return formData;
}
