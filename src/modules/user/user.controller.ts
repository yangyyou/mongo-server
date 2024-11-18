import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginDto } from './dto';
import { Request } from 'express';
import { AccessTokenGuard } from '../auth/access_token.guard';
import { RefreshTokenGuard } from '../auth/refresh_token.guard';
import { JwtPayload, JwtRePayload } from '../auth/auth.service';
import { Public } from '../../common/decorator/auth.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }

  @Post('logout')
  logout(@Req() req: Request) {
    if (req?.user) return true;
    return this.userService.logout(req.user['id'] as number);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshToken(@Req() req: Request) {
    const payload = req.user as JwtRePayload;
    return this.userService.refresh(
      payload.id,
      payload.username,
      payload.refresh_token,
    );
  }

  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }


  @Get('profile')
  @UseGuards(AccessTokenGuard)
  profile(@Req() req: Request) {
    if (!('user' in req)) {
      throw new UnauthorizedException('用户未登陆，请先登陆');
    }
      // return this.userService.indOne(req.user);
  }
}
