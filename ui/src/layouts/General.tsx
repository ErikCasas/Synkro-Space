import { Outlet } from "react-router-dom";
import { GradientBackground } from "@/components/GradientBackGround";

export const GeneralLayout = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <GradientBackground />
      <div className="relative z-10 w-full h-full flex flex-col">
        <Outlet />
      </div>
    </div>
  );
};
