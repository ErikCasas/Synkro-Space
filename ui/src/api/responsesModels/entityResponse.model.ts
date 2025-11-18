export interface EntityResponse {
    id: string,
    name: string,
    entityTypeId: string,
    meetingRoomId?: number,
    workStationId?: string,
    entityType: {
        id: string,
        type: "MeetingRoom" | "WorkStation"
    }
} 