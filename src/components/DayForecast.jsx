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
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

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
    <motion.div
      className="bg-[#212c3a] w-full md:h-[90vh] p-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <p className="md:text-sm md:font-semibold md:text-gray-500 text-center md:text-start text-xl font-bold pb-4">
        Three Day's Forecast
      </p>
      {/* Day Forecast */}
      <div className="flex flex-col gap-2 py-3">
        {foreCastDays.map((day, index) => (
          <motion.div
            key={index}
            className="border px-8 py-4 flex items-center justify-between bg-gray-800 rounded-md border-gray-400"
            variants={itemVariants}
          >
            <p>{day.date}</p>
            <img src={day.day.condition.icon} alt={day.day.condition.text} />
            <p>{day.day.avgtemp_c}°C</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default DayForecast;
