import { Role } from '@prisma/client';
import { prisma } from '@src/lib/prisma';
import logger from 'jet-logger';

export async function seedRoles(): Promise<void> {
    try {
        const roles: Role[] = [
            { id: 1, name: 'Admin' },
            { id: 2, name: 'User' },
        ];

        for (const role of roles) {
            await prisma.role.upsert({
                where: { id: role.id },
                update: {},
                create: role,
            });
        }

        logger.info('✅ Basic Roles inserted');
    } catch (error) {
        logger.err('❌ Error seeding roles');
        logger.err(error instanceof Error ? error.message : String(error));
    } finally {
        await prisma.$disconnect();
    }
}
