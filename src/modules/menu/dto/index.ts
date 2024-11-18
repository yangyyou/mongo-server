import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { MENU_TYPE } from '../../../common/constant';
import { extend } from 'lodash';
import { PartialType } from '@nestjs/mapped-types';

export class CreateMenuDto {
  @IsString()
  menu_name!: string;

  @IsNumber()
  @IsOptional()
  parent: number;

  @IsString()
  router: string;

  @IsOptional()
  @IsString()
  component: string;

  @IsOptional()
  @IsString()
  query: string;

  @IsEnum(MENU_TYPE)
  type: MENU_TYPE;

  @IsOptional()
  @IsString()
  icon: string;

  @IsString()
  perms: string;

  @IsBoolean()
  visible: boolean;
}

export class UpdateMenuDto extends PartialType(CreateMenuDto) {
  @IsNumber()
  menu_id: number;
}

export class DeleteMenuDto {
  @IsNumber({ allowNaN: false }, { each: true })
  menu_id: number[];
}
