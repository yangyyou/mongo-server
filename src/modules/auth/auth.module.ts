import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AccessTokenStrategy } from './access_token.strategy';
import { RefreshTokenStrategy } from './refresh_token.strategy';

@Module({
  imports: [MikroOrmModule.forFeature([User]), JwtModule.register({})],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
  exports: [AuthService],
})
export class AuthModule {}
