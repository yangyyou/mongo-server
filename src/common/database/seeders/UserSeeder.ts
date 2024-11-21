import type { Constructor, EntityData, EntityManager } from '@mikro-orm/core';
import { Factory, Seeder } from '@mikro-orm/seeder';
import { User } from '../../../modules/user/entities/user.entity';
import { fakerZH_CN as faker } from '@faker-js/faker';
import { USER_SEX, USER_TYPE } from '../../constant';

export class UserFactory extends Factory<User> {
  model = User;

  protected definition(): EntityData<User> {
    return {
      username: faker.person.firstName(),
      password: faker.internet.password({ length: 6, memorable: false }),
      email: faker.internet.email(),
      phone_number: faker.string.numeric({ length: 11 }).toString(),
      sex: faker.person.sexType() == 'male' ? USER_SEX.MALE : USER_SEX.FEMALE,
      type: USER_TYPE.USER,
      avatar: '',
    };
  }
}

export class UserSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    new UserFactory(em).makeOne();
  }
}
