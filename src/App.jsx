import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SavedLocation from "./pages/SavedLocation";

function App() {
  return (
    <div className="bg-[#0B121E] text-white">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/saved" element={<SavedLocation />} />
      </Routes>
    </div>
  );
}

export default App;
