import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { getConfig } from './config';
import { SharedModule } from './shared/shared.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ResponseInterceptor } from './common/response/response.interceptor';
import { HttpExceptionFilter } from './common/filter/http_exception.filter';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { RoleModule } from './modules/role/role.module';
import { MenuModule } from './modules/menu/menu.module';
import { AccessTokenGuard } from './modules/auth/access_token.guard';
@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvVars: true,
      isGlobal: true,
      load: [getConfig],
    }),
    MikroOrmModule.forRoot(),
    SharedModule,
    UserModule,
    RoleModule,
    MenuModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    /**
     * global interceptor
     */
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
    /**
     * global filter
     */
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    /**
     * global pipe
     */
    { provide: APP_PIPE, useClass: ValidationPipe },
    /**
    //  * global guard
     */
    { provide: APP_GUARD, useClass: AccessTokenGuard },
  ],
})
export class AppModule {}
