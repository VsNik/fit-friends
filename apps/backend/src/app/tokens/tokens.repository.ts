import { Injectable } from '@nestjs/common';
import { ITokensRepository } from './entities/tikens-repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from './models/token.model';
import { LessThan, Repository } from 'typeorm';
import { TokenEntity } from './entities/token.entity';

@Injectable()
export class TokensRepository implements ITokensRepository {
  constructor(
    @InjectRepository(Token)
    private readonly repository: Repository<Token>,
  ) {}

  async create(entity: TokenEntity): Promise<TokenEntity> {
    return this.repository.save(entity);
  }

  async findByTokenId(sessionId: string): Promise<TokenEntity | null> {
    const token = await this.repository.findOneBy({ sessionId });
    return token ? TokenEntity.create(token) : null;
  }

  async deleteByTokenId(sessionId: string): Promise<void> {
    await this.repository.delete({ sessionId });
  }

  async deleteExpiredTokens(): Promise<void> {
    this.repository.delete({ expiresTo: LessThan(new Date()) });
  }
}
