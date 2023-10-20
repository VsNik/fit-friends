import { IToken } from '../token.interface';

export class TokenEntity implements IToken {
  id: string;
  userId: string;
  sessionId: string;
  expiresTo: Date;
  createdAt: Date;

  public static create(item: Partial<IToken>) {
    const token = new TokenEntity();
    Object.assign(token, item);
    return token;
  }

  public toObject(): IToken {
    return {...this};
  }
}
