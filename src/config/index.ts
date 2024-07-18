import dev from './dev';
import prod from './prod';
import { WinstonLoggerConfig } from '../shared/logger';

export type AllConfigType = {
  logger: WinstonLoggerConfig;
};

export const env = process.env.NODE_ENV || 'dev';

export const getConfig = () => {
  const evnMap = {
    dev,
    prod,
  };
  return evnMap[env]() as AllConfigType;
};
