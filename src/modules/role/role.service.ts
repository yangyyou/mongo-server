import {
  BadRequestException,
  Inject,
  Injectable,
  LoggerService,
} from '@nestjs/common';
import { CreateRoleDto, DeleteRoleDto, UpdateRoleDto } from './dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Role } from './entities/role.entity';
import { ExEntityRepository } from '../../common/entities/extend_entity_repository';
import { wrap } from '@mikro-orm/core';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { omit } from 'lodash';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepo: ExEntityRepository<Role>,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  async getList() {
    const roles = await this.roleRepo.findAll();
    return roles;
  }

  async add(dto: CreateRoleDto) {
    const exist = await this.roleRepo.findOne({ role_name: dto.role_name });
    if (exist) throw new BadRequestException(`role:${dto.role_name} exist.`);
    const newRole = new Role(dto.role_name, dto.sort);
    await this.roleRepo.persistAndFlush(newRole);
    return newRole;
  }

  async del(dto: DeleteRoleDto) {
    const exist = await this.roleRepo.find({ id: { $in: dto.roleId } });
    if (!exist) throw new BadRequestException(`role id:${dto.roleId}`);
    await this.roleRepo.removeAndFlush(exist);
  }

  async update(dto: UpdateRoleDto) {
    const foundRole = await this.roleRepo.findOne({ id: dto.roleId });
    if (!foundRole)
      throw new BadRequestException(`role:${dto.roleId} no exist.`);
    if (dto.role_name) {
      const nameExist = await this.roleRepo.find({
        role_name: dto.role_name,
        id: { $nin: [foundRole.id] },
      });
      console.log(nameExist);
      if (nameExist.length)
        throw new BadRequestException(`role name ${dto.role_name} exist.`);
    }
    const date = omit(dto, ['roleId']);

    wrap(foundRole).assign(date, { mergeObjectProperties: true });
    await this.roleRepo.persistAndFlush(foundRole);
    return foundRole;
  }
}
