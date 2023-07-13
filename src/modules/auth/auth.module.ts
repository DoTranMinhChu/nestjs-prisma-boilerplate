import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PrismaRepository } from '@modules/prisma/prisma.repository';
import { UserRepository } from '@modules/user/user.repository';
import { AuthService } from './auth.service';
import { RefreshTokenUserRepository } from '@modules/refreshTokenUser/refreshTokenUser.repository';
import { GoogleModule } from '@modules/google/google.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        GoogleModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secretOrPrivateKey: configService.get('server.secret') || "secret",
                signOptions: {
                    expiresIn: 3600,
                },
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, PrismaRepository, UserRepository, RefreshTokenUserRepository],
    exports: [AuthService],
})
export class AuthModule { }