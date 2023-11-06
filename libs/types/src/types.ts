import 'multer';
import { Request } from 'express';
import { Role } from './common';

export type ExpressFile = Express.Multer.File;

export interface RequestExpress extends Request {
  user?: string;
  role?: Role;
  accessToken?: string;
}
