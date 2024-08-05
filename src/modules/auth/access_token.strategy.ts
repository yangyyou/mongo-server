import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { AllConfigType } from '../../config';
import { Request } from 'express';
import { JwtPayload } from './auth.service';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly confSer: ConfigService<AllConfigType>) {
    const authConfig = confSer.get('auth', { infer: true });
    super(<StrategyOptions>{
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: authConfig.access_secret,
      passReqToCallback: true,
    });
  }
  async validate(req: Request, payload: JwtPayload) {
    return payload;
  }
}
