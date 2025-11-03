import { Entity, Session, User } from '@prisma/client';
import { ISessionService } from './interfaces/ISessionService';
import { ISessionRepository } from '@src/repositories/interfaces/ISessionRepository';
import { RouteError } from '@src/common/util/route-errors';
import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import { CreateSessionDto } from '@dtos';
import { IEntityRepository } from '@src/repositories/interfaces/IEntityrepository';

export class SessionService implements ISessionService {
    public constructor(private readonly sessionRepo: ISessionRepository, private readonly entityRepo: IEntityRepository) { }

    async checkIn(entityId: Entity['id'], userId: User['id']): Promise<void> {


        const entity = await this.entityRepo.findById(entityId);
        if (!entity) {
            throw new RouteError(HttpStatusCodes.NOT_FOUND, `Entity with id: ${entityId} not found`);
        }

        const entityType = entity.entityType.type;
        const linkedId = entity.meetingRoomId ?? entity.workStationId;

        if (!linkedId) {
            throw new RouteError(HttpStatusCodes.BAD_REQUEST, `Entity ${entity.name} has no linked ${entityType}`);
        }

        const now = new Date();
        const session = await this.sessionRepo.findActiveSessionByEntity(entity.id, now);

        if (!session) {
            throw new RouteError(HttpStatusCodes.NOT_FOUND, `No active session found for ${entityType} ${entity.name}`);
        }

        const minAcceptableCheckIn = session.startAt.getTime() - 5 * 60 * 1000;
        const maxAcceptableCheckIn = session.endAt.getTime() - 15 * 60 * 1000;

        if (now.getTime() < minAcceptableCheckIn) {
            throw new RouteError(HttpStatusCodes.CONFLICT, 'Check-in too early.');
        }

        if (now.getTime() > maxAcceptableCheckIn) {
            throw new RouteError(HttpStatusCodes.CONFLICT, 'Check-in too late.');
        }
        console.log(session)
        const isParticipant = session.SessionParticipant.some(p => p.userId === userId);
        if (!isParticipant) {
            throw new RouteError(HttpStatusCodes.FORBIDDEN, 'User is not a participant of this session');
        }

        await this.sessionRepo.confirmUserAttendance(session.id, userId);


    }

    async findUserSessions(userId: User['id']): Promise<Session[]> {
        return this.sessionRepo.findAllUserSessions(userId);
    }

    async findSessionsById(sessionId: Session['id']): Promise<Session> {
        const session = await this.sessionRepo.findById(sessionId);

        if (!session) throw new RouteError(HttpStatusCodes.NOT_FOUND, `Session with id: ${sessionId.toString()} was not found`)

        return session;
    }

    async deleteSession(sessionId: Session['id']): Promise<void> {
        await this.sessionRepo.delete(sessionId)
    }

    async createSession(dto: CreateSessionDto): Promise<Session> {
        const { startAt, endAt } = dto;
        const startInTime = new Date(startAt);
        const endInTime = new Date(endAt);

        this.validateSessionTime(startInTime, endInTime)
        return this.sessionRepo.createFromDto(dto)
    }

    private validateSessionTime(start: Date, end: Date) {
        const now = new Date();

        const minStart = new Date(now.getTime() + 15 * 60 * 1000);

        if (start < minStart)
            throw new RouteError(
                HttpStatusCodes.CONFLICT,
                'The session must start at least 15 minutes after the current time.'
            );

        if (start >= end) throw new RouteError(HttpStatusCodes.CONFLICT, 'The start time must be less than the end time.');

        const duration = (end.getTime() - start.getTime()) / (1000 * 60 * 60);

        if (duration > 3) throw new RouteError(HttpStatusCodes.CONFLICT, 'The session cannot last more than 3 hours')
    }

}