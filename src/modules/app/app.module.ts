import { Module, MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { resolve } from 'path';
import configuration from '@configs/configuration';
import { UserModule } from '@modules/user/user.module';
import { QueryPrismaMiddleware } from '@middlewares/queryPrisma.middleware';


@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot(
      {
        envFilePath: resolve(`./.env.${process.env['NODE_ENV']}`),
        isGlobal: true,
        load: [configuration],
      }
    )
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(QueryPrismaMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}