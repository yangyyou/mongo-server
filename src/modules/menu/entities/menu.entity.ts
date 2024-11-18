import { Entity, Enum, ManyToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../../common/entities/base';
import { MENU_TYPE } from '../../../common/constant';

@Entity({ tableName: 'menu_tab' })
export class Menu extends BaseEntity {
  @Property({ unique: true, comment: '菜单名称' })
  menu_name!: string;

  @ManyToOne({ comment: '父菜单id' })
  parent?: Menu;

  @Property({ comment: '路由地址' })
  router!: string;

  @Property({ comment: '组建路径' })
  component: string;

  @Property({ comment: '路由参数' })
  query: string;

  @Enum({ type: () => MENU_TYPE, comment: '菜单类型' })
  type: MENU_TYPE;

  @Property({ comment: '菜单图标' })
  icon: string;

  @Property({ comment: '权限标识' })
  perms: string;

  @Property({ comment: '是否显示' })
  visible: boolean;
}
