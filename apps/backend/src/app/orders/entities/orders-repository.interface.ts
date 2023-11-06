import { OrderEntity } from './order.entity';

export const ORDERS_REPO = Symbol('ORDERS_REPO');

export interface IOrdersRepository {
  save(entity: OrderEntity): Promise<OrderEntity>;
}
