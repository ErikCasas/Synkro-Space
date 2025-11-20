import { bookingClient } from '@/api/bookingClient';
import { BookingCard, BookingForm, Navbar } from '@/components';
import { Booking } from '@/models';
import { useEffect, useState } from 'react';

const MainPage = () => {

  const [bookings, setBookings] = useState<Booking[]>([])
  const { getUserBookings: getMySessions } = bookingClient()

  const getUserSessions = async () => {
    try {
      const bookings = await getMySessions()
      setBookings(bookings)
    } catch (err) {
      console.error("❌ Error al iniciar sesión:", err)
    }
  }

  useEffect(() => {
    getUserSessions()
  }, [])

  return (
    <>
      <Navbar />
      <div className="px-10 flex flex-row min-h-[87vh] mt-5 text-white gap-10 ">

        <div className="container flex flex-col w-3/5 bg-black/20 backdrop-blur-xl border-r border-white/15 rounded-4xl p-10 gap-5">
          {bookings.map(booking => <BookingCard key={booking.id} booking={booking} />)}
        </div>

        <div className="container flex flex-col w-2/5 items-center backdrop-blur-xl border-r border-white/15 rounded-4xl">
          <BookingForm onSubmit={async () => await getUserSessions()} />
        </div>

      </div>
    </>
  );
};

export default MainPage