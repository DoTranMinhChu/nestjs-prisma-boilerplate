
import { BaseException } from "./base.exception"
import { IOptionException } from "./exception.interface"
import { HttpStatus } from "@nestjs/common"

export class BadRequestException extends BaseException {

    constructor(_options?: IOptionException) {
        const className = BadRequestException.name;
        super(
            Object.assign({
                message: className,
                statusCode: HttpStatus.BAD_REQUEST,
                type: className
            }, _options
            )
        )
    }

}