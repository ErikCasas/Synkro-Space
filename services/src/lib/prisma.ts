import { PrismaClient } from '@prisma/client';
import ENV from '@src/common/constants/ENV';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        log: ['query', 'error', 'warn'],
    });

if (ENV.NodeEnv !== 'production') globalForPrisma.prisma = prisma;
