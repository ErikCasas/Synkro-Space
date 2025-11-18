export interface Booking {
    id: string
    title: string
    startAt: Date
    endAt: Date
    createdAt: Date
    updatedAt: Date
    createdBy: string
    entity: {
        id: string
        name: string
        entityTypeId: string
        meetingRoomId?: number
        workStationId?: string
        type: "WorkStation" | "MeetingRoom"
    }
}