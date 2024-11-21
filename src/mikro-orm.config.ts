import { Options } from '@mikro-orm/core';
import { MySqlDriver } from '@mikro-orm/mysql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { Migrator, TSMigrationGenerator } from '@mikro-orm/migrations';
import { SeedManager } from '@mikro-orm/seeder';
import { ExEntityRepository } from './common/entities/extend_entity_repository';

const config: Options = {
  /**
   * driver option
   */
  driver: MySqlDriver,

  /**
   * connect option
   */
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  dbName: 'mongo_db',

  /**
   * entity discovery
   */
  metadataProvider: TsMorphMetadataProvider,
  baseDir: process.cwd(),
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  // tsNode: true,

  /**
   *
   * debug option
   */
  debug: true,
  highlighter: new SqlHighlighter(),

  /**
   * migrations option
   */
  migrations: {
    tableName: 'orm_migrations',
    path: __dirname + '/../src/common/database/migrations',
    pathTs: __dirname + '/../dist/common/database/migrations',
    emit: 'ts',
    glob: '!(*.d).{js,ts}',
    generator: TSMigrationGenerator,
  },

  /**
   * seeder option
   */
  seeder: {
    path: __dirname + '/../dist/common/database/seeders',
    pathTs: __dirname + '/../src/common/database/seeders',
    emit: 'ts',
    glob: '!(*.d).{js,ts}',
  },

  /**
   * extends
   */
  extensions: [Migrator, SeedManager],

  entityRepository: ExEntityRepository,
};

export default config;
