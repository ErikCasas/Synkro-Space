import { MeetingRoom } from '@prisma/client';
import { IRoomRepository } from './interfaces/IRoomRepository';
import { prisma } from '@src/lib/prisma';

export class RoomRepository implements IRoomRepository {
    async findAll(): Promise<MeetingRoom[]> {
        return await prisma.meetingRoom.findMany();
    }
}