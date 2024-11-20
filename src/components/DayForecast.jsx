import React, { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";

function DayForecast() {
  const { weatherData } = useContext(WeatherContext);
  if (
    !weatherData ||
    !weatherData.forecast ||
    !weatherData.forecast.forecastday
  ) {
    return (
      <div className="bg-[#212c3a] sm:px-8 mx-8 rounded flex items-center justify-center h-[300px]">
        <p className="text-gray-400 text-sm">Loading forecast data...</p>
      </div>
    );
  }
  const foreCastDays = weatherData.forecast.forecastday;

  return (
    <div className="bg-[#212c3a] w-full md:h-[90vh] p-4">
      <p className="md:text-sm md:font-semibold  md:text-gray-500 text-center md:text-start text-xl font-bold pb-4">
        Three Day's Forecast
      </p>
      {/* day forecast */}
      <div className="flex flex-col gap-2 py-3 ">
        {foreCastDays.map((day, index) => (
          <div
            key={index}
            className="border px-8 py-4 flex items-center justify-between bg-gray-800 rounded-md border-gray-400"
          >
            <p>{day.date}</p>
            <img src={day.day.condition.icon} alt={day.day.condition.text} />
            <p>{day.day.avgtemp_c}°C</p>
          </div>
        ))}
        
      </div>
    </div>
  );
}

export default DayForecast;
