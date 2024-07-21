import { Module, DynamicModule, Provider } from '@nestjs/common';
import {
  REDIS_CLIENT_DEFAULT,
  REDIS_CLIENT_TOKEN,
  REDIS_MODULE_OPTIONS_TOKEN,
  RedisService,
} from './redis.service';
import {
  RedisClients,
  RedisModuleAsyncOptions,
  RedisModuleOptions,
} from './redis.interface';
import { Cluster, Redis } from 'ioredis';

@Module({})
export class RedisModule {
  static forRootAsync(opt: RedisModuleAsyncOptions): DynamicModule {
    const clientsProvider: Provider = this.createAsyncProvider();
    return {
      module: RedisModule,
      providers: [
        RedisService,
        clientsProvider,
        {
          provide: REDIS_MODULE_OPTIONS_TOKEN,
          useFactory: opt.useFactory,
          inject: opt.inject,
        },
      ],
      exports: [clientsProvider, RedisService],
    };
  }

  private static createAsyncProvider(): Provider {
    return {
      provide: REDIS_CLIENT_TOKEN,
      inject: [REDIS_MODULE_OPTIONS_TOKEN],
      useFactory: (
        opt: RedisModuleOptions | RedisModuleOptions[],
      ): RedisClients => {
        const clients: RedisClients = new Map<string, Redis | Cluster>();
        if (Array.isArray(opt)) {
          opt.forEach((option) => {
            const name = option.name ?? REDIS_CLIENT_DEFAULT;
            const newCli = this.createClient(option);
            clients.set(name, newCli);
          });
        }
        return clients;
      },
    };
  }

  private static createClient(opt: RedisModuleOptions): Redis | Cluster {
    const { url, cluster, clusterOpt, node, ...redisOpt } = opt;
    let client: Redis | Cluster;
    if (url) client = new Redis(url);
    else if (cluster) client = new Cluster(node, clusterOpt);
    else client = new Redis(redisOpt);

    client.on('error', (err: Error) => {
      console.log(`connect redis [${opt.name}] error:` + err.message);
      client.disconnect();
      process.exit(1);
    });

    return client;
  }
}
