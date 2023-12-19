import { TokenEntity } from './token.entity';

export const TOKENS_REPO = Symbol('TOKENS_REPO');

export interface ITokensRepository {
  create(entity: TokenEntity): Promise<TokenEntity>;
  findByTokenId(tokenId: string): Promise<TokenEntity>;
  deleteByTokenId(tokenId: string): Promise<boolean>;
  deleteExpiredTokens(): Promise<void>;
}
