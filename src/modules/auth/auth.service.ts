import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AllConfigType } from '../../config';
import { RedisService } from '../../shared/redis/redis.service';
import { REDIS_KEY_USER_TOKEN } from '../../common/constant';

export interface JwtPayload {
  id: number;
  username: string;
}
export interface JwtRePayload extends JwtPayload {
  refresh_token: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly configSer: ConfigService<AllConfigType>,
    private readonly redisSer: RedisService,
    private readonly jwtSer: JwtService,
  ) {}

  /**
   * create refresh token and access token
   * @param userId user id
   * @param username user name
   * @returns refresh token and access token
   */
  async createTokens(userId: number, username: string) {
    const authConf = this.configSer.get('auth', { infer: true });
    const access_token = await this.jwtSer.signAsync(
      {
        id: userId,
        username: username,
      } as JwtPayload,
      { secret: authConf.access_secret, expiresIn: authConf.access_expire },
    );
    const refresh_token = await this.jwtSer.signAsync(
      {
        id: userId,
        username: username,
      } as JwtPayload,
      { secret: authConf.refresh_secret, expiresIn: authConf.refresh_expire },
    );
    this.cacheUpdateToken(userId, refresh_token);
    return { access_token, refresh_token };
  }

  /**
   * use refresh token to get new tokens
   * @param userId user id
   * @param username user name
   * @param refreshToken refresh token
   * @returns new access token and refresh token
   */
  async refreshToken(userId: number, username: string, refreshToken: string) {
    // check redis cache
    const redisCli = this.redisSer.getRedisClient();
    const token = await redisCli.get(REDIS_KEY_USER_TOKEN + userId);
    if (token != refreshToken)
      throw new UnauthorizedException('未登陆的账号，请重新登陆');

    return this.createTokens(userId, username);
  }

  /**
   * update refresh token in redis cache
   * @param userId user id
   * @param refresh_token refresh token
   * @returns boolean ret
   */
  async cacheUpdateToken(
    userId: number,
    refresh_token: string,
  ): Promise<boolean> {
    const authConf = this.configSer.get('auth', { infer: true });
    this.redisSer.setEx(
      REDIS_KEY_USER_TOKEN + userId,
      refresh_token,
      authConf.refresh_expire,
    );
    return true;
  }

  /**
   * delete redis cache refresh token
   * @param userId user id
   * @returns ret
   */
  async deleteTokenCache(userId: number) {
    return await this.redisSer.del(REDIS_KEY_USER_TOKEN + userId);
  }
}
