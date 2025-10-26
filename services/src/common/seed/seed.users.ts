import { prisma } from '@src/lib/prisma';
import logger from 'jet-logger';
import bcrypt from 'bcrypt';

export async function seedUsers(): Promise<void> {
    try {
        const users = [
            {
                name: 'Estefany Ramos',
                email: 'admin@synkro.com',
                password: 'admin123',
                roleId: 1,
            },
            {
                name: 'Erik Hernandez',
                email: 'user@synkro.com',
                password: 'user123',
                roleId: 2,
            },
        ];

        for (const user of users) {
            const passwordHash = await bcrypt.hash(user.password, 10);

            const createdUser = await prisma.user.upsert({
                where: { email: user.email },
                update: {},
                create: {
                    name: user.name,
                    email: user.email,
                    roleId: user.roleId,
                    Credential: {
                        create: {
                            passwordHash,
                        },
                    },
                },
                include: { role: true },
            });

            logger.info(`👤 User created or exists: ${createdUser.email} (${createdUser.role.name})`);
        }

        logger.info('✅ Default users inserted successfully');
    } catch (error) {
        logger.err('❌ Error seeding users');
        logger.err(error instanceof Error ? error.message : String(error));
    } finally {
        await prisma.$disconnect();
    }
}