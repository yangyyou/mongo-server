import { OmitType, PartialType } from '@nestjs/mapped-types';
import {
  IsOptional,
  IsString,
  IsEnum,
  IsEmail,
  IsPhoneNumber,
} from 'class-validator';
import { USER_TYPE, USER_SEX } from '../../../common/constant';

export class CreateUserDto {
  @IsString({})
  username: string;

  @IsString({})
  password: string;

  @IsEnum(USER_TYPE)
  type: USER_TYPE;

  @IsEmail()
  email: string;

  @IsPhoneNumber('CN')
  phone_number: string;

  @IsEnum(USER_SEX)
  sex: USER_SEX;

  @IsOptional()
  @IsString()
  avatar: string;
}

export class UpdateUserDto extends OmitType(PartialType(CreateUserDto), [
  'username',
  'password',
  'type',
]) {}

export class LoginDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
