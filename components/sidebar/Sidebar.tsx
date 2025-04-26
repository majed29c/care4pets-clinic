"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { RiHome2Line,RiUserLine, RiInformationLine, RiServiceLine, RiCalendarLine, RiGalleryLine, RiContactsLine, RiUserAddLine, RiLoginBoxLine } from 'react-icons/ri';
import { X } from "lucide-react";
import  cookies from 'js-cookie';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = (props: SidebarProps) => {
  const [isSmall, setIsSmall] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsSmall(window.innerWidth < 540);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleClose = () => {
    setIsClosed(true);
    setTimeout(() => {
      props.setIsOpen(false);
    }, 300); 
  };

  useEffect(() => {
    if (props.isOpen) {
      setIsClosed(false); 
    }
  }, [props.isOpen]);
 
  const closeMenu = () => {
    setIsClosed(true);
    setTimeout(() => {
      props.setIsOpen(false);
    }, 300); 
  };
  useEffect(()=>{
    if(cookies.get('isLoggedIn') === 'true'){ 
      setIsLoggedIn(true);
    }
  },[]);
  return (
    <div 
      className={`flex flex-col h-screen xs:w-[65vw] md:w-[50vw] px-6 py-6 space-y-6 bg-secondary text-white font-roboto opacity-95 z-20 
        transition-all ease-in-out duration-500 ${props.isOpen ? 'animate-slideLeft' : ''} ${isClosed ? 'animate-slideRight' : ''}`}
    >
      <button className="flex absolute top-2 right-2 z-20" onClick={handleClose}>
        <X size={isSmall ? 15 : 24} />
      </button>
     {isLoggedIn && (
      <button onClick={closeMenu}>
        <Link href="/profile" className="flex items-center text-[0.9rem] md:text-[1.5rem] space-x-3 hover:text-gray-200 transition-all duration-200">
          <RiUserLine size={isSmall ? 15 : 24} />
          <span>Profile</span>
        </Link>
      </button>)}

      <button onClick={closeMenu}>
        <Link href="/" className="flex items-center text-[0.9rem] md:text-[1.5rem] space-x-3 hover:text-gray-200 transition-all duration-200">
          <RiHome2Line size={isSmall ? 15 : 24} />
          <span>Home</span>
        </Link>
      </button>
      
      <button onClick={closeMenu}>
        <Link href="/about" className="flex items-center text-[0.9rem] md:text-[1.5rem] space-x-3 hover:text-gray-200 transition-all duration-200">
          <RiInformationLine size={isSmall ? 15 : 24} />
          <span>About Us</span>
        </Link>
      </button>
      
      <button onClick={closeMenu}>
        <Link href="/services" className="flex items-center text-[0.9rem] md:text-[1.5rem] space-x-3 hover:text-gray-200 transition-all duration-200">
          <RiServiceLine size={isSmall ? 15 : 24} />
          <span>Services</span>
        </Link>
      </button>
      
      <button onClick={closeMenu}>
        <Link href={isLoggedIn ? '/appointments' : '/signin'} className="flex items-center text-[0.9rem] md:text-[1.5rem] space-x-3 hover:text-gray-200 transition-all duration-200">
          <RiCalendarLine size={isSmall ? 15 : 24} />
          <span>Appointments</span>
        </Link>
      </button>

            {isLoggedIn && (  
      <button onClick={() => {
            cookies.remove('isLoggedIn');
            setIsLoggedIn(false);
            closeMenu();
          }}>
            <span className="flex items-center text-[0.9rem] md:text-[1.5rem] space-x-3 hover:text-gray-200 transition-all duration-200">
              <RiLoginBoxLine size={isSmall ? 15 : 24} />
              <span>Logout</span>
            </span>
            
          </button>
            )}
      
      {!isLoggedIn &&
       (
        <>
      <button onClick={closeMenu}>
        <Link href="/signup" className="flex items-center text-[0.9rem] md:text-[1.5rem] space-x-3 hover:text-gray-200 transition-all duration-200">
          <RiUserAddLine size={isSmall ? 15 : 24} />
          <span>Signup</span>
        </Link>
      </button>
      <button onClick={closeMenu}>
        <Link href="/signin" className="flex items-center text-[0.9rem] md:text-[1.5rem] space-x-3 hover:text-gray-200 transition-all duration-200">
          <RiLoginBoxLine size={isSmall ? 15 : 24} />
          <span>Login</span>
        </Link>
      </button>
      </>)}
    </div>
  );
};

export default Sidebar;