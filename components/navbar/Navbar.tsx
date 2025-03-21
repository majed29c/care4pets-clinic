import Image from "next/image";
import Logo from "../../public/Care4PETS.png"; 
import Link from "next/link"; 
import { RiMenu3Line } from 'react-icons/ri'; 

const Navbar = () => {
  return (
    <div className="w-full h-auto flex flex-row items-center ">

      <div className="flex justify-center items-center xl:ml-[4vw]">
        <Image 
          src={Logo} 
          alt="Care4Pets Logo" 
          className="xs:w-[4rem] h-auto sm:w-[6rem] ml-[2rem]  lg:w-[6rem] lg:ml-[1rem] xl:h-[7vw] xl:w-[7vw]"
        />
      </div>

      <div className="flex flex-row justify-center items-center gap-[4rem] w-[60vw] ml-[10vw] xs:hidden xl:flex lg:gap-[2rem] lg:ml-[4vw] xl:gap-[4vw]"> 
        <Link href="/" className="nav-link text-[1.5rem] lg:text-[1rem] xl:text-[1.3vw] font-roboto hover:text-gray-500">Home</Link>
        <Link href="/about" className="nav-link text-[1.5rem] lg:text-[1rem] xl:text-[1.3vw] font-roboto hover:text-gray-500">About Us</Link>
        <Link href="/services" className="nav-link text-[1.5rem] lg:text-[1rem] xl:text-[1.3vw] font-roboto hover:text-gray-500">Services</Link>
        <Link href="/appointments" className="nav-link text-[1.5rem] lg:text-[1rem] xl:text-[1.3vw]  font-roboto hover:text-gray-500">Appointments</Link>
        <Link href="/gallery" className="nav-link text-[1.5rem] lg:text-[1rem] xl:text-[1.3vw] font-roboto hover:text-gray-500">Gallery</Link>
        <Link href="/contact" className="nav-link text-[1.5rem] lg:text-[1rem]  xl:text-[1.3vw] font-roboto hover:text-gray-500">Contact Us</Link>
      </div>
      <div className="flex flex-row items-center justify-center xl:w-[20vw] gap-[2rem] xs:hidden xl:flex  lg:mr-[1vw] xl:ml-[4vw] ">
        <button className="border-none outline-none rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-roboto text-[1.5rem] w-[7vw] h-[3rem] lg:text-[1rem] xl:text-[1.3vw] xl:h-[2.8vw] hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-500 transition-transform duration-300 hover:scale-105">Sign In</button>
        <Link href="/signup" className="font-roboto text-[1.5rem] lg:text-[1rem] xl:w-[8vw] xl:text-[1.3vw] hover:text-gray-500 ">Sign Up</Link>
      </div>
      <div className="xs:flex justify-center items-center ml-auto text-[1.8rem] mr-[2rem] sm:text-[2.5rem] xl:hidden ">
        <RiMenu3Line/>
      </div>
    </div>
  );
};

export default Navbar;
