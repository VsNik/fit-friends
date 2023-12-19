import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainingsService } from './trainings.service';
import { TrainingsController } from './trainings.controller';
import { TRAININGS_REPO } from './entities/trainings-repository.interface';
import { TrainingsRepository } from './trainings.repository';
import { Training } from './models/training.model';
import { UsersModule } from '../users/users.module';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [TypeOrmModule.forFeature([Training]), UsersModule, FilesModule],
  providers: [
    TrainingsService,
    {
      provide: TRAININGS_REPO,
      useClass: TrainingsRepository,
    },
  ],
  controllers: [TrainingsController],
  exports: [TrainingsService],
})
export class TrainingsModule {}
