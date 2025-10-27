import { MeetingRoom } from '@prisma/client';
import { IRoomService } from './interfaces/IRoomService';
import { IRoomRepository } from '@src/repositories/interfaces/IRoomRepository';

export class RoomService implements IRoomService {
    constructor(private readonly roomRepo: IRoomRepository) { }
    async findAllRooms(): Promise<MeetingRoom[]> {
        return await this.roomRepo.findAll();
    }
}