import { Injectable } from '@nestjs/common';
import { IOrdersRepository } from './entities/orders-repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './models/order.model';
import { Repository } from 'typeorm';
import { OrderEntity } from './entities/order.entity';

@Injectable()
export class OrdersRepository implements IOrdersRepository {
  constructor(@InjectRepository(Order) private readonly repository: Repository<Order>) {}

  async save(entity: OrderEntity): Promise<OrderEntity> {
    return this.repository.save(entity);
  }
}
