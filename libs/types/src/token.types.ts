import { Role } from './common';

export interface IAuthToken {
  accessToken: string;
  refreshToken: string;
}

export interface IAccessTokenPayload {
  id: string;
  role: Role;
}

export interface IRefreshTokenPayload {
  userId: string;
  sessionId: string;
}
