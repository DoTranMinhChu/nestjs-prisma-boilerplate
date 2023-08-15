import { InternalServerErrorException } from '@exceptions/internalServerError.exception';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return 'Hello World!';
  }

  getInternalServerErrorException() {
    throw new InternalServerErrorException()
  }
}
