import { Booking } from '@/models'
import { HttpClient } from './httpClient'
import { BookingResponse } from './responsesModels/bookingResponse.model'

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1"

export const createAuthClient = () => {

    const client = new HttpClient(API_URL)

    return {
        getMySessions: async (): Promise<Booking[]> => {
            const response = await client.get<BookingResponse[]>("/auth")
            const bookings: Booking[] = response.map((item) => ({
                ...item,
                startAt: new Date(item.startAt),
                endAt: new Date(item.endAt),
                createdAt: new Date(item.createdAt),
                updatedAt: new Date(item.updatedAt),
                entity: {
                    id: item.entity.id,
                    name: item.entity.name,
                    entityTypeId: item.entity.entityTypeId,
                    meetingRoomId: item.entity.meetingRoomId,
                    workStationId: item.entity.workStationId,
                    type: item.entity.entityType.type,
                },
            }))

            return bookings
        },

    }
}
