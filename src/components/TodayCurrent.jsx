import React, { useContext, useState } from "react";
import { WeatherContext } from "../context/WeatherContext";

function TodayCurrent() {
  const { weatherData } = useContext(WeatherContext);
  const [unit, setUnit] = useState("C"); // Default to Celsius

  if (!weatherData) {
    return (
      <div className="flex w-full justify-center items-center p-10">Loading...</div>
    );
  }

  const toggleUnit = (newUnit) => {
    setUnit(newUnit);
  };

  const temperature =
    unit === "C" ? weatherData.current?.temp_c : weatherData.current?.temp_f;

  const feelsLike =
    unit === "C"
      ? weatherData.current?.feelslike_c
      : weatherData.current?.feelslike_f;

  return (
    <div className=" w-full flex-1  flex flex-col md:flex-row justify-around items-center  rounded">
      {/* Location */}
      <div>
        <h1 className="text-2xl text-center sm:text-start font-bold">
          {weatherData.location?.name || "Location not found"}
        </h1>
        <p className="text-sm text-gray-500">
          {weatherData.location?.region}, {weatherData.location?.country}
        </p>
        {/* Weather Information */}
        <div className="hidden md:block">
          <div className=" text-2xl font-bold flex gap-3 items-center">
            <p>{temperature ?? "N/A"}</p>
            <div className="flex gap-2">
              <button
                onClick={() => toggleUnit("C")}
                className={`${
                  unit === "C" ? "text-gray-300" : "text-gray-600"
                } font-bold`}
              >
                ℃
              </button>
              <p className="font-normal">|</p>
              <button
                onClick={() => toggleUnit("F")}
                className={`${
                  unit === "F" ? "text-gray-300" : "text-gray-600"
                } font-bold`}
              >
                ℉
              </button>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-semibold">
              Feel's Like: {feelsLike ?? "N/A"} {unit === "C" ? "℃" : "℉"}
            </p>
          </div>
          <p className="hidden md:block  text-sm">
            {" "}
            {weatherData.current?.condition?.text}
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center flex-col -gap-8">
        <img
          className="w-36"
          src={weatherData.current?.condition?.icon}
          alt="Weather Condition"
        />
        <p className="md:hidden font-bold">
          {weatherData.current?.condition?.text}
        </p>
      </div>
      <div className="md:hidden block mb-4 ">
        <div className=" text-2xl font-bold flex gap-3 items-center">
          <p>{temperature ?? "N/A"}</p>
          <div className="flex gap-2">
            <button
              onClick={() => toggleUnit("C")}
              className={`${
                unit === "C" ? "text-gray-300" : "text-gray-600"
              } font-bold`}
            >
              ℃
            </button>
            <p className="font-normal">|</p>
            <button
              onClick={() => toggleUnit("F")}
              className={`${
                unit === "F" ? "text-gray-300" : "text-gray-600"
              } font-bold`}
            >
              ℉
            </button>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-500 font-semibold">
            Feel's Like: {feelsLike ?? "N/A"} {unit === "C" ? "℃" : "℉"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TodayCurrent;
