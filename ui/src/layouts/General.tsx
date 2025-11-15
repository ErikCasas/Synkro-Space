import { Outlet } from "react-router-dom";
import { GradientBackground } from "@/components/GradientBackGround";

export const GeneralLayout = () => {
  return (
    <>
        <GradientBackground />
          <Outlet />
    </>
  );
};
