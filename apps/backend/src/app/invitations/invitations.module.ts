import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvitationsService } from './invitations.service';
import { InvitationsController } from './invitations.controller';
import { Invitation } from './models/invitation.model';
import { UsersModule } from '../users/users.module';
import { INVITATIONS_REPO } from './entities/invitations-repository.interface';
import { InvitationsRepository } from './invitations.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Invitation]),
    UsersModule,
  ],
  providers: [
    InvitationsService,
    {
      provide: INVITATIONS_REPO,
      useClass: InvitationsRepository,
    }
  ],
  controllers: [InvitationsController],
})
export class InvitationsModule {}
