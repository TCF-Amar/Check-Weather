import React, { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";

function TodayForecast() {
  const { weatherData, isShowNav } = useContext(WeatherContext);

  // Handle loading state
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

  const todayForecastHours = weatherData.forecast.forecastday[0].hour;

  return (
    <div className="bg-[#212c3a] px-8 py-2  md:mx-0 rounded show-scrollbar    flex justify-center flex-col">
      <p className="text-gray-400 text-sm pt-4 font-semibold">
        Today's Hourly Forecast
      </p>
      <div className="flex gap-4  overflow-x-auto hide-scrollbar">
        {todayForecastHours.map((hour, index) => (
          <div className="flex items-center" key={index}>
            <div className="flex items-center flex-col justify-between p-4 rounded ">
              <p className="text-white text-sm">
                <strong>{hour.time?.split(" ")[1] ?? "N/A"}</strong>
              </p>
              <div
                className={`w-full z-[0] ${
                  isShowNav ? "hidden" : "inline-block"
                }`}
              >
                <img
                  src={hour.condition.icon}
                  className="scale-150"
                  alt={hour.condition.text}
                />
              </div>
              <div className="text-gray-300 text-sm font-bold">
                <p>{hour.temp_c}°C</p>
              </div>
              {index !== todayForecastHours.length - 1 && (
                <div className="h-full border border-gray-500"></div>
              )}
            </div>
            <p className=" h-[70%] border "></p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodayForecast;
