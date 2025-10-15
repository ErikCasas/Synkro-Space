import { MeetingRoom } from '@models/common/meetingRoom.model';


export interface IMeetingRoomService {
    getAllRoomsByDirection(): Promise<MeetingRoom[]>
    getAllRoomsDirections(): Promise<string[]>
    hasAvailableSchedule(roomId: MeetingRoom['id'], start: Date, end: Date): Promise<boolean>
}