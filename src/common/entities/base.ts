import {
  BaseEntity as MikroBaseEntity,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';

const DEFAULT_DB_USER = 'system';

export abstract class BaseEntity extends MikroBaseEntity {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  /**
   * 是否启用
   */
  @Property({ type: 'bool' })
  enable = true;

  /**
   * 创建着
   */
  @Property()
  createdBy = DEFAULT_DB_USER;

  /**
   * 创建时间
   */
  @Property()
  createdAt = new Date();

  /**
   * 最后更新用户
   */
  @Property()
  updatedBy = DEFAULT_DB_USER;

  /**
   * 最后更新时间
   */
  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  /**
   * 简介
   */
  @Property()
  remark?: string;
}
