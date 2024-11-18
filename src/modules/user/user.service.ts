import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto, LoginDto, UpdateUserDto } from './dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from './entities/user.entity';
import { ExEntityRepository } from '../../common/entities/extend_entity_repository';
import { AuthService } from '../auth/auth.service';
import { RedisService } from '../../shared/redis/redis.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: ExEntityRepository<User>,
    private readonly authSer: AuthService,
    private readonly redisSer: RedisService,
  ) {}

  async login(login: LoginDto) {
    const foundUser = await this.userRepo.findOne({ username: login.username });
    if (!foundUser) throw new UnauthorizedException('登录失败');
    if (foundUser.password != login.password)
      throw new UnauthorizedException('登录失败');
    return this.authSer.createTokens(foundUser.id, foundUser.username);
  }

  logout(userId: number) {
    return this.authSer.deleteTokenCache(userId);
  }

  async refresh(userId: number, username: string, refresh_token: string) {
    const foundUser = await this.userRepo.findOne({ id: userId });
    if (!foundUser) throw new ForbiddenException('未登录');
    return this.authSer.refreshToken(userId, username, refresh_token);
  }

  async create(dto: CreateUserDto) {
    const user = new User();
    user.assign(dto);
    this.userRepo.persistAndFlush(user);
  }
}
