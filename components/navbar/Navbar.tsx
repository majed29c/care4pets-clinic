"use client";
import Image from "next/image";
import Logo from "../../public/Care4PETS.png";
import Link from "next/link";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { useState, useEffect } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import Cookies from "js-cookie";
import user from "@/public/user.png";
import  cookies from "js-cookie";
import { redirect } from "next/navigation";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownAnimation, setDropdownAnimation] = useState("");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    if (showDropdown) {
      setDropdownAnimation("animate-slide-out");
      setTimeout(() => {
        setShowDropdown(false);
        setDropdownAnimation("");
      }, 300); // Match the animation duration
    } else {
      setShowDropdown(true);
      setDropdownAnimation("animate-slide-in");
    }
  };

  const handleLogout = () => {
    Cookies.remove("isLoggedIn");
    Cookies.remove("email");
    setIsLoggedIn(false);
    window.location.href = "/signin";
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (Cookies.get("isLoggedIn") === "true") {
      setIsLoggedIn(true);
    }
  }, []);


  return (
    <div className="w-full h-auto flex flex-row items-center bg-none shadow-none py-4 relative">
      <div className="flex justify-center items-center xl:ml-[4vw]">
        <Image
          src={Logo}
          alt="Care4Pets Logo"
          className="w-[6rem] lg:w-[6rem] xl:w-auto ml-[2rem] lg:ml-[1rem] xl:h-[4rem]"
        />
      </div>

      {!isMobile && (
        <div className="flex flex-row items-center gap-[4rem] w-[60vw] ml-[10vw] xl:flex xl:pt-4 lg:gap-[2rem] lg:ml-[12vw] xl:gap-[6vw]">
          <Link
            href="/"
            className="nav-link text-[1.5rem] lg:text-[1rem] xl:text-[1.3vw] font-roboto text-charcoal hover:text-gray-500"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="nav-link text-[1.5rem] lg:text-[1rem] xl:text-[1.3vw] font-roboto text-charcoal hover:text-gray-500"
          >
            About Us
          </Link>
          <Link
            href="/services"
            className="nav-link text-[1.5rem] lg:text-[1rem] xl:text-[1.3vw] font-roboto text-charcoal hover:text-gray-500"
          >
            Services
          </Link>
          <Link
            href={isLoggedIn ? "/appointments" : "/signin"}
            className="nav-link text-[1.5rem] lg:text-[1rem] xl:text-[1.3vw] font-roboto text-charcoal hover:text-gray-500"
          >
            Appointments
            
          </Link>
        </div>
      )}

      {!isMobile && !isLoggedIn && (
        <div className="flex flex-row items-center justify-center xl:w-[20vw] gap-[2rem] lg:mr-[1vw] xl:ml-[8vw] pt-4">
          <Link href="/signin">
            <button className="border-none outline-none rounded-lg bg-secondary text-white font-roboto text-[1.5rem] w-[7vw] h-[3rem] lg:text-[1rem] xl:text-[1.3vw] xl:h-[2.8vw] transition-transform duration-300 hover:scale-105 hover:bg-hovered">
              Sign In
            </button>
          </Link>
          <Link
            href="/signup"
            className="font-roboto text-[1.5rem] lg:text-[1rem] xl:w-[8vw] xl:text-[1.3vw] text-[var(--color-text)] hover:text-gray-500"
          >
            Sign Up
          </Link>
        </div>
      )}

      {!isMobile && isLoggedIn && (
        <div className="relative flex items-center justify-center ml-auto mr-8 pt-3">
          <Image
            src={user}
            alt="user"
            className="h-12 w-auto cursor-pointer"
            onClick={toggleDropdown}
          />
          {showDropdown && (
            <div
              className={`absolute z-50 top-16 right-0 bg-light shadow-lg rounded-lg p-4 w-48 transition-transform duration-300 transform ${dropdownAnimation}`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-charcoal font-semibold">Menu</span>
                <RiCloseLine
                  className="text-red-500 cursor-pointer text-xl"
                  onClick={toggleDropdown}
                />
              </div>
              <Link
                href="/about"
                className="block text-charcoal hover:text-secondary py-2"
              >
                About Us
              </Link>
              <Link
                href="/services"
                className="block text-charcoal hover:text-secondary py-2"
              >
                Services
              </Link>
              <Link
                href="/appointments"
                className="block text-charcoal hover:text-secondary py-2"
              >
                Appointments
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left text-red-500 hover:text-red-700 py-2"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}

      {isMobile && (
        <div className="flex justify-center items-center ml-auto text-[1.8rem] mr-[2rem] sm:text-[2.5rem] xl:hidden">
          <RiMenu3Line onClick={toggleMenu} />
        </div>
      )}

      {isOpen && isMobile && (
        <div className="fixed top-0 right-0 z-50">
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      )}
    </div>
  );
};

export default Navbar;