import React, { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import homeIcon from "../assets/home_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
import bookMark from "../assets/bookmark_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
import backArrow from "../assets/arrow_back_ios_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
import menuIcon from "../assets/menu_24dp_5F6368_FILL0_wght400_GRAD0_opsz24 (1).svg";

function NavBar() {
  const { setShowNav, isShowNav } = useContext(WeatherContext);

  return (
    <div className="w-full bg-navbar-bg flex">
      {/* Desktop Navigation */}
      <ul className="md:flex flex-col w-full py-4 items-center gap-4 hidden">
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            clsx(
              "w-10  rounded-lg hover:bg-[#0b0b0b] duration-200",
              isActive ? "bg-[#0b0b0b]" : "text-gray-400"
            )
          }
        >
          <img src={homeIcon} className="w-10" alt="Home Icon" />
        </NavLink>
        <NavLink
          to={"/saved"}
          className={({ isActive }) =>
            clsx(
              "w-10  rounded-lg hover:bg-[#0b0b0b] duration-200",
              isActive ? "bg-[#0b0b0b]" : "text-gray-400"
            )
          }
        >
          <img src={bookMark} className="w-10" alt="Bookmark Icon" />
        </NavLink>
      </ul>

      {/* Small Screen Navigation */}
      <div className="flex justify-between items-center w-full h-full px-2 md:hidden">
        <NavLink to={"/"} className="font-bold text-2xl text-white">
          Check Weather.
        </NavLink>
        <img
          src={menuIcon}
          className="w-14 cursor-pointer"
          onClick={() => setShowNav(true)}
          alt="Menu Icon"
        />
      </div>

      {/* Sliding Menu for Small Screens */}
      <div
        className={clsx(
          "flex flex-col fixed bg-navbar-bg h-screen left-0 top-0 items-center gap- md:hidden bg-[#212c3a] z-[999] transition-all duration-300 ",
          {
            "w-full opacity-100": isShowNav,
            "w-0 opacity-0": !isShowNav,
          }
        )}
      >
        <div
          className="flex items-center w-full px-2 h-[50px] m-2 cursor-pointer"
          onClick={() => setShowNav(false)}
        >
          <img src={backArrow} alt="Back Arrow" />
          <p className="font-bold text-2xl text-white hover:text-gray-500 duration-100">
            Back
          </p>
        </div>
        <hr className=" border-gray-200 w-full" />
        <div className="w-full">
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              clsx(
                "w-full flex justify-center border-b border-gray-500 hover:bg-gray-700",
                isActive ? "bg-gray-700" : "text-gray-400"
              )
            }
            onClick={() => setShowNav(false)}
          >
            <img src={homeIcon} className="w-10" alt="Home Icon" />
          </NavLink>
          <NavLink
            to={"/saved"}
            className={({ isActive }) =>
              clsx(
                "w-full flex justify-center  border-b border-gray-500 hover:bg-gray-700",
                isActive ? "bg-gray-700" : "text-gray-400"
              )
            }
            onClick={() => setShowNav(false)}
          >
            <img src={bookMark} className="w-10" alt="Bookmark Icon" />
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
