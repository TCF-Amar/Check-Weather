import React, { useState, useEffect, createContext } from "react";
import conf from "../conf/conf";
import axios from "axios";

const WeatherContext = createContext();

const WeatherProvider = ({ children }) => {
  // Initialize `search` from localStorage or default to "india"
  const [search, setSearch] = useState(() => {
    return localStorage.getItem("location") || "india";
  });

  const [isShowNav, setShowNav] = useState(false);

  const [weatherData, setWeatherData] = useState(null);

  // Update localStorage whenever `search` changes
  useEffect(() => {
    localStorage.setItem("location", search);
  }, [search]);

  // Fetch weather data whenever `search` changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${conf.apiUrl}?key=${conf.apiKey}&q=${search}&days=3`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (search) {
      fetchData();
    }
  }, [search]);

  const value = { search, setSearch, weatherData, isShowNav, setShowNav };

  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
};

export { WeatherContext, WeatherProvider };
export default WeatherProvider;
