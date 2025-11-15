import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/navbar";
import { User } from '@heroui/react';

export const Navbar = () => {


  return (
    <HeroUINavbar shouldHideOnScroll className='

        w-full h-20
        bg-gradient-to-b from-black/100 to-transparent
        backdrop-blur-lg-' >
      <NavbarBrand>
        <p className="font-bold text-white text-5xl">Synkro Space</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <User
            avatarProps={{
              src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
            }}
            description="Usuario"
            name={
              <p className='text-white capitalize font-bold'>Estefany Ramos</p>
            }
            className='text-shadow-white'
          />
        </NavbarItem>
      </NavbarContent>
    </HeroUINavbar>
  );
};
