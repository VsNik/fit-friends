export interface IToken {
  id: string;
  userId: string;
  sessionId: string;
  expiresTo: Date;
  createdAt: Date;
}
