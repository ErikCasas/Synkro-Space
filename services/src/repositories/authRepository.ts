import { User } from '@prisma/client';
import { IAuthRepository } from './interfaces/IAuthRepository'
import { prisma } from '@src/lib/prisma';

export class AuthRepository implements IAuthRepository {

    findUserByEmail(email: string): Promise<(User & { Credential: { passwordHash: string; }[]; }) | null> {
        return prisma.user.findUnique({
            where: { email },
            include: { Credential: true, role: true },
        });
    }

}