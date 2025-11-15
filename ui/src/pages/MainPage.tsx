import { BookingCard, Navbar } from '@/components';

const MainPage = () => {


  const example = {
    title: "Reunión de estrategia",
    startAt: "2025-11-26T14:00:00.000Z",
    entity: {
      name: "Entity-ROOM-A1",
      entityType: { type: "MeetingRoom" },
    },
  }
  return (
    <>
      <Navbar />
      <div className="px-10 flex flex-row min-h-[87vh] w-full mt-5 text-white gap-10 box-border">

        <div className="w-8/12 bg-black/20 backdrop-blur-xl border-r border-white/15 rounded-4xl grid grid-cols-3 gap-4 p-5">
          <BookingCard {...example} />
          <BookingCard {...example} />
          <BookingCard {...example} />
          <BookingCard {...example} />
        </div>

        <div className="flex flex-col w-4/12 items-center backdrop-blur-xl border-r border-white/15 rounded-4xl">

        </div>

      </div>
    </>
  );
};

export default MainPage