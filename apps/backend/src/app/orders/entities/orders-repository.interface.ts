import { OrderEntity } from './order.entity';

export interface IOrdersRepository {
  create(entity: OrderEntity): Promise<OrderEntity>;
}

export const ORDERS_REPO = Symbol('ORDERS_REPO');
