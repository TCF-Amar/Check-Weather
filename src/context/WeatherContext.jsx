import React, { useState, useEffect, createContext } from "react";
import conf from "../conf/conf";
import axios from "axios";

const WeatherContext = createContext();

const WeatherProvider = ({ children }) => {
  // Initialize `search` from localStorage or default to "india"
  const [search, setSearch] = useState(() => {
    // Check for saved location first, then fall back to default "india"
    return localStorage.getItem("savedLocation") || localStorage.getItem("location") || "india";
  });

  const [isShowNav, setShowNav] = useState(false); // Toggle nav visibility
  const [weatherData, setWeatherData] = useState(null); // Stores fetched weather data
  const [loading, setLoading] = useState(false); // Loading state to handle API requests

  // Update localStorage whenever `search` changes
  useEffect(() => {
    localStorage.setItem("location", search); // Save the search value to location
  }, [search]);

  // Fetch weather data whenever `search` changes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      try {
        const response = await axios.get(
          `${conf.apiUrl}?key=${conf.apiKey}&q=${search}&days=3`
        );
        setWeatherData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
        setWeatherData(null); // Reset weatherData in case of an error
      } finally {
        setLoading(false); // Stop loading once the request is complete
      }
    };

    if (search) {
      fetchData();
    }
  }, [search]);

  // Context value to share across components
  const value = { search, setSearch, weatherData, isShowNav, setShowNav, loading };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
};

export { WeatherContext, WeatherProvider };
export default WeatherProvider;
