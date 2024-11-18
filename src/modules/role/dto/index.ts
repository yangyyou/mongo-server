import { OmitType, PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  role_name: string;

  @IsNumber()
  @IsOptional()
  sort?: number;

  @IsOptional()
  @IsNumber({}, { each: true })
  access_menus: number[];
}

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  @IsNumber()
  @Type(() => Number)
  roleId: number;
}

export class DeleteRoleDto {
  @IsNumber({ allowNaN: false }, { each: true })
  roleId: number[];
}
