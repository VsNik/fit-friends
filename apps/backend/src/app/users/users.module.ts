import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.model';
import { USERS_REPO } from './entities/users-repository.interface';
import { UsersRepository } from './users.repository';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';
import { getJWTConfig } from '../config/jwt.config';
import { TokensModule } from '../tokens/tokens.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), 
    JwtModule.registerAsync(getJWTConfig()),
    TokensModule,
  ],
  providers: [
    UsersService,
    {
      provide: USERS_REPO,
      useClass: UsersRepository,
    },
  ],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
