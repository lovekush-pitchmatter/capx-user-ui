import React from "react";
import { PiWallet, PiCurrencyDollar, PiUsers, PiChartLineUp } from "react-icons/pi"; // Using Phosphor Icons

const BalanceSummaryBoxes = () => {
  const balanceData = [
    {
      title: "ANGEL BALANCE",
      value: 14300.56789,
      icon: PiWallet,
      color: "bg-red-100",
      textColor: "text-red-700",
    },
    {
      title: "CURRENT ANGEL WORTH",
      value: 1.44,
      unit: "$",
      icon: PiCurrencyDollar,
      color: "bg-green-100",
      textColor: "text-green-700",
    },
    {
      title: "NO. OF REFERRALS",
      value: 182,
      icon: PiUsers,
      color: "bg-purple-100",
      textColor: "text-purple-700",
    },
    {
      title: "ACTIVE INVESTORS",
      value: 50,
      icon: PiChartLineUp,
      color: "bg-yellow-100",
      textColor: "text-yellow-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {balanceData.map((item, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-xl shadow-md flex flex-col items-start justify-between h-32"
        >
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-lg ${item.color}`}>
              <item.icon size={24} className={item.textColor} />
            </div>
            <h4 className="text-xs font-semibold text-gray-600">{item.title}</h4>
          </div>
          <p className="text-2xl font-bold text-gray-800 mt-2">
            {item.unit}
            {parseFloat(item.value || 0).toLocaleString('en-US', { minimumFractionDigits: item.unit === "$" ? 2 : 0, maximumFractionDigits: item.unit === "$" ? 2 : 5 })}
          </p>
        </div>
      ))}
    </div>
  );
};

export default BalanceSummaryBoxes;
