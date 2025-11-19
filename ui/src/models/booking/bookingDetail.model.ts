export interface BookingDetail {
    id: string
    title: string
    startAt: Date
    endAt: Date
    createdAt: Date
    updatedAt: Date
    entityId: string
    createdBy: string
    entity: {
        id: string
        name: string
        entityTypeId: string
        meetingRoomId?: number
        workStationId?: string
        entityType: "MeetingRoom" | "WorkStation"
    },
    sessionParticipants: {
        id: string
        name: string
    }[]
}