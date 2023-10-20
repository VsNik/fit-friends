import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response, NextFunction } from 'express';
import { RequestExpress } from '../types/request-express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService, private readonly configService: ConfigService) {}

  use(req: RequestExpress, res: Response, next: NextFunction) {
    const authHeaders = req.headers.authorization;

    if (!authHeaders) {
      req.user = null;
      req.role = null;
      req.accessToken = null;
      next();
      return;
    }

    const token = authHeaders.split(' ')[1];

    try {
      const decoded = this.jwtService.verify(token, { secret: this.configService.get('JWT_ACCESS_SECRET') });
      req.user = decoded.id;
      req.role = decoded.role;
      req.accessToken = token;
      next();
    } catch {
      req.user = null;
      req.role = null;
      req.accessToken = null;
      next();
    }
  }
}
