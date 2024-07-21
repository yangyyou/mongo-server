import dev from './dev';
import prod from './prod';
import { WinstonLoggerConfig } from '../shared/logger';
import { RedisModuleOptions } from 'src/shared/redis/redis.interface';

export type AllConfigType = {
  logger: WinstonLoggerConfig;
  redis: RedisModuleOptions | RedisModuleOptions[];
};

export const env = process.env.NODE_ENV || 'dev';

export const getConfig = () => {
  const evnMap = {
    dev,
    prod,
  };
  return evnMap[env]() as AllConfigType;
};
