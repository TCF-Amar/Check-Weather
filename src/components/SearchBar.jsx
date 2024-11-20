import React, { useState, useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";

function SearchBar() {
  const { setSearch } = useContext(WeatherContext);
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(inputValue);
  };

  return (
    <div className="  w-full ">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)} // इनपुट को लोकल स्टेट से बाँधें
          placeholder="Search..."
          className="w-full p-2 rounded text-white bg-[#212c3a] outline-none border-none px-8"
        />
        <button type="submit" className="hidden">
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
