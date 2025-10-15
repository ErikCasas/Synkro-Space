import { MeetingRoom } from '@models/common/meetingRoom.model';
import { IMeetingRoomService } from './interfaces/IMeetingRoomService';

export class MeetingRoomService implements IMeetingRoomService {
    hasAvailableSchedule(roomId: MeetingRoom['id'], start: Date, end: Date): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

    getAllRoomsByDirection(): Promise<MeetingRoom[]> {
        throw new Error('Method not implemented.');
    }

    getAllRoomsDirections(): Promise<string[]> {
        throw new Error('Method not implemented.');
    }


}