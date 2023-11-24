import { OrderType, PaymentType } from '@fit-friends/shared';

export type CreatedOrderType = {
  type: OrderType;
  training: string;
  count: number;
  paymentType: PaymentType;
};

export type CreateReviewType = {
  trainingId: string;
  rating: number;
  text: string;
}
