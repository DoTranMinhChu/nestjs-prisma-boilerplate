import { Module, MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { resolve } from 'path';
import configuration from '@configs/configuration';
import { UserModule } from '@modules/user/user.module';
import { QueryPrismaMiddleware } from '@middlewares/queryPrisma.middleware';
import { AuthModule } from '@modules/auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from '@filters/allException.filter';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot(
      {
        envFilePath: resolve(`./.env.${process.env['NODE_ENV']}`),
        isGlobal: true,
        load: [configuration],
      }
    )
  ],
  controllers: [
    AppController,
  ],
  providers: [AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(QueryPrismaMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}