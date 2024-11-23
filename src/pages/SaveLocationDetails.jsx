import React, { useState, useEffect } from "react";
import axios from "axios";
import conf from "../conf/conf";
import { useParams, useNavigate } from "react-router";
import { motion } from "framer-motion"; // Animation library
import backArrow from "../assets/arrow_back_ios_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";

function WeatherSearch() {
  const { name } = useParams(); // Location from URL
  const navigate = useNavigate(); // Navigation hook
  const [weatherData, setWeatherData] = useState(null); // Weather data
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error handling

  useEffect(() => {
    if (!name) return;

    const fetchWeather = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `${conf.apiUrl}?key=${conf.apiKey}&q=${name}&days=3`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setError("Failed to fetch weather data. Please try again.");
        setWeatherData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [name]);

  const handleBack = () => navigate("/saved"); // Navigate to /saved

  return (
    <div className="min-h-screen  text-white">
      {/* Navbar */}
      <nav className="bg-[#212c3a] p-4 shadow-lg fixed w-full">
        <h1 className="text-2xl font-bold text-center">Check Weather.</h1>
      </nav>

      <div className="p-6 flex flex-col items-center">
        {/* Loading Indicator */}
        {loading && (
          <motion.div
            className="text-lg text-blue-300 mt-14 flex items-center gap-2"
            transition={{ repeat: Infinity, duration: 1 }}
          >
            <div className="w-6 h-6 border-4 border-blue-300 border-t-transparent rounded-full" />
            Loading...
          </motion.div>
        )}

        {/* Error Message */}
        {error && (
          <motion.div
            className="bg-red-800 bg-opacity-50 p-4 rounded mt-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </motion.div>
        )}

        {/* Weather Data */}
        {weatherData && (
          <motion.div
            className="mt-14 bg-[#212c3a] bg-opacity-40 p-6  rounded-lg shadow-md max-w-md w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Back Button */}
            <button
              onClick={handleBack}
              className="  px-4 py-2 flex justify-center items-center  bg-[#3b3a3a] text-white rounded hover:bg-gray-700"
            >
              <img src={backArrow} alt="" />
              <p className="font-bold">Back</p>
            </button>
            <h2 className="text-2xl font-bold">
              {weatherData.location.name}, {weatherData.location.country}
            </h2>
            <p className="mt-2 text-lg">
              <span className="font-semibold">Current Temperature:</span>{" "}
              {weatherData.current.temp_c}°C
            </p>
            <p className="mt-1">
              <span className="font-semibold">Condition:</span>{" "}
              {weatherData.current.condition.text}
            </p>
            <p className="mt-1">
              <span className="font-semibold">Wind:</span>{" "}
              {weatherData.current.wind_kph} km/h
            </p>
            <p className="mt-1">
              <span className="font-semibold">Humidity:</span>{" "}
              {weatherData.current.humidity}%
            </p>

            {/* 3-Day Forecast */}
            <div className="mt-4">
              <h3 className="text-xl font-semibold mb-2">3-Day Forecast:</h3>
              {weatherData.forecast.forecastday.map((day, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-700 bg-opacity-50 p-4 rounded mb-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <p>
                    <span className="font-semibold">Date:</span> {day.date}
                  </p>
                  <p>
                    <span className="font-semibold">Avg Temp:</span>{" "}
                    {day.day.avgtemp_c}°C
                  </p>
                  <p>
                    <span className="font-semibold">Condition:</span>{" "}
                    {day.day.condition.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default WeatherSearch;
