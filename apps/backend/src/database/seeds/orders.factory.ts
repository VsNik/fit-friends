import { setSeederFactory } from 'typeorm-extension';
import { Order } from '../../app/orders/models/order.model';
import { Faker } from '@faker-js/faker';
import { OrderType, PaymentType } from '@fit-friends/shared';

export const OrdersFactory = setSeederFactory(Order, (faker: Faker) => {
  const order = new Order();

  order.id = faker.string.uuid();
  order.type = OrderType.Abonement;
  order.price = faker.number.int({ min: 100, max: 2000 });
  order.count = faker.number.int({ min: 1, max: 10 });
  order.totalPrice = order.price * order.count;
  order.paymentType = faker.helpers.enumValue(PaymentType);
  order.createdAt = faker.date.between({ from: '2012-01-01T00:00:00.000Z', to: '2023-01-01T00:00:00.000Z' }).toISOString();

  return order;
});
