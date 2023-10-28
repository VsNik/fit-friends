import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alert } from './models/alert.model';
import { ALERT_REPO } from './entities/alerts-repository.interface';
import { AlertsRepository } from './alerts.interface';
import { UserAddedToFriendsListener } from './listeners/user-added-to-friends.listener';

@Module({
  imports: [TypeOrmModule.forFeature([Alert])],
  providers: [
    UserAddedToFriendsListener,
    {
      provide: ALERT_REPO,
      useClass: AlertsRepository,
    },
  ],
})
export class AlertsModule {}
