import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavHandel from "../components/NavHandel";
import { motion } from "framer-motion";

function SavedLocation() {
  const [savedLocations, setSavedLocations] = useState([]);

  // Fetch saved locations from localStorage on component mount
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("savedLocations")) || [];
      // Ensure all locations have the required structure
      const formattedLocations = saved.map((location) =>
        typeof location === "object" && location.name
          ? location
          : { name: "Unknown Location", temp: "N/A", icon: "❓" }
      );
      setSavedLocations(formattedLocations);
    } catch (error) {
      console.error("Error reading saved locations:", error);
      setSavedLocations([]);
    }
  }, []);

  // Delete a saved location by index
  const handleDelete = (indexToRemove) => {
    const updatedLocations = savedLocations.filter(
      (_, index) => index !== indexToRemove
    );
    setSavedLocations(updatedLocations);
    localStorage.setItem("savedLocations", JSON.stringify(updatedLocations));
  };

  return (
    <div className="flex justify-between items-center w-full h-screen px-4 gap-4 text-white bg-gray-900">
      {/* Navigation Handle */}
      <NavHandel />

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl text-center font-bold mb-4">Saved Locations</h1>

        {/* Check if there are saved locations */}
        {savedLocations.length > 0 ? (
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {savedLocations.map((location, index) => (
              <motion.div
                key={index}
                className="p-4 border border-gray-400 rounded bg-gray-800 flex justify-between items-center"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 * index, duration: 0.3 }}
              >
                {/* Location Details */}
                <div className="flex items-center gap-4">
                  <img
                    src={location.icon || "❓"}
                    alt={location.name}
                    className="w-12 h-12"
                  />
                  <div>
                    <p className="text-lg font-semibold">{location.name}</p>
                    <p className="text-sm text-gray-400">
                      Temp: {location.temp} ℃
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Link
                    to={`/weather/${location.name}`}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition"
                    aria-label={`View weather details for ${location.name}`}
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => handleDelete(index)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-500 transition"
                    aria-label={`Delete ${location.name}`}
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          // If no saved locations are found
          <div className="flex flex-col items-center">
            <p className="text-gray-400 text-lg">No saved locations found.</p>
            <Link
              to="/"
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
              aria-label="Add a new location"
            >
              Add a Location
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default SavedLocation;
