import { Booking, BookingDetail } from '@/models'
import { HttpClient } from './httpClient'
import { BookingByIdResponse, BookingResponse } from './responsesModels/bookingResponse.model'

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1/sessions"

interface sessionPayload {
    title: string,
    startAt: string,
    endAt: string,
    entityId: string,
    invitedUserIds: string[],
}

export const bookingClient = () => {

    const client = new HttpClient(API_URL)

    return {
        getUserBookings: async (): Promise<Booking[]> => {
            const response = await client.get<BookingResponse[]>("/me")
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
        createBooking: async (payload: sessionPayload): Promise<void> => {
            await client.post("/", payload)
        },
        getBookingById: async (bookingId: string): Promise<BookingDetail> => {
            const response = await client.get<BookingByIdResponse>(`/${bookingId}`)

            return {
                ...response,
                startAt: new Date(response.startAt),
                endAt: new Date(response.endAt),
                createdAt: new Date(response.createdAt),
                updatedAt: new Date(response.updatedAt),
                entity: {
                    id: response.entity.id,
                    name: response.entity.name,
                    entityTypeId: response.entity.entityTypeId,
                    meetingRoomId: response.entity.meetingRoomId,
                    workStationId: response.entity.workStationId,
                    entityType: response.entity.entityType.type,
                },
                sessionParticipants: [
                    ...response.SessionParticipant.map(item => item.user)
                ]
            }
        },
        checkIn: async (entityId: string): Promise<void> => {
            if (!entityId) return
            await client.get(`/check?entityId=${entityId}`)
        }
    }
}
