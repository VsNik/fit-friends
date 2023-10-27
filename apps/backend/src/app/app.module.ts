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
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { BalanceModule } from './balance/balance.module';
import { Balance } from './balance/models/balance.model';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate }),
    TypeOrmModule.forRootAsync(getORMConfig(User, Token, Training, Review, Order, Balance)),
    ServeStaticModule.forRoot({
      rootPath: process.env.UPLOAD_DIR,
      serveRoot: process.env.SERVE_ROOT,
    }),
    UsersModule,
    TrainingsModule,
    ReviewsModule,
    OrdersModule,
    TokensModule,
    AuthModule,
    FilesModule,
    BalanceModule,
    NotificationsModule,
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
