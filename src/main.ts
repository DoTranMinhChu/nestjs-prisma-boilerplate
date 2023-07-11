import { NestFactory } from '@nestjs/core';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ISwaggerDocumentOptions } from '@interfaces/swagger/swaggerDocumentOptions.interface';
import { AppModule } from '@modules/app/app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Swagger')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .build();
    
  const options: ISwaggerDocumentOptions = {
    operationIdFactory: (
      _controllerKey: string,
      methodKey: string
    ) => methodKey
  };
  const document = SwaggerModule.createDocument(app, config, options);

  SwaggerModule.setup('api', app, document);
  const configService = app.get<ConfigService>(ConfigService);
  
  await app.listen(+configService.get('server.port'));
  Logger.log(`http://localhost:${configService.get('server.port')}`)

}
bootstrap();
