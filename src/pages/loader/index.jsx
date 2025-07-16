import React from "react";
import loaderGif from "../..//assets/loader/loader.gif";

const LoaderPage = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-white">
      <div className="flex flex-col items-center space-y-4">
        <img src={loaderGif} alt="Loading..." className="w-30 h-25" />
        <p className="text-gray-600 text-md font-medium">Loading CapShield Token...</p>
      </div>
    </div>
  );
};

export default LoaderPage;
