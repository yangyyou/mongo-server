
/** redis cache define */
export const REDIS_KEY_USER_TOKEN ='user:refresh_token:';
export const REDIS_KEY_USER_ROLE = 'user:roles:';
export const REDIS_KEY_ROLE_MENU = 'permission:role:menu';

/**
 * 定义用户类型，
 * 0 管理员账号， 1用户账号
 */
export enum USER_TYPE {
  ADMIN = '0',
  USER = '1',
}

/**
 * 定义用户性别
 * 0 男，1女
 */
export enum USER_SEX {
  MALE = '0',
  FEMALE = '1',
}

/**
 * 定义菜单类型
 * 0 directory, 1 menu, 2 button
 */
export enum MENU_TYPE {
  DIR = '0',
  MENU = '1',
  BUTTON = '2',
}
