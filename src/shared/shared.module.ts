import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { AllConfigType } from 'src/config';
import { createLoggerTransports } from './logger';

@Module({
  imports: [
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (conf: ConfigService<AllConfigType>) => {
        const loggerConf = conf.get('logger', { infer: true });
        return createLoggerTransports(loggerConf);
      },
    }),
  ],
})
export class SharedModule {}
