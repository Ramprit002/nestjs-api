import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { ExpressRequest } from './../types/expressRequest.interface';
import { UserService } from './user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: UserService) {}

  async use(req: ExpressRequest, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }
    const token = req.headers.authorization.split(' ')[1];
    try {
      //TODO: need to add JWT_SECRET
      const decoded = await verify(token, 'random');
      const user = await this.authService.findOne(decoded.id);
      req.user = user;
      next();
    } catch (error) {
      req.user = null;
      next();
    }
  }
}
