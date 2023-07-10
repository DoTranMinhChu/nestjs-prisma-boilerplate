import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { resolve } from 'path';
import configuration from '@configs/configuration';
import { UserModule } from '@modules/user/user.module';


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
export class AppModule { }
