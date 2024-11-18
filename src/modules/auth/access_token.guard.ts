import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { RedisService } from '../../shared/redis/redis.service';
import { Request } from 'express';
import { JwtPayload } from './auth.service';
import { PUBLIC_DECORATOR, REDIS_KEY_USER_TOKEN } from '../../common/constant';

@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt') {
  constructor(
    private readonly reflector: Reflector,
    private readonly redisSer: RedisService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();

    // check if method is public
    const isPublic = this.reflector.get<boolean>(
      PUBLIC_DECORATOR,
      context.getHandler(),
    );
    if (isPublic) return true;

    // check if user is login
    const bAccess = await super.canActivate(context);
    const payload = req.user as JwtPayload;
    const refresh_token = await this.redisSer.get(
      REDIS_KEY_USER_TOKEN + payload.id,
    );
    if (!refresh_token) return false;

    return bAccess == true;
  }
}
