import React from "react";
import { GoPeople } from "react-icons/go";
import { HiOutlineCircleStack } from "react-icons/hi2";
import { PiCoins, PiCurrencyDollarBold } from "react-icons/pi";

const Box = ({ user, dashboard }) => {
  const statsData = [
    {
      title: "Wallet Amount",
      value: user.wallet_amount,
      unit: "USD",
      icon: <PiCoins size={24} />,
      color: "bg-pink-100 dark:bg-pink-100/30",
    },
    {
      title: "Total Capx Token",
      value: user.user_vested_tokens,
      unit: "CAPX",
      icon: <PiCurrencyDollarBold size={24} />,
      color: "bg-yellow-100 dark:bg-yellow-100/30",
    },
    {
      title: "Total Asset Value",
      value: dashboard.totalAssets,
      unit: "USD",
      icon: <HiOutlineCircleStack size={24} />,
      color: "bg-purple-100 dark:bg-purple-100/30",
    },
    {
      title: "Total Direct Referrals",
      value: 0,
      unit: "",
      icon: <GoPeople size={24} />,
      color: "bg-red-100 dark:bg-red-100/30",
    },
  ];

  //dashboard.totalDirectReferral

  return (
    
      <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-center gap-4 w-full ">
        {statsData.map((item, index) => (
          <div
            key={index}
            className="relative overflow-hidden bg-white dark:bg-zinc-900 dark:text-white  w-full h-[150px] p-4 rounded-xl flex flex-col md:items-start items-center max-md:justify-center shadow-lg  gap-2"
          >
            <div className="flex max-sm:text-xl items-center gap-2 z-20">
              {item.icon}
              <h4 className="font-medium   z-20">{item.title}</h4>
            </div>
            <p className="text-2xl max-sm:text-3xl leading-none flex gap-2 items-center flex-wrap mt-2 md:mt-4 font-semibold  z-20">
              {item.value} 
              {item.unit && <span className="text-base">{item.unit}</span>}
            </p>
            <div
              className={`absolute -top-16 -left-8 h-28 w-28 -z-0 rounded-full ${item.color}`}
            ></div>
            <div
              className={`absolute -bottom-28 -right-10 h-40 w-40  -z-0 rounded-full ${item.color}`}
            ></div>
          </div>
        ))}
      </div>
     
  );
};

export default Box;
