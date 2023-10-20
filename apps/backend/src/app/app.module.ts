import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
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
import { TokensModule } from './tokens/tokens.module';
import { Token } from './tokens/models/token.model';
import { AuthMiddleware } from './auth/middlewares/auth.middleware';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate }),
    TypeOrmModule.forRootAsync(getORMConfig(User, Token, Training, Review, Order)),
    UsersModule,
    TrainingsModule,
    ReviewsModule,
    OrdersModule,
    TokensModule,
    AuthModule,
  ],
  providers: [JwtService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
