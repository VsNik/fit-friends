import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotifyService } from './notify.service';
import { NotifyController } from './notify.controller';
import { NOTIFY_REPO } from './entities/notify-repository.interface';
import { NotifyRepository } from './notify.repository';
import { Notify } from './models/notify.model';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Notify]), UsersModule],
  providers: [
    NotifyService,
    {
      provide: NOTIFY_REPO,
      useClass: NotifyRepository,
    },
  ],
  controllers: [NotifyController],
  exports: [NotifyService],
})
export class NotifyModule {}
