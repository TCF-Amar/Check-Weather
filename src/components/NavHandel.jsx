import React from 'react'
import NavBar from "../components/NavBar";


function NavHandel() {
  return (
    <>
      {" "}
      <div className="lg:w-[5%] md:w-[10%] bg-[#212c3a] rounded-sm  h-[50px] w-full md:h-[95vh] overflow-hidden overflow-y-auto hidden md:flex ">
        <NavBar />
      </div>
      <div className=" md:hidden rounded-sm flex  fixed bg-[#212c3a] w-[96%]  left-[2%] px-4 h-[50px] top-2  z-[9999] ">
        <NavBar />
      </div>
    </>
  );
}

export default NavHandel