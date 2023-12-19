import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { JwtService } from '@nestjs/jwt';
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
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { BalanceModule } from './balance/balance.module';
import { Balance } from './balance/models/balance.model';
import { NotifyModule } from './notify/notify.module';
import { Notify } from './notify/models/notify.model';
import { AlertsModule } from './alerts/alerts.module';
import { Alert } from './alerts/models/alert.model';
import { Invitation } from './invitations/models/invitation.model';
import { InvitationsModule } from './invitations/invitations.module';
import path from 'path';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true, validate }),
    TypeOrmModule.forRootAsync(getORMConfig(User, Token, Training, Review, Order, Balance, Notify, Alert, Invitation)),
    ServeStaticModule.forRoot({
      rootPath: process.env.UPLOAD_DIR,
      serveRoot: process.env.SERVE_ROOT,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, process.env.STATIC_DIR),
      serveRoot: process.env.STATIC_ROOT,
    }),
    UsersModule,
    TrainingsModule,
    ReviewsModule,
    OrdersModule,
    TokensModule,
    AuthModule,
    FilesModule,
    BalanceModule,
    NotifyModule,
    AlertsModule,
    InvitationsModule,
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
