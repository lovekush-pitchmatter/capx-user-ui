import React, { useState } from "react";
import { Globe } from "lucide-react";

const LoginActivity = () => {
  const [activeTab, setActiveTab] = useState("Activity");

  const logins = [
    {
      platform: "Web",
      address: "789, Trade Tower, Nariman Point, Mumbai, Maharashtra 400021, India",
      ip: "88.102.34.199",
      time: "2019-11-11 22:59:05",
    },
    {
      platform: "Web",
      address: "321, Tech Park, Powai, Mumbai, Maharashtra 400076, India",
      ip: "176.58.92.33",
      time: "2019-11-11 22:59:05",
    },
    {
      platform: "Web",
      address: "987, Commerce Hub, Malad West, Mumbai, Maharashtra 400064, India",
      ip: "88.102.34.199",
      time: "2019-11-11 22:59:05",
    },
    {
      platform: "Web",
      address: "741, Business Plaza, Vashi, Navi Mumbai, Maharashtra 400703, India",
      ip: "88.102.34.199",
      time: "2019-11-11 22:59:05",
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 w-full h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Login Activity</h3>

        <div className="flex bg-gray-100 rounded-lg p-1 text-sm">
          {["Activity", "Devices"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1 rounded-md transition ${
                activeTab === tab
                  ? "bg-white shadow text-gray-800"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {logins.map((login, idx) => (
          <div key={idx} className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <Globe className="text-purple-600" size={20} />
              </div>
              <div>
                <p className="font-medium text-gray-700">{login.platform}</p>
                <p className="text-sm text-gray-500">{login.address}</p>
              </div>
            </div>
            <div className="text-right text-sm text-gray-500">
              <p>{login.ip}</p>
              <p>{login.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoginActivity;