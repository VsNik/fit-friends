import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { parseTime } from '@fit-friends/libs/utils';
import dayjs from 'dayjs';
import { ITokensRepository, TOKENS_REPO } from './entities/tikens-repository.interface';
import { TokenEntity } from './entities/token.entity';
import { IToken } from './token.interface';

@Injectable()
export class TokensService {
  constructor(
    @Inject(TOKENS_REPO)
    private readonly tokensRepository: ITokensRepository,
    private readonly configService: ConfigService,
  ) {}

  async createRefreshSession(userId: string, sessionId: string): Promise<IToken> {
    const timeValue = parseTime(this.configService.get('JWT_REFRESH_EXPIRE'));
    const expiresTo = dayjs().add(timeValue.value, timeValue.unit).toDate();
    const token = TokenEntity.create({ userId, sessionId, expiresTo });
    const savedToken = await this.tokensRepository.create(token);
    return savedToken.toObject();
  }

  async isExist(tokenId: string): Promise<boolean> {
    const token = await this.tokensRepository.findByTokenId(tokenId);
    return token !== null;
  }

  async deleteRefreshSession(sessionId: string): Promise<void> {
    await this.tokensRepository.deleteByTokenId(sessionId);
    await this.tokensRepository.deleteExpiredTokens();
  }
}
