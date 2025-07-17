import React from "react";
import { GoPeople } from "react-icons/go";
import { HiOutlineCircleStack } from "react-icons/hi2";
import { PiCoins, PiCurrencyDollarBold } from "react-icons/pi";

const Box = ({ user, dashboard }) => {
  console.log(user);
  const statsData = [
    {
      title: "Total Earings",
      value: user.wallet_amount,
      unit: "$",
      icon: <PiCoins size={24} />,
      bg: "text-purple-800 bg-purple-200",
    },
    {
      title: "Capx Balance",
      value: user.user_vested_tokens,
      unit: "",
      icon: <PiCurrencyDollarBold size={24} />,
      bg: "text-blue-800 bg-blue-200",
    },
    {
      title: "AngelSEED Balance",
      value: dashboard.totalAssets,
      unit: "$",
      icon: <HiOutlineCircleStack size={24} />,
      bg: "text-yellow-800 bg-yellow-200",
    },
    {
      title: "No. of Referrals",
      value: 0,
      unit: "",
      icon: <GoPeople size={24} />,
      bg: "text-green-800 bg-green-200",
    },
  ];

  //dashboard.totalDirectReferral

  return (
    <div className="bg-white shadow-lg dark:bg-zinc-900 p-4 rounded-xl w-full">
      <div className="relative mb-4 overflow-hidden bg-white dark:bg-zinc-900 dark:text-white  w-full border border-[#DA68FFBF]  py-4  px-4 rounded-xl flex flex-col md:items-start items-center max-md:justify-center shadow-md shadow-[#B500EF47]  gap-2">
  

        <div
          className={`flex max-sm:text-xl items-center gap-2 p-2 text-purple-800 bg-purple-200 rounded-full z-20  `}
        >
        <PiCoins size={28} />
        </div>
        <p className="text-3xl leading-none flex gap-2 items-center flex-wrap   font-semibold  z-20">
               $ {user.user_total_tokens_unlocked}
        
        </p>
        <p className="text-xs font-medium text-zinc-500">Estimated Balance</p>
      </div>

      <div className="grid grid-cols-2 items-center justify-center gap-4 w-full ">
        {statsData.map((item, index) => (
          <div
            key={index}
            className="relative overflow-hidden bg-white dark:bg-zinc-900 dark:text-white  w-full border border-[#DA68FFBF]  py-4  px-4 rounded-xl flex flex-col md:items-start items-center max-md:justify-center shadow-md shadow-[#B500EF47]  gap-2"
          >
            <div
              className={`flex max-sm:text-xl items-center gap-2 p-1 rounded-full z-20 ${item.bg}`}
            >
              {item.icon}
            </div>
            <p className="text-2xl leading-none flex gap-2 items-center flex-wrap   font-semibold  z-20">
              {item.unit && <span>{item.unit}</span>}
              {item.value}
            </p>
            <p className="text-xs font-medium text-zinc-500">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Box;
