import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";

const MyActivity = () => {
  const activities = [
    { type: "Topup", amount: "+5,553.00", unit: "USDT", status: "COMPLETED", color: "text-green-600" },
    { type: "Topup", amount: "+2.45", unit: "ETH", status: "PENDING", color: "text-yellow-600" },
    { type: "AngelSEED Rewards", amount: "+100.00", unit: "ANGEL", status: "COMPLETED", color: "text-green-600" },
    { type: "Withdraw", amount: "-3,413.00", unit: "USDT", status: "COMPLETED", color: "text-green-600" },
    { type: "Withdraw", amount: "-5,611.00", unit: "CAPX", status: "CANCELED", color: "text-red-600" },
    { type: "Topup", amount: "+1,245.00", unit: "BTC", status: "COMPLETED", color: "text-green-600" },
    { type: "Withdraw", amount: "-3,451.456", unit: "ANGEL", status: "COMPLETED", color: "text-green-600" },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 w-full h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-gray-800">My Activity</h2>
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button className="px-3 py-1 text-xs font-medium rounded-md bg-white shadow-sm text-gray-800">Today</button>
          <button className="px-3 py-1 text-xs font-medium text-gray-500">Weekly</button>
          <button className="px-3 py-1 text-xs font-medium text-gray-500">Monthly</button>
        </div>
      </div>

      <div className="space-y-4">
        {activities.map((a, i) => (
          <div key={i} className="flex items-center justify-between">
            {/* Column 1: Icon placeholder + text */}
            <div className="flex items-center gap-3 w-1/3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-100">
                {a.type.toLowerCase().includes("withdraw") ? (
                  <ArrowDown className="w-5 h-5 text-purple-600" />
                ) : (
                  <ArrowUp className="w-5 h-5 text-purple-600" />
                )}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">{a.type}</p>
                <p className="text-[11px] text-gray-500">30/7/2025 06:24 AM</p>
              </div>
            </div>
            {/* Column 2: Amount */}
            <div className="w-1/3 text-center">
              <p className="text-sm font-semibold text-gray-900">{a.amount}</p>
              <p className="text-[11px] text-gray-500">{a.unit}</p>
            </div>
            {/* Column 3: Status */}
            <div className="w-1/3 text-right">
              <p className={`text-[11px] font-semibold ${a.color}`}>{a.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyActivity;