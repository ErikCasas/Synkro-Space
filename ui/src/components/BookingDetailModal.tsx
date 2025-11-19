import { useEffect, useState } from "react"
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button
} from "@heroui/react"

import { format } from "date-fns"
import { BookingDetail } from "@/models"
import { bookingClient } from "@/api/bookingClient"

interface BookingDetailsModalProps {
    bookingId: string | null
    isOpen: boolean
    onClose: () => void
}

export const BookingDetailModal = ({
    bookingId,
    isOpen,
    onClose
}: BookingDetailsModalProps) => {
    const [booking, setBooking] = useState<BookingDetail | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [ownerName, setOwnerName] = useState<string | null>(null)
    const api = bookingClient()

    const isMeetingRoom = (): boolean => {
        return booking?.entity.entityType === "MeetingRoom"
    }
    useEffect(() => {
        if (!bookingId || !isOpen) return

        const load = async () => {
            try {
                const data = await api.getBookingById(bookingId)
                const userOwner = data.sessionParticipants.find(participant => participant.id === data.createdBy)
                if (userOwner?.name) {
                    setOwnerName(userOwner.name)
                }
                setBooking(data)
                setError(null)
            } catch (err: any) {
                setError("Error al cargar los detalles de la reserva")
            }
        }

        load()
    }, [bookingId, isOpen])

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size="md"
            classNames={{
                base: "bg-black/90 text-white rounded-lg border border-white/20 min-h-[60vh] max-w-2xl mx-auto"
            }}
        >
            <ModalContent>
                <ModalHeader className="px-6 pt-6">
                    {booking ? (
                        <h2 className="text-2xl font-semibold line-clamp-2 text-balance text-white">
                            {booking.title}
                        </h2>
                    ) : (
                        <h2 className="text-2xl font-semibold text-white">Cargando...</h2>
                    )}
                </ModalHeader>

                <ModalBody className="px-6 py-4 space-y-4">
                    {error && (
                        <p className="text-red-400">{error}</p>
                    )}

                    {booking && (
                        <>
                            <p><strong>Entidad:</strong> {booking.entity.name}</p>
                            <p><strong>Tipo:</strong> {booking.entity.entityType}</p>
                            {isMeetingRoom() &&
                                <p><strong>Creado por:</strong> {ownerName}</p>
                            }
                            <p><strong>Inicio:</strong> {format(booking.startAt, "dd/MM/yyyy HH:mm")}</p>
                            <p><strong>Fin:</strong> {format(booking.endAt, "dd/MM/yyyy HH:mm")}</p>
                            <p><strong>Asistentes:</strong> {booking.sessionParticipants?.length || 0}</p>
                            {booking.sessionParticipants.map(participant => <p> {participant.name}</p>)}
                        </>
                    )}
                </ModalBody>

                <ModalFooter className="px-6 py-4 flex justify-end">
                    <Button variant="flat" color="primary" onPress={onClose}>
                        Cerrar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
