import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { RedisClients } from './redis.interface';
import { Cluster, Redis } from 'ioredis';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

export const REDIS_MODULE_OPTIONS_TOKEN = 'REDIS_MODULE_OPTIONS';
export const REDIS_CLIENT_TOKEN = 'REDIS_CLIENT';
export const REDIS_CLIENT_DEFAULT = 'default';

@Injectable()
export class RedisService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    @Inject(REDIS_CLIENT_TOKEN)
    private readonly clients: RedisClients,
  ) {}

  /**
   * Get Redis Client by name
   * @param name redis client name
   * @returns Redis client
   */
  getRedisClient(name = REDIS_CLIENT_DEFAULT): Redis {
    const client = this.clients.get(name);
    if (client instanceof Redis) return client;
    this.logger.warn(`Can't find redis client ${name}`);
    return null;
  }

  /**
   * Get cluster client by name
   * @param name cluster client name
   * @returns cluster
   */
  getClusterClient(name: string): Cluster {
    const client = this.clients.get(name);
    if (client instanceof Cluster) return client;
    this.logger.warn(`Can't find cluster client ${name}`);
    return null;
  }

  /**
   * Set redis value
   * @param key key name
   * @param value value
   * @param name redis client name
   * @returns boolean ret
   */
  async set(
    key: string,
    value: number | string | boolean | object,
    name = REDIS_CLIENT_DEFAULT,
  ): Promise<boolean> {
    let result = '';
    const client = this.getRedisClient(name);
    if (!client) return false;
    if (typeof value === 'object') {
      result = await client.set(key, Buffer.from(JSON.stringify(value)));
    } else if (typeof value === 'boolean') {
      result = await client.set(key, String(value));
    } else {
      result = await client.set(key, value);
    }

    return result === 'OK';
  }

  /**
   * set value with expire time.
   * @param key key name
   * @param value value
   * @param expire expire time support m(minus)/h(hour)/d(day), eg: '10h' 10 hours.
   * @param name redis client name
   * @returns boolean ret
   */
  async setEx(
    key: string,
    value: number | string | boolean | object,
    expire?: number | string,
    name = REDIS_CLIENT_DEFAULT,
  ): Promise<boolean> {
    const client = this.getRedisClient(name);
    if (!this.set(key, value, name)) {
      return false;
    }
    let seconds: number;
    if (typeof expire === 'string') {
      const matchArray = expire.match(/(\d+)([mhd])/);
      if (!matchArray) {
        this.logger.warn(
          `redis [${name}] set expire error: invalid ttl: ${expire}`,
        );
        return false;
      }
      const [, num, unit] = matchArray;
      const multiplier: Record<string, number> = {
        m: 60,
        h: 60 * 60,
        d: 24 * 60 * 60,
      };
      seconds = Math.floor(parseInt(num) * multiplier[unit]);
    } else {
      seconds = expire;
    }
    const ret = await client.expire(key, seconds);
    if (ret != 1) {
      this.logger.log(`redis [${name}] set expire fail`);
    }
    return true;
  }
}
