import { Controller, Get, Post, Body } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto, DeleteRoleDto, UpdateRoleDto } from './dto';

@Controller('roles')
export class RoleController {
  constructor(private readonly rolesService: RoleService) {}

  @Get('list')
  async getList() {
    return this.rolesService.getList();
  }

  @Post('add')
  async add(@Body() dto: CreateRoleDto) {
    return this.rolesService.add(dto);
  }

  /**
   * update role data
   * @param dto role dto
   * @returns role info updated
   */
  @Post('update')
  async updateRole(@Body() dto: UpdateRoleDto) {
    return this.rolesService.update(dto);
  }

  @Post('del')
  async del(@Body() dto: DeleteRoleDto) {
    return this.rolesService.del(dto);
  }
}
