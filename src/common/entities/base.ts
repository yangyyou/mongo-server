import {
  BaseEntity as MikroBaseEntity,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';

const DEFAULT_DB_USER = 'system';

export abstract class BaseEntity extends MikroBaseEntity {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property({ type: 'char' })
  status = '0';

  @Property()
  createdBy = DEFAULT_DB_USER;

  @Property()
  createdAt = new Date();

  @Property()
  updatedBy = DEFAULT_DB_USER;

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property()
  remark?: string;
}
