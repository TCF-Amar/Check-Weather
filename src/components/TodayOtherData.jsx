import React, { useContext } from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import { WeatherContext } from "../context/WeatherContext";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function TodayOtherData() {
  const { weatherData } = useContext(WeatherContext);

  // Handle loading or missing data
  if (!weatherData || !weatherData.current) {
    return (
      <div className="bg-[#212c3a] px-8 mx-8 rounded flex items-center justify-center">
        <p className="text-gray-400 text-sm">Loading weather data...</p>
      </div>
    );
  }

  return (
    <motion.div
      className="bg-[#212c3a] px-8 rounded flex-1 flex flex-col justify-center py-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="grid grid-cols-2 gap-y-4 py-8 md:h-[200px] overflow-hidden overflow-y-auto">
        <motion.div
          className="w-full flex flex-col items-center"
          variants={itemVariants}
        >
          <p className="font-semibold text-sm">Humidity</p>
          <p>{weatherData.current.humidity}%</p>
        </motion.div>
        <motion.div
          className="w-full flex flex-col items-center"
          variants={itemVariants}
        >
          <p className="font-semibold text-sm">Wind Speed</p>
          <p>{weatherData.current.wind_kph} kph</p>
          <p className="text-gray-500 text-sm">
            {weatherData.current.wind_mph} mph
          </p>
        </motion.div>
        <motion.div
          className="w-full flex flex-col items-center"
          variants={itemVariants}
        >
          <p className="font-semibold text-sm">Wind Direction</p>
          <p>{weatherData.current.wind_dir}</p>
        </motion.div>
        <motion.div
          className="w-full flex flex-col items-center"
          variants={itemVariants}
        >
          <p className="font-semibold text-sm">Wind Degree</p>
          <p>{weatherData.current.wind_degree}</p>
        </motion.div>
        <motion.div
          className="w-full flex flex-col items-center"
          variants={itemVariants}
        >
          <p className="font-semibold text-sm">Pressure</p>
          <p>{weatherData.current.pressure_in} in</p>
          <p className="text-gray-500 text-sm">
            {weatherData.current.pressure_mb} mb
          </p>
        </motion.div>
        <motion.div
          className="w-full flex flex-col items-center"
          variants={itemVariants}
        >
          <p className="font-semibold text-sm">Sunrise</p>
          <p>{weatherData.forecast?.forecastday[0]?.astro?.sunrise}</p>
        </motion.div>
        <motion.div
          className="w-full flex flex-col items-center"
          variants={itemVariants}
        >
          <p className="font-semibold text-sm">Sunset</p>
          <p>{weatherData.forecast?.forecastday[0]?.astro?.sunset}</p>
        </motion.div>
        <motion.div
          className="w-full flex flex-col items-center"
          variants={itemVariants}
        >
          <p className="font-semibold text-sm">Moonrise</p>
          <p>{weatherData.forecast?.forecastday[0]?.astro?.moonrise}</p>
        </motion.div>
        <motion.div
          className="w-full flex flex-col items-center"
          variants={itemVariants}
        >
          <p className="font-semibold text-sm">Moonset</p>
          <p>{weatherData.forecast?.forecastday[0]?.astro?.moonset}</p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default TodayOtherData;
