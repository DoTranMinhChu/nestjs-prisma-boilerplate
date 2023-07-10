import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { PrismaRepository } from '@modules/prisma/prisma.repository';


@Module({
    imports: [],
    controllers: [UserController],
    providers: [UserService, PrismaRepository, UserRepository],
    exports: [UserService],
})
export class UserModule { }