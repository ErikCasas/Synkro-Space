import { Prisma, Session } from '@prisma/client';
import { ISessionRepository } from './interfaces/ISessionRepository';
import { User } from '@models/common/user.model'
import { prisma } from '@src/lib/prisma';

export class SessionRepository implements ISessionRepository {
    async delete(sessionId: Session['id']): Promise<void> {
        await prisma.session.delete({
            where: {
                id: sessionId
            }
        })
    }

    async findById(sessionId: Session['id']): Promise<Session | null> {
        return await prisma.session.findUnique({
            where: {
                id: sessionId
            }
        })
    }

    async create(session: Prisma.SessionCreateInput, userOwnerId: User['id'], participantIds: Array<User['id']>): Promise<Session> {
        return prisma.session.create({
            data: {
                ...session,
                user: { connect: { id: userOwnerId } },
                SessionParticipant: {
                    create: participantIds.map(id => ({
                        user: { connect: { id } },
                    }))
                },
            },
        });
    }
}