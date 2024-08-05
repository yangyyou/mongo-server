import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { getConfig } from './config';
import { SharedModule } from './shared/shared.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ResponseInterceptor } from './common/response/response.interceptor';
import { HttpExceptionFilter } from './common/filter/http_exception.filter';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { RolesModule } from './src/modules/roles/roles.module';
import { RolesModule } from './modules/roles/roles.module';
import { MenuModule } from './modules/menu/menu.module';
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
    AuthModule,
    RolesModule,
    MenuModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    /**
     * 全局中间件
     */
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
    /**
     * 全局filter
     */
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    /**
     * 全局pipe
     */
    { provide: APP_PIPE, useClass: ValidationPipe },
  ],
})
export class AppModule {}
