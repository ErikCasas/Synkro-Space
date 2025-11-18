export interface Entity {
    id: string,
    name: string,
    meetingRoomId?: number,
    workStationId?: string,
    entity: {
        id: string,
        type: "MeetingRoom" | "WorkStation"
    }
}