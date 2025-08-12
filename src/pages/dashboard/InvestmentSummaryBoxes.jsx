import React from "react";
import { PiCurrencyDollarBold, PiVault, PiUser, PiUsersThree } from "react-icons/pi"; // Using Phosphor Icons for variety

const InvestmentSummaryBoxes = ({ user, dashboard }) => {
  const statsData = [
    {
      title: "INVESTED",
      value: user?.invested_amount || 10000, // Placeholder
      unit: "$",
      icon: PiCurrencyDollarBold,
      color: "bg-purple-100",
    },
    {
      title: "CAPX OWNED",
      value: user?.user_vested_tokens || 10000,
      unit: "",
      icon: PiVault,
      color: "bg-purple-100",
    },
    {
      title: "CURRENT CAPX WORTH",
      value: dashboard?.currentCapxWorth || 25000, // Placeholder
      unit: "$",
      icon: PiUser,
      color: "bg-purple-100",
    },
    {
      title: "REFERRAL EARNINGS",
      value: dashboard?.referralEarnings || 1200, // Placeholder
      unit: "$",
      icon: PiUsersThree,
      color: "bg-purple-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statsData.map((item, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-xl shadow-md flex flex-col items-start justify-between h-32"
        >
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-lg ${item.color}`}>
              <item.icon size={24} className="text-purple-700" />
            </div>
            <h4 className="text-xs font-semibold text-gray-600">{item.title}</h4>
          </div>
          <p className="text-2xl font-bold text-gray-800 mt-2">
            {item.unit}
            {parseFloat(item.value || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
      ))}
    </div>
  );
};

export default InvestmentSummaryBoxes;
