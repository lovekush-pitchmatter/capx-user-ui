import React, { useState } from "react";
import { Globe, LockKeyholeOpen , ChevronLeft, ChevronRight } from "lucide-react";

const LoginActivity = ({ loginActivity }) => {
  const [activeTab, setActiveTab] = useState("Activity");
  const [page, setPage] = useState(1);
  const pageSize = 6;

  // Function to format ISO date string to human readable format
  const formatDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);

    // Format date as YYYY-MM-DD HH:MM:SS
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  // Pagination logic
  const activities = loginActivity?.login_activity || [];
  const totalPages = Math.ceil(activities.length / pageSize);
  const paginatedActivities = activities.slice((page - 1) * pageSize, page * pageSize);

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
        {activities.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <LockKeyholeOpen  className="text-purple-600" size={40} />
            <div className="mt-4 text-lg font-semibold text-gray-700">No login activity yet</div>
            <div className="text-sm text-gray-500 mt-1">Your recent login activity will appear here.</div>
          </div>
        ) : (
          paginatedActivities.map((login, idx) => (
            <div key={idx} className="flex items-center justify-between py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Globe className="text-purple-600" size={20} />
                </div>
                <div>
                  <p className="font-medium text-gray-700 capitalize">{login.devicetype}</p>
                  <p className="text-sm text-gray-500">{login.location}</p>
                </div>
              </div>
              <div className="text-right text-sm text-gray-500">
                <p>{login.ipaddress}</p>
                <p>{formatDate(login.last_login)}</p>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Pagination controls */}
      {activities.length > 0 && totalPages > 1 && (
        <div className="flex justify-end items-center mt-4 gap-2 text-sm">
          <button
            className="px-2 py-1 rounded hover:bg-gray-100 flex items-center"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            <ChevronLeft size={18} />
          </button>
          {Array.from({ length: totalPages }).map((_, i) => {
            // Show first, last, current, and neighbors; collapse others with ...
            if (
              i === 0 ||
              i === totalPages - 1 ||
              Math.abs(i + 1 - page) <= 1
            ) {
              return (
                <button
                  key={i}
                  className={`px-2 py-1 rounded ${page === i + 1 ? "bg-purple-100 text-purple-700 font-bold" : "hover:bg-gray-100"}`}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </button>
              );
            }
            if (
              (i === 1 && page > 3) ||
              (i === totalPages - 2 && page < totalPages - 2)
            ) {
              return (
                <span key={i} className="px-2 py-1">...</span>
              );
            }
            return null;
          })}
          <button
            className="px-2 py-1 rounded hover:bg-gray-100 flex items-center"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default LoginActivity;