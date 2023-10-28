import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alert } from './models/alert.model';
import { ALERT_REPO } from './entities/alerts-repository.interface';
import { AlertsRepository } from './alerts.repository';
import { UserAddedToFriendsListener } from './listeners/user-added-to-friends.listener';
import { AlertsService } from './alerts.service';
import { AlertsController } from './alerts.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Alert])],
  providers: [
    AlertsService,
    UserAddedToFriendsListener,
    {
      provide: ALERT_REPO,
      useClass: AlertsRepository,
    },
  ],
  controllers: [AlertsController],
})
export class AlertsModule {}
