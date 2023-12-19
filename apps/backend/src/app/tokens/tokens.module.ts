import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './models/token.model';
import { TOKENS_REPO } from './entities/tikens-repository.interface';
import { TokensRepository } from './tokens.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Token])],
  providers: [
    TokensService,
    {
      provide: TOKENS_REPO,
      useClass: TokensRepository,
    },
  ],
  exports: [TokensService],
})
export class TokensModule {}
