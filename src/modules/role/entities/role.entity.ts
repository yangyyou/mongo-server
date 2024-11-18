import { Collection, Entity, ManyToMany, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../../common/entities/base';
import { Menu } from '../../menu/entities/menu.entity';

@Entity({ tableName: 'role_tab' })
export class Role extends BaseEntity {
  @Property({ fieldName: 'role_name', unique: true })
  role_name: string;

  @Property({ type: 'int' })
  sort: number;

  @ManyToMany()
  access_menus = new Collection<Menu>(this);

  constructor(name: string, sort = 255) {
    super();
    this.role_name = name;
    this.sort = sort;
  }
}
