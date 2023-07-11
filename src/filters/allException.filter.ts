import { BaseException } from '@exceptions/base.exception';
import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name);
    constructor(
        private readonly httpAdapterHost: HttpAdapterHost
    ) { }

    catch(ex: unknown | any, host: ArgumentsHost): void {
        let exception = null

        try {
            exception = new ex()
        } catch (e) {
            exception = ex
        }
        this.logger.error(exception)
        console.error(exception)

        const { httpAdapter } = this.httpAdapterHost;

        const ctx = host.switchToHttp();

        let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        let messageType;
        let message;
        if (exception instanceof HttpException) {
            statusCode = exception.getStatus();
            message = exception.getResponse();
            messageType = exception.name;
        }
        let responseBody = {
            statusCode,
            path: httpAdapter.getRequestUrl(ctx.getRequest()),
            messageType,
            message
        };
        if (exception instanceof BaseException) {
            responseBody = Object.assign(responseBody, exception.options)
        }

        httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
    }
}