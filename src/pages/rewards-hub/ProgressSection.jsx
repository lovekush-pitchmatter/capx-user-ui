import { Coins, Trophy } from "lucide-react";
import { useState } from "react";
import dailyEarned from "../../assets/images/earned.png";
import currentWeek from "../../assets/images/week.png";

const ProgressSection = () => {
  const [activeTab, setActiveTab] = useState("daily");

  const achieversData = {
      daily: [
        { rank: 1, name: "lovekushdemo", amount: "10", icon: "🥇" },
      ],
      allTime: [
        { rank: 1, name: "lovekushdemo", amount: "10", icon: "🥇" },
      ],
    };

  return (
    <div className="">
      <h2 className="text-center text-2xl font-bold mb-6">Your Progress</h2>

      {/* Top Row Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Total Earned */}
        <div className="flex flex-col items-center justify-center border rounded-lg p-6">
          <div className="">
            <img src={dailyEarned} alt="Daily Earned" className="w-15 h-15" />
          </div>
          <p className="text-gray-600 font-semibold mt-2">Total Earned</p>
          <h3 className="text-2xl font-bold">0.00</h3>
          <span className="text-sm text-gray-500">ANGEL</span>
        </div>

        {/* This Week */}
        <div className="flex flex-col items-center justify-center border rounded-lg p-6">
          <div className="">
            <img src={currentWeek} alt="Current Week" className="w-15 h-15" />
          </div>
          <p className="text-gray-600 mt-2 font-semibold">This Week</p>
          <h3 className="text-2xl font-bold">0 tasks</h3>
          <span className="text-sm text-gray-500">+0.00 ANGEL</span>
        </div>

        {/* Top Achievers */}
        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-center border-b pb-2 mb-3">
            <p className="font-semibold">Top Achievers</p>
            <div className="flex gap-2 bg-gray-200 p-1 rounded-md">
              <button
                onClick={() => setActiveTab("daily")}
                className={`px-2 py-1 text-sm rounded ${
                  activeTab === "daily"
                    ? "bg-white text-black"
                    : " text-black"
                }`}
              >
                Daily
              </button>
              <button
                onClick={() => setActiveTab("allTime")}
                className={`px-2 py-1 text-sm rounded ${
                  activeTab === "allTime"
                    ? "bg-white text-black"
                    : " text-black"
                }`}
              >
                All Time
              </button>            
            </div>
          </div>

            <ul className="space-y-5">
              {achieversData[activeTab].map((a) => (
                <li
                  key={a.rank}
                  className="flex justify-between items-center text-sm"
                >
                  <span>
                    {a.icon} {a.name}
                  </span>
                  <span className="text-gray-600">
                    {a.amount} <span className="text-purple-600">ANGEL</span>
                  </span>
                </li>
              ))}
            </ul>        
          </div>
      </div>
    </div>  
  )
}

export default ProgressSection