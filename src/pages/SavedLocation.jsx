import React from "react";
import { Link } from "react-router-dom";

function SavedLocation() {
  return (
    <div className="flex justify-center items-center w-full h-screen flex-col">
      <p className="bg-red-700 hover:bg-red-800 p-4 duration-200 rounded-lg cursor-not-allowed">
        This Page Not Created Yet
      </p>
      <br />
      <Link
        to="/"
        className="bg-blue-700 p-4 rounded-lg hover:bg-blue-800 duration-200"
      >
        Back To Home Page
      </Link>
      <p className="text-[10px] text-gray-600 underline">apologize</p>
    </div>
  );
}

export default SavedLocation;
