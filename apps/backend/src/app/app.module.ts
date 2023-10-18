import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getORMConfig } from './config/orm.config';
import { validate } from './env.validation';
import { UsersModule } from './users/users.module';
import { User } from './users/models/user.model';
import { TrainingsModule } from './trainings/trainings.module';
import { Training } from './trainings/models/training.model';
import { ReviewsModule } from './reviews/reviews.module';
import { Review } from './reviews/models/review.model';
import { OrdersModule } from './orders/orders.module';
import { Order } from './orders/models/order.model';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate }),
    TypeOrmModule.forRootAsync(getORMConfig(User, Training, Review, Order)),
    UsersModule,
    TrainingsModule,
    ReviewsModule,
    OrdersModule,
  ],
})
export class AppModule {}
