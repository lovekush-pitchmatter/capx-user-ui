import React from "react";
import AngelBal from "../../assets/dashboard/balance.png";
import CurrAngelWorth from "../../assets/dashboard/worth.png";
import NOfRef from "../../assets/dashboard/referral.png";
import Investors from "../../assets/dashboard/investors.png";

const StatsCards = ({ angelBalance, angelWorth, referrals, activeInvestors }) => {
  const statsData = [
    {
      id: 1,
      title: "ANGEL BALANCE",
      value: angelBalance || "0",
      bgColor: "bg-red-100",
      icon: AngelBal
    },
    {
      id: 2,
      title: "CURRENT ANGEL WORTH",
      value: angelWorth || "$0.00",
      bgColor: "bg-green-100",
      icon: CurrAngelWorth
    },
    {
      id: 3,
      title: "NO. OF REFERRALS",
      value: referrals || "0",
      bgColor: "bg-purple-100",
      icon: NOfRef
    },
    {
      id: 4,
      title: "ACTIVE INVESTORS",
      value: activeInvestors || "0",
      bgColor: "bg-yellow-100",
      icon: Investors
    }
  ];

  return (
    <div className="w-full mb-6 ">
      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="flex gap-4 w-full">
          {statsData.map((stat) => (
            <div
              key={stat.id}
              className={`${stat.bgColor} rounded-xl p-4 flex items-center justify-between flex-1`}
            >
              <div className="flex flex-col">
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-gray-600 uppercase">
                  {stat.title}
                </div>
              </div>
              <div className="ml-4">
                <img
                  src={stat.icon}
                  alt={stat.title}
                  className="w-10 h-10 object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile/Tablet Layout */}
      <div className="block lg:hidden">
        <div className="grid grid-cols-2 gap-3 w-full">
          {statsData.map((stat) => (
            <div
              key={stat.id}
              className={`${stat.bgColor} rounded-xl p-4 flex items-center justify-between h-20`}
            >
              <div className="flex flex-col flex-1">
                <div className="text-lg font-bold text-gray-800 mb-1">
                  {stat.value}
                </div>
                <div className="text-xs font-medium text-gray-600 uppercase leading-tight">
                  {stat.title}
                </div>
              </div>
              <div className="ml-2">
                <img
                  src={stat.icon}
                  alt={stat.title}
                  className="w-10 h-10 lg:w-12 lg:h-12 object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsCards;