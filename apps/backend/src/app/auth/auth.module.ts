import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { TokensModule } from '../tokens/tokens.module';
import { JwtModule } from '@nestjs/jwt';
import { getJWTConfig } from '../config/jwt.config';

@Module({
  imports: [
    UsersModule, 
    TokensModule,
    JwtModule.registerAsync(getJWTConfig()),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
