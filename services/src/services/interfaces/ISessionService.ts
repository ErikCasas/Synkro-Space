import { Entity, Session, User } from '@prisma/client';
import { CreateSessionDto } from '@src/models/DTOs';

export interface ISessionService {
    findUserSessions(userIdid: User['id']): Promise<Session[]>

    findSessionsById(sessionId: Session['id']): Promise<Session>

    deleteSession(sessionId: Session['id']): Promise<void>

    createSession(dto: CreateSessionDto): Promise<Session>

}