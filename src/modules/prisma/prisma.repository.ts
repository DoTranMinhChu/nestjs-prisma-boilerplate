import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';


import { PRISMA_CLIENT_OPTIONS } from './prisma.config';
import { PrismaListener } from './prisma.listener';;
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
export type PrismaTransation = Omit<
    PrismaClient<
        Prisma.PrismaClientOptions,
        never,
        Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
    >,
    "$connect" | "$disconnect" | "$on" | "$transaction" | "$use"
>;
@Injectable()
export class PrismaRepository
    extends PrismaClient<Prisma.PrismaClientOptions, 'error' | 'query'>
    implements OnModuleInit, OnModuleDestroy, PrismaTransation {
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