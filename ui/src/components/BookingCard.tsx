import conferenceIcon from "@/assets/conference.svg"
import desktopIcon from "@/assets/desktop.svg"
import { Booking } from "@/models"
import { differenceInMinutes, isWithinInterval, format } from "date-fns"
import { es } from "date-fns/locale"

interface BookingCardProps {
    booking: Booking
}

export const BookingCard = ({ booking }: BookingCardProps) => {
    const now = new Date()
    const start = new Date(booking.startAt)
    const end = new Date(booking.endAt)

    const minutesLeft = differenceInMinutes(start, now)
    const isSoon = minutesLeft > 0 && minutesLeft <= 30
    const isInProgress = isWithinInterval(now, { start, end })

    const timeColor = isInProgress
        ? "text-green-400"
        : isSoon
            ? "text-red-400"
            : "text-white/90"

    const isMeeting = booking.entity.type === "MeetingRoom"

    const cardColor = isMeeting
        ? "bg-blue-400/20 border-blue-300/20"
        : "bg-green-400/20 border-green-300/20"

    const icon = isMeeting ? conferenceIcon : desktopIcon

    // Formatos
    const formattedDate = format(start, "EEEE d 'de' MMMM", { locale: es })
    const formattedTime = format(start, "HH:mm")

    return (
        <div
            className={`
        w-full
        rounded-3xl 
        p-6 
        flex flex-row gap-4
        justify-between
        backdrop-blur-xl
        hover:scale-[1.03]
        transition-transform duration-300
        cursor-pointer
        border
        ${cardColor}
      `}
        >
            <div className="flex items-center gap-4">
                <img src={icon} className="w-10 h-10 opacity-90" />
                <h3 className="text-xl font-semibold text-white line-clamp-2 text-balance">
                    {booking.title}
                </h3>
            </div>

            <div>
                <p className="text-white/70 text-sm capitalize">
                    {formattedDate}
                </p>

                <p className={`text-lg font-semibold ${timeColor}`}>
                    {formattedTime}
                    {isInProgress && " • En progreso"}
                    {isSoon && " • Inicia pronto"}
                </p>

                <p className="text-white/80 text-sm">
                    {booking.entity.name}
                </p>
            </div>
        </div>
    )
}
