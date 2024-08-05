import { Entity, Enum, Property } from '@mikro-orm/core';
import { USER_SEX, USER_TYPE } from '../../../common/constant';
import { BaseEntity } from '../../../common/entities/base';

@Entity({ tableName: 'user_tab' })
export class User extends BaseEntity {
  @Property()
  username!: string;

  @Property()
  password!: string;

  @Enum(() => USER_TYPE)
  type = USER_TYPE;

  @Property()
  email!: string;

  @Property({ length: 11 })
  phone_number: string;

  @Enum(() => USER_SEX)
  sex: USER_SEX;

  @Property()
  avatar: string;
}
