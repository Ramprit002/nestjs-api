import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ExpressRequest } from '../types/expressRequest.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<ExpressRequest>();
    if (request.user) {
      return true;
    }
    throw new HttpException('not authorized', HttpStatus.UNAUTHORIZED);
  }
}
