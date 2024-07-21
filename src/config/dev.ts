import { AllConfigType } from '.';

export const getConfig = () =>
  ({
    logger: {
      level: 'info',
      consoleLevel: 'debug',
      maxFile: '2m',
      maxFileSize: '20m',
      appLogName: 'web',
      errLogName: 'err',
      dirname: 'logs',
    },
    redis: [
      { host: 'localhost', port: 6379, password: 'secret_redis', db: 0 },
      {
        name: 'app',
        url: 'redis://:secret_redis@localhost:6379/2',
      },
    ],
  }) as AllConfigType;

export default getConfig;
