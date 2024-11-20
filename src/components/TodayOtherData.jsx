import React, { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext"; // Ensure proper import

function TodayOtherData() {
  const { weatherData } = useContext(WeatherContext);

  // Handle loading or missing data
  if (!weatherData || !weatherData.current) {
    return (
      <div className="bg-[#212c3a] px-8 mx-8 rounded   flex items-center justify-center">
        <p className="text-gray-400 text-sm">Loading weather data...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#212c3a] px-8  rounded  flex-1   flex flex-col justify-center">
      {/* <p className="text-gray-400 text-sm pt-4 font-semibold">Other Data</p> */}
      <div className="grid grid-cols-2 gap-y-4 py-8 md:h-[180px]  overflow-hidden overflow-y-auto   ">
        <div className="w-full flex flex-col items-center">
          <p className="font-semibold text-sm">Humidity</p>
          <p>{weatherData.current.humidity}%</p>
        </div>
        <div className="w-full flex flex-col items-center">
          <p className="font-semibold text-sm">Wind Speed</p>
          <p>{weatherData.current.wind_kph} kph</p>
          <p className="text-gray-500 text-sm">
            {weatherData.current.wind_mph} mph
          </p>
        </div>
        <div className="w-full flex flex-col items-center">
          <p className="font-semibold text-sm">Wind Direction</p>
          <p>{weatherData.current.wind_dir}</p>
        </div>
        <div className="w-full flex flex-col items-center">
          <p className="font-semibold text-sm">Wind Degree</p>
          <p>{weatherData.current.wind_degree}</p>
        </div>
        <div className="w-full flex flex-col items-center">
          <p className="font-semibold text-sm">Pressure</p>
          <p>{weatherData.current.pressure_in} in</p>
          <p className="text-gray-500 text-sm">
            {weatherData.current.pressure_mb} mb
          </p>
        </div>
        <div className="w-full flex flex-col items-center">
          <p className="font-semibold text-sm">Sunrise</p>
          <p>{weatherData.forecast?.forecastday[0]?.astro?.sunrise}</p>
        </div>
        <div className="w-full flex flex-col items-center">
          <p className="font-semibold text-sm">Sunset</p>
          <p>{weatherData.forecast?.forecastday[0]?.astro?.sunset}</p>
        </div>
        <div className="w-full flex flex-col items-center">
          <p className="font-semibold text-sm">Moonrise</p>
          <p>{weatherData.forecast?.forecastday[0]?.astro?.moonrise}</p>
        </div>
        <div className="w-full flex flex-col items-center">
          <p className="font-semibold text-sm">Moonset</p>
          <p>{weatherData.forecast?.forecastday[0]?.astro?.moonset}</p>
        </div>
      </div>
    </div>
  );
}

export default TodayOtherData;
