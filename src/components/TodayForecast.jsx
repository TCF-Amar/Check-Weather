import React, { useContext } from "react";
import { motion } from "framer-motion";
import { WeatherContext } from "../context/WeatherContext";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

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
    <motion.div
      className="bg-[#212c3a] px-8 py-2 md:mx-0 rounded show-scrollbar flex justify-center flex-col"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <p className="text-gray-400 text-sm pt-4 font-semibold">
        Today's Hourly Forecast
      </p>
      <div className="flex gap-4 overflow-x-auto hide-scrollbar">
        {todayForecastHours.map((hour, index) => (
          <motion.div
            className="flex items-center"
            key={index}
            variants={cardVariants}
          >
            <div className="flex items-center flex-col justify-between p-4 rounded ">
              <p className="text-white text-sm">
                <strong>{hour.time?.split(" ")[1] ?? "N/A"}</strong>
              </p>
              <div
                className={`w-full z-[0] ${
                  isShowNav ? "hidden" : "inline-block"
                }`}
              >
                <motion.img
                  src={hour.condition.icon}
                  className="scale-150"
                  alt={hour.condition.text}
                  whileHover={{ scale: 2, transition: { duration: 0.2 } }}
                />
              </div>
              <div className="text-gray-300 text-sm font-bold">
                <p>{hour.temp_c}°C</p>
              </div>
            </div>
            {index !== todayForecastHours.length - 1 && (
              <div className="h-full border border-gray-500"></div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default TodayForecast;
