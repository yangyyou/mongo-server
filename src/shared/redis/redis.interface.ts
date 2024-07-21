import { ModuleMetadata } from '@nestjs/common';
import {
  Cluster,
  ClusterNode,
  ClusterOptions,
  Redis,
  RedisOptions,
} from 'ioredis';

export interface RedisModuleOptions extends RedisOptions {
  /**
   * redis connect name, default
   */
  name?: string;

  /**
   * use url to connect redis
   */
  url?: string;

  /**
   * is cluster mode
   */
  cluster: boolean;

  /**
   * cluster node
   */
  node?: ClusterNode[];

  /**
   * cluster option
   */
  clusterOpt: ClusterOptions;
}

export interface RedisModuleAsyncOptions
  extends Pick<ModuleMetadata, 'exports' | 'providers'> {
  inject: any[];
  useFactory: (
    ...args: any[]
  ) =>
    | RedisModuleOptions
    | RedisModuleOptions[]
    | Promise<RedisModuleOptions>
    | Promise<RedisModuleOptions[]>;
}

export type RedisClients = Map<string, Redis | Cluster>;
