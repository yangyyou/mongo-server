import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto, UpdateMenuDto } from './dto';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get('list')
  async list() {
    // return this.menuService
  }

  @Post('add')
  async add(@Body() dto:CreateMenuDto){
    // return this.
  }

  @Post('update')
  async update(@Body() dto:UpdateMenuDto){}
}
