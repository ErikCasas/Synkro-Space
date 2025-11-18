import { Session, User } from '@prisma/client';
import { ISessionRepository, SessionWithParticipants } from './interfaces/ISessionRepository';
import { prisma } from '@src/lib/prisma';
import { CreateSessionDto } from '@dtos';

export class SessionRepository implements ISessionRepository {

    async confirmUserAttendance(sessionId: Session['id'], userId: User['id']): Promise<void> {
        await prisma.sessionParticipant.updateMany({
            where: { sesssionId: sessionId, userId },
            data: { haveConfirm: true },
        });
    }

    async findActiveSessionByEntity(entityId: string, now: Date): Promise<SessionWithParticipants | null> {
        return await prisma.session.findFirst({
            where: {
                entityId,
                startAt: { lte: now },
                endAt: { gte: now },
            },
            include: {
                SessionParticipant: true,
            },
        });
    }

    async findAllUserSessions(userId: User['id']): Promise<Session[]> {
        return await prisma.session.findMany({
            where: {
                OR: [
                    { createdBy: userId },
                    { SessionParticipant: { some: { userId } } },
                ]
            },
            include: {
                entity: {
                    include: {
                        entityType: {
                            select: {
                                type: true
                            }
                        }
                    }
                }
            }, orderBy: {
                startAt: 'asc'
            }
        });
    }

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
            },
            include: {
                entity: {
                    include: {
                        entityType: {
                            select: {
                                type: true
                            }
                        }
                    }
                },
                SessionParticipant: {
                    select: {
                        user: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        })
    }

    async createFromDto(sessionDto: CreateSessionDto, ownerId: string): Promise<Session> {
        const { entityId, invitedUserIds = [], ...rest } = sessionDto;

        return prisma.session.create({
            data: {
                title: rest.title,
                startAt: rest.startAt,
                endAt: rest.endAt,
                user: { connect: { id: ownerId } },
                entity: { connect: { id: entityId } },
                SessionParticipant: {
                    create: invitedUserIds.map(id => ({
                        user: { connect: { id } },
                    })),
                },
            },
            include: {
                user: true,
                SessionParticipant: { include: { user: true } },
            },
        });
    }
}