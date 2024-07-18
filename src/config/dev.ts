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
  }) as AllConfigType;

export default getConfig;
