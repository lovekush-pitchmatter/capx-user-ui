import React from "react";
// import { FaAnt, FaBee } from "react-icons/fa";

const RankingProgress = () => {
  const currentRank = "Ant";
  const nextRank = "Bee";
  const currentCoins = 0; // Placeholder
  const neededCoins = 1000; // Placeholder
  const progressPercentage = (currentCoins / neededCoins) * 100;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
      <div className="flex flex-col items-center text-center">
        {/* <FaAnt size={30} className="text-purple-600 mb-1" /> */}
        <p>Ant</p>
        <span className="text-sm font-semibold text-gray-700">
          {currentRank} <br /> Current Rank
        </span>
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-center text-sm font-medium text-gray-700 mb-2">
          <span>{currentCoins}</span>
          <span>{neededCoins}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-gradient-to-r from-purple-500 to-blue-500 h-2.5 rounded-full"
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          ></div>
        </div>
        <p className="text-center text-sm text-gray-600 mt-2">
          You need {neededCoins - currentCoins} AngelSEED (ANGEL) coins to level up
        </p>
      </div>

      <div className="flex flex-col items-center text-center">
        {/* <FaBee size={30} className="text-purple-600 mb-1" /> */}
        <p>Bee</p>
        <span className="text-sm font-semibold text-gray-700">
          {nextRank} <br /> Next Rank
        </span>
      </div>
    </div>
  );
};

export default RankingProgress;
