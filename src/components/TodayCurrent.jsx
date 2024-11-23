import React, { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { WeatherContext } from "../context/WeatherContext";
import bookMark from "../assets/bookmark_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
import bookMarkCheck from "../assets/bookmark_check_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";

const containerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const bookmarkVariants = {
  initial: { scale: 1 },
  clicked: {
    scale: 1.2,
    rotate: 15,
    transition: { type: "spring", stiffness: 300 },
  },
};

const iconVariants = {
  initial: { y: 0 },
  animate: { y: [0, -10, 0], transition: { repeat: Infinity, duration: 1 } },
};

function TodayCurrent() {
  const { weatherData } = useContext(WeatherContext);
  const [unit, setUnit] = useState("C"); // Default to Celsius
  const [isSaved, setIsSaved] = useState(false); // Tracks if the location is saved

  useEffect(() => {
    if (!weatherData) return;
    const currentLocation = weatherData.location.name;
    const savedLocations =
      JSON.parse(localStorage.getItem("savedLocations")) || [];
    setIsSaved(savedLocations.some((loc) => loc.name === currentLocation));
  }, [weatherData]);

  const toggleUnit = (newUnit) => {
    setUnit(newUnit);
  };

  const handleBookmarkToggle = () => {
    const currentLocation = weatherData.location.name;
    const currentTemp =
      unit === "C" ? weatherData.current?.temp_c : weatherData.current?.temp_f;
    const currentIcon = weatherData.current?.condition?.icon;

    // Get the current saved locations
    let savedLocations =
      JSON.parse(localStorage.getItem("savedLocations")) || [];

    // Check if location is already saved
    const locationIndex = savedLocations.findIndex(
      (loc) => loc.name === currentLocation
    );

    if (isSaved) {
      // Remove location from saved locations
      savedLocations.splice(locationIndex, 1);
    } else {
      // Add location to saved locations
      savedLocations.push({
        name: currentLocation,
        temp: currentTemp,
        icon: currentIcon,
      });
    }

    // Save the updated locations to localStorage
    localStorage.setItem("savedLocations", JSON.stringify(savedLocations));
    setIsSaved(!isSaved);
  };

  if (!weatherData) {
    return (
      <div className="flex w-full justify-center items-center p-10">
        Loading...
      </div>
    );
  }

  const temperature =
    unit === "C" ? weatherData.current?.temp_c : weatherData.current?.temp_f;

  const feelsLike =
    unit === "C"
      ? weatherData.current?.feelslike_c
      : weatherData.current?.feelslike_f;

  return (
    <motion.div
      className="w-full flex-1 flex flex-col md:flex-row justify-around items-center rounded"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Location */}
      <div className="md:absolute md:w-1/2 md:top-20 relative w-full">
        <motion.div
          className="absolute right-2 cursor-pointer"
          onClick={handleBookmarkToggle}
          variants={bookmarkVariants}
          initial="initial"
          animate={isSaved ? "clicked" : "initial"}
        >
          <img src={isSaved ? bookMarkCheck : bookMark} alt="Bookmark" />
        </motion.div>
      </div>
      <div>
        <h1 className="text-2xl text-center sm:text-start font-bold">
          {weatherData.location?.name || "Location not found"}
        </h1>
        <p className="text-sm text-gray-500">
          {weatherData.location?.region}, {weatherData.location?.country}
        </p>
        {/* Weather Information */}
        <div className="hidden md:block">
          <div className="text-2xl font-bold flex gap-3 items-center">
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
              Feels Like: {feelsLike ?? "N/A"} {unit === "C" ? "℃" : "℉"}
            </p>
          </div>
          <motion.p
            className="hidden md:block text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={weatherData.current?.condition?.text}
          >
            {weatherData.current?.condition?.text}
          </motion.p>
        </div>
      </div>
      <div className="flex justify-center items-center flex-col -gap-8">
        <motion.img
          className="w-36"
          src={weatherData.current?.condition?.icon}
          alt="Weather Condition"
          variants={iconVariants}
          initial="initial"
          animate="animate"
        />
        <p className="md:hidden font-bold">
          {weatherData.current?.condition?.text}
        </p>
      </div>
      <div className="md:hidden block mb-4">
        <div className="text-2xl font-bold flex gap-3 items-center">
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
            Feels Like: {feelsLike ?? "N/A"} {unit === "C" ? "℃" : "℉"}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default TodayCurrent;
