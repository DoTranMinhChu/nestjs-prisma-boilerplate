import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';


import { PRISMA_CLIENT_OPTIONS } from './prisma.config';
import { PrismaListener } from './prisma.listener';

@Injectable()
export class PrismaRepository
    extends PrismaClient<Prisma.PrismaClientOptions, 'error' | 'query'>
    implements OnModuleInit, OnModuleDestroy {
    constructor() {
        super({ ...PRISMA_CLIENT_OPTIONS });
    }

    async onModuleInit() {
        await this.$connect();

        this.$on('error', (_e) => {
            // Do something
        });

        this.$use(PrismaListener.on);


    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}