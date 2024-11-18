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
   * 简介
   */
  @Property()
  remark?: string;

  /**
   * 创建者
   */
  @Property({ lazy: true })
  createdBy = DEFAULT_DB_USER;

  /**
   * 创建时间
   */
  @Property({ lazy: true })
  createdAt = new Date();

  /**
   * 最后更新用户
   */
  @Property({ lazy: true })
  updatedBy = DEFAULT_DB_USER;

  /**
   * 最后更新时间
   */
  @Property({ onUpdate: () => new Date(), lazy: true })
  updatedAt = new Date();
}
