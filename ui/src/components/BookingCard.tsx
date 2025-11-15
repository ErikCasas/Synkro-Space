import { Card, CardHeader, CardBody } from "@heroui/react"
import conference from '../assets/conference.svg'
import desktop from '../assets/desktop.svg'
interface BookingCardProps {
    title: string
    startAt: string
    entity: {
        name: string
        entityType: { type: string }
    }
}

export const BookingCard = (booking: BookingCardProps) => {
    // const startDate = new Date(booking.startAt)
    // const minutesLeft = differenceInMinutes(startDate, new Date())

    // const isSoon = minutesLeft > 0 && minutesLeft <= 30
    // const day = format(startDate, "EEEE dd 'de' MMMM", { locale: es })
    // const time = format(startDate, "HH:mm")
    const time = new Date().toString()
    const isMeetingRoom = booking.entity.entityType.type.toLowerCase() === "meetingroom"

    return (
        <Card
            className={`
              w-full h-full transition-transform duration-300 ease-in-out 
              hover:scale-[1.03] hover:shadow-lg
              border-m border-white/20
              cursor-pointer
              box-border
              bg-gray-950
              text-white
            `}
        >
            <CardHeader className="flex flex-col justify-between items-center pb-0">
                <h3 className="font-bold text-white text-3xl text-center wrap-break-word text-balance line-clamp-2">Entrevista Karol J</h3>
                <div className="flex items-center gap-3">
                    {isMeetingRoom ? (
                        <img src={desktop} alt='desktop' />
                    ) : (
                        <img src={conference} alt='conference' />
                    )}
                </div>
                {/* <Calendar className="w-5 h-5 text-gray-300" /> */}
            </CardHeader>

            <CardBody className="pt-2 space-y-2">
                <p className="text-sm text-gray-300">{123}</p>
                <p className="text-lg font-bold">{booking.entity.name}</p>
                <p className={`text-sm ${false ? "text-red-400 font-semibold  " : "text-gray-200"}`}>
                    {time}
                    {true && " (en menos de 30 minutos)"}
                </p>
            </CardBody>
        </Card>
    )
}
