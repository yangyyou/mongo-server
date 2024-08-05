import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { AllConfigType } from 'src/config';
import { createLoggerTransports } from './logger';
import { RedisService } from './redis/redis.service';
import { RedisModule } from './redis/redis.module';

@Global()
@Module({
  imports: [
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (conf: ConfigService<AllConfigType>) => {
        const loggerConf = conf.get('logger', { infer: true });
        return createLoggerTransports(loggerConf);
      },
    }),
    RedisModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (conf: ConfigService<AllConfigType>) => {
        const redisConf = conf.get('redis', { infer: true });
        return redisConf;
      },
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class SharedModule {}
