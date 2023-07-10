import { RegisterInAppRequest } from '@common/requests/auth/registerInApp.request';
import { Body, Controller, Post } from '@nestjs/common';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';


@ApiTags("Auth")
@Controller('api/v1/auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @Post()
    @ApiOperation({ summary: 'Create cat' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async userRegisterInApp(@Body() createCatDto: RegisterInAppRequest) {
        return this.authService.userRegisterInApp(createCatDto);
    }
}
