import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PrismaRepository } from '@modules/prisma/prisma.repository';
import { UserRepository } from '@modules/user/user.repository';
import { AuthService } from './auth.service';
import { RefreshTokenUserRepository } from '@modules/refreshTokenUser/refreshTokenUser.repository';


@Module({
    imports: [],
    controllers: [AuthController],
    providers: [AuthService, PrismaRepository, UserRepository, RefreshTokenUserRepository],
    exports: [AuthService],
})
export class AuthModule { }