import {
  BadRequestException,
  Inject,
  Injectable,
  LoggerService,
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { RedisService } from './shared/redis/redis.service';

@Injectable()
export class AppService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    private readonly redisSer: RedisService,
  ) {}
  getHello(): string {
    this.redisSer.set('aaa', 'aaa value');
    this.redisSer.setEx('bbb', 'bbb val', '100d', 'app');
    return 'Hello World!';
  }
}
