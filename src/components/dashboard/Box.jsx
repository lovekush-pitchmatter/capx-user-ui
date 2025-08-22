import React from "react";
import { PiCoins, PiCurrencyDollarBold } from "react-icons/pi";
import { HiOutlineCircleStack } from "react-icons/hi2";
import { GoPeople } from "react-icons/go";
//images
import CAPXICON from "../../assets/dashboard/capx-owned.png";
import INVESTED from "../../assets/dashboard/invested.png";
import REFER from "../../assets/dashboard/referral-earnings.png";
import CURRCAPXICON from "../../assets/dashboard/current-capx-worth.png";

const currency = (n = 0) =>
  Number(parseFloat(n || 0)).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const number = (n = 0) =>
  Number(parseFloat(n || 0)).toLocaleString("en-US", {
    maximumFractionDigits: 2,
  });

const Box = ({ user = {}, dashboard = {} }) => {
  const statsData = [
    {
      key: "invested",
      title: "INVESTED",
      value: currency(dashboard?.investedAmount ?? user?.wallet_amount ?? 0),
      unit: "USD",
      icon: <img src={INVESTED} alt="Invested-icon" className="w-8 h-8" />,
    },
    {
      key: "capx",
      title: "CAPX OWNED",
      value: number(user?.user_vested_tokens ?? 0),
      unit: "",
      icon: <img src={CAPXICON} alt="Capx-icon" className="w-8 h-8" />,
    },
    {
      key: "capxWorth",
      title: "CURRENT CAPX WORTH",
      value: currency(dashboard?.totalAssets ?? 0),
      unit: "USD",
      icon: <img src={CURRCAPXICON} alt="Curr-Capx-icon" className="w-8 h-8" />,
    },
    {
      key: "referralEarnings",
      title: "REFERRAL EARNINGS",
      value: currency(dashboard?.referralEarnings ?? 0),
      unit: "USD",
      icon: <img src={REFER} alt="Referral-icon" className="w-8 h-8" />,
    },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 w-full">
        {statsData.map((item) => (
          <div
            key={item.key}
            className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-2xl shadow-sm p-2"
          >
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full flex-shrink-0">
                {item.icon}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                  {/* tracking wider */}
                  {item.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {item.unit === "USD" ? "$" : ""}{item.value}
                  {item.unit && item.unit !== "USD" ? ` ${item.unit}` : ""}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Box;