import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { AllConfigType } from '../../config';
import { JwtPayload, JwtRePayload } from './auth.service';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-re') {
  constructor(private readonly confSer: ConfigService<AllConfigType>) {
    const authConf = confSer.get('auth', { infer: true });
    super(<StrategyOptions>{
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: authConf.refresh_secret,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtPayload): Promise<JwtRePayload> {
    const refresh_token = req.get('Authorization').replace('Bearer', '').trim();
    return { ...payload, refresh_token };
  }
}
