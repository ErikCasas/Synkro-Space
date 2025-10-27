import { MeetingRoom } from '@prisma/client';

export interface IRoomRepository {
    findAll(): Promise<MeetingRoom[]>
}