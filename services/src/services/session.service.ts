import { MeetingRoom, Session, workStation, User } from '@prisma/client';
import { ISessionService } from './interfaces/ISessionService';

export class SessionService implements ISessionService {

    scheduleRoom(roomId: MeetingRoom['id'], start: Date, end: Date): Promise<Session> {
        throw new Error('Method not implemented.');
    }

    scheduleWorkStation(roomId: workStation['id'], start: Date, end: Date): Promise<Session> {
        throw new Error('Method not implemented.');
    }

    addSessionParticipants(sesionId: Session['id'], userIds: User['id'][]): Promise<void> {
        throw new Error('Method not implemented.');
    }

    confirmAssistance(sesionId: Session['id'], userId: User['id'], token: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
}