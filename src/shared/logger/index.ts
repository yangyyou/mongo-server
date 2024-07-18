import { utilities, WinstonModuleOptions } from 'nest-winston';
import { format, transports } from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

export type WinstonLogLevel = 'debug' | 'verbose' | 'info' | 'warn' | 'error';

/**
 * log value
 */
export const LogLevelValue: Record<WinstonLogLevel, number> = {
  debug: 4,
  verbose: 3,
  info: 2,
  warn: 1,
  error: 0,
};

// logger config
export type WinstonLoggerConfig = {
  /**
   * 日志输出等级, debug verbose info warn error
   */
  level?: WinstonLogLevel | 'none';

  /**
   * console输出等级
   */
  consoleLevel?: WinstonLogLevel | 'none';

  /**
   * max file size, eg: '2m' 2mb, '2k' 2kb
   */
  maxFileSize?: string;

  /**
   * max file number, eg: '5' 5 files, '5d' 5 day log files.
   */
  maxFile?: string;

  /**
   * app log file name, eg: web.log
   */
  appLogName?: string;

  /**
   * err log file name, eg: err.log
   */
  errLogName?: string;

  /**
   * log file dir
   */
  dirname?: string;
};

export const createLoggerTransports = (
  opt: WinstonLoggerConfig,
): WinstonModuleOptions => {
  const consoleTransport = new transports.Console({
    level: opt.consoleLevel,
    format: format.combine(
      format.timestamp(),
      format.ms(),
      utilities.format.nestLike('app', {
        colors: true,
        prettyPrint: true,
        processId: true,
        appName: true,
      }),
    ),
  });

  const dailyRotateFileOpt: DailyRotateFile.DailyRotateFileTransportOptions = {
    format: format.combine(
      format.timestamp({ format: 'YYYY/MM/DD hh:mm:ss' }),
      format.json(),
    ),
    datePattern: 'YYYY-MM-DD',
    dirname: opt.dirname,
    maxSize: opt.maxFileSize,
    maxFiles: opt.maxFile,
    level: opt.level,
    filename: opt.appLogName,
  };
  const webTransport = new DailyRotateFile(dailyRotateFileOpt);

  dailyRotateFileOpt.level = 'error';
  dailyRotateFileOpt.filename = opt.errLogName;
  const errTransport = new DailyRotateFile(dailyRotateFileOpt);

  return {
    level: opt.level,
    levels: LogLevelValue,
    transports: [consoleTransport, webTransport, errTransport],
  };
};
