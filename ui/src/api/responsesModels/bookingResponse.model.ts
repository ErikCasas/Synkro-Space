export interface BookingResponse {
    id: string,
    title: string,
    startAt: Date,
    endAt: Date,
    createdAt: Date,
    updatedAt: Date,
    entityId: string,
    createdBy: string,
    entity: {
        id: string,
        name: string,
        entityTypeId: string,
        meetingRoomId?: number,
        workStationId?: string,
        entityType: {
            type: "WorkStation" | "MeetingRoom"
        }
    }
}


export interface BookingByIdResponse {
    id: string
    title: string
    startAt: string
    endAt: string
    createdAt: string
    updatedAt: string
    entityId: string
    createdBy: string
    entity: {
        id: string
        name: string
        entityTypeId: string
        meetingRoomId?: number 
        workStationId?: string 
        entityType: {
            type: "MeetingRoom" | "WorkStation"
        }
    },
    SessionParticipant: {
        user: {
            id: string
            name: string
        }
    }[]
}
