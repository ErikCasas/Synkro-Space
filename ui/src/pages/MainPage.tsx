import { Navbar } from '@/components';

const MainPage = () => {
  return (
    <>
      <Navbar />
      <div className="px-10 flex flex-row min-h-[87vh] mt-5 text-white gap-10 ">

        <div className="container flex flex-col w-3/5 bg-black/20 backdrop-blur-xl border-r border-white/15 rounded-4xl">

        </div>

        <div className="container flex flex-col w-2/5 items-center backdrop-blur-xl border-r border-white/15 rounded-4xl">
        
        </div>

      </div>
    </>
  );
};

export default MainPage