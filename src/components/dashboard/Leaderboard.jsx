import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Trophy } from "lucide-react";

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState("Daily");
  
  const players = [
    { rank: 1, name: "cryptoqueen", amount: "$220054" },
    { rank: 2, name: "jasonthomas", amount: "$213,616" },
    { rank: 3, name: "0xd4e...44357", amount: "$198,420" },
    { rank: 4, name: "angelinvestor88", amount: "$175,320" },
    { rank: 5, name: "0x05d...282c5", amount: "$160,110" },
  ];
  
  const tabs = ["Daily", "All Time"];

  const getRankIcon = (rank) => {
    switch(rank) {
      case 1:
        return (
          <div className="flex items-center justify-center w-8 h-8">
            <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center relative">
              <Trophy className="w-3 h-3 text-yellow-800" />
              <div className="absolute -bottom-1 w-4 h-2 bg-yellow-500 rounded-sm"></div>
            </div>
            <span className="ml-2 font-semibold text-gray-800">#1</span>
          </div>
        );
      case 2:
        return (
          <div className="flex items-center justify-center w-8 h-8">
            <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center relative">
              <Trophy className="w-3 h-3 text-gray-600" />
              <div className="absolute -bottom-1 w-4 h-2 bg-gray-400 rounded-sm"></div>
            </div>
            <span className="ml-2 font-semibold text-gray-800">#2</span>
          </div>
        );
      case 3:
        return (
          <div className="flex items-center justify-center w-8 h-8">
            <div className="w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center relative">
              <Trophy className="w-3 h-3 text-orange-800" />
              <div className="absolute -bottom-1 w-4 h-2 bg-orange-500 rounded-sm"></div>
            </div>
            <span className="ml-2 font-semibold text-gray-800">#3</span>
          </div>
        );
      default:
        return <span className="font-semibold text-gray-600 w-8">#{rank}</span>;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 w-full h-full flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
            <Trophy className="w-5 h-5 text-yellow-800" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Leaderboard</h3>
            <p className="text-sm text-gray-500">Top 50 Holders</p>
          </div>
        </div>
        
        {/* Tab Switcher */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                activeTab === tab
                  ? "bg-white text-gray-800 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Player List */}
      <div className="space-y-4">
        {players.map((player) => (
          <div key={player.rank} className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              {getRankIcon(player.rank)}
              <span className="text-gray-700 font-medium">{player.name}</span>
            </div>
            <span className="font-semibold text-gray-900">{player.amount}</span>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
        <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <span className="text-sm font-medium text-gray-600">1/10</span>
        <button className="w-10 h-10 rounded-full bg-purple-600 hover:bg-purple-700 flex items-center justify-center transition-colors">
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;