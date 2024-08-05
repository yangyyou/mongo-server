import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { RedisService } from '../../shared/redis/redis.service';
import { Request } from 'express';

@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt') {
  constructor(
    private readonly reflector: Reflector,
    private readonly redisSer: RedisService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const bAccess = await super.canActivate(context);
    const req = context.switchToHttp().getRequest<Request>();

    return bAccess == true;
  }
}
