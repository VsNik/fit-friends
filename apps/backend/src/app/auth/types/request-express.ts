import { Request } from 'express';
import { Role } from '@fit-friends/libs/types';

export interface RequestExpress extends Request {
  user?: string;
  role?: Role;
  accessToken?: string;
  refreshToken?: string;
}
