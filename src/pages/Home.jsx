import React from "react";
import SearchBar from "../components/SearchBar";
import TodayCurrent from "../components/TodayCurrent";
import TodayForecast from "../components/TodayForecast";
import TodayOtherData from "../components/TodayOtherData";
import NavBar from "../components/NavBar";
import DayForecast from "../components/DayForecast";

function Home() {
  return (
    <div className="flex flex-col md:flex-row gap-2 w-full  md:h-screen  bg-[#] p-4 md:overflow-hidden ">
      <div className="lg:w-[5%] md:w-[10%] bg-[#212c3a] rounded-sm  h-[50px] w-full md:h-[95vh] overflow-hidden overflow-y-auto hidden md:flex  ">
        <NavBar />
      </div>
      <div className=" md:hidden rounded-sm flex  fixed bg-[#212c3a] w-[96%]  left-[2%] px-4 h-[50px] top-2 ">
        <NavBar />
      </div>
      <div className="flex-1 flex flex-col justify-between rounded-sm  h-[95vh] overflow-hidden  hideScroll gap-3 mt-12 md:mt-0">
        <SearchBar />
        <TodayCurrent />
        <TodayForecast />
        <TodayOtherData />
      </div>
      <div className="md:w-[40%] bg-[#212c3a] rounded-sm p-4 md:h-[95vh]  overflow-hidden overflow-y-auto">
        <DayForecast />
      </div>
    </div>
  );
}

export default Home;
