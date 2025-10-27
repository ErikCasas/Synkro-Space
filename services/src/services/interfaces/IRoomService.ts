import { MeetingRoom } from '@prisma/client';

export interface IRoomService {
    findAllRooms(): Promise<MeetingRoom[]>
}