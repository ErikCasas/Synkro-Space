import { Prisma, Session } from '@prisma/client';
import { User } from '@models/common/user.model'
import { CreateSessionDto } from '@dtos';

export interface ISessionRepository {
    createFromDto(sessionDto: CreateSessionDto): Promise<Session>
    confirmUserAttendance(sessionId: Session['id'], userId: User['id']): Promise<void>
    findActiveSessionByEntity(entityId: string, now: Date): Promise<SessionWithParticipants | null>
    findById(sessionId: Session['id']): Promise<Session | null>
    findAllUserSessions(userId: User['id']): Promise<Session[]>
    delete(sessionId: Session['id']): Promise<void>
}

export type SessionWithParticipants = Prisma.SessionGetPayload<{
    include: { SessionParticipant: true };
}>;