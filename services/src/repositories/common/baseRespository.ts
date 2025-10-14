import { PrismaClient } from '@prisma/client';
import { prisma } from '@src/lib/prisma';


export abstract class BaseRepository {

    protected readonly prisma: PrismaClient;

    public constructor() {
        this.prisma = prisma;
    }
}