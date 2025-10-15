import { MeetingRoom } from '@models/common/meetingRoom.model';
import { Session, User, workStation } from '@prisma/client';

export interface ISessionService {
    scheduleRoom(roomId: MeetingRoom['id'], start: Date, end: Date): Promise<Session> //TODO
    scheduleWorkStation(roomId: workStation['id'], start: Date, end: Date): Promise<Session> //TODO
    addSessionParticipants(sesionId: Session['id'], userIds: User['id'][]): Promise<void>
    confirmAssistance(sesionId: Session['id'], userId: User['id'], token: string): Promise<void>
}