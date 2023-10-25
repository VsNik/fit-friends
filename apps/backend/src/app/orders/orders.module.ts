import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { TrainingsModule } from '../trainings/trainings.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './models/order.model';
import { ORDERS_REPO } from './entities/orders-repository.interface';
import { OrdersRepository } from './orders.repository';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';

@Module({
  imports: [UsersModule, TrainingsModule, TypeOrmModule.forFeature([Order])],
  providers: [
    OrdersService,
    {
      provide: ORDERS_REPO,
      useClass: OrdersRepository,
    },
  ],
  controllers: [OrdersController],
})
export class OrdersModule {}
