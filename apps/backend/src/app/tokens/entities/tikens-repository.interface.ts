import { TokenEntity } from './token.entity';

export interface ITokensRepository {
  create(entity: TokenEntity): Promise<TokenEntity>;
  findByTokenId(tokenId: string): Promise<TokenEntity>;
  deleteByTokenId(tokenId: string): Promise<void>;
  deleteExpiredTokens(): Promise<void>;
}

export const TOKENS_REPO = Symbol('TOKENS_REPO');
