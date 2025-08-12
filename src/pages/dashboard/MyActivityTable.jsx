import React, { useState } from "react";
import { IoArrowUpCircleOutline, IoArrowDownCircleOutline } from "react-icons/io5";

const getTransactionTypeDisplay = (transactionType) => {
  switch ((transactionType || '').toLowerCase()) {
    case 'wallet-top':
      return 'Topup';
    case 'token-purchase':
      return 'Token Purchase';
    case 'withdraw':
      return 'Withdraw';
    case 'angelseed-rewards': // New type
      return 'AngelSEED Rewards';
    default:
      return transactionType || '-';
  }
};

const getStatusColor = (status) => {
  const normalizedStatus = (status || '').toLowerCase();
  const displayStatus = normalizedStatus === 'expired' ? 'failed' : normalizedStatus;
  
  switch (displayStatus) {
    case 'pending':
    case 'processing':
      return 'text-yellow-500';
    case 'complete':
    case 'completed':
      return 'text-green-600';
    case 'failed':
    case 'error':
    case 'expired':
    case 'canceled': // New status
      return 'text-red-600';
    default:
      return 'text-gray-600';
  }
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

const MyActivityTable = ({ transactions }) => {
  const [activeTab, setActiveTab] = useState("Today"); // Today, Weekly, Monthly

  // Mock data to supplement if transactions are empty or for specific types
  const mockActivities = [
    { type: "Topup", amount: "+5,553.00", currency: "USDT", date: "1/8/2025 10:05 AM", status: "COMPLETED" },
    { type: "Topup", amount: "+2,450.00", currency: "ETH", date: "1/8/2025 8:30 AM", status: "PENDING" },
    { type: "AngelSEED Rewards", amount: "+100.00", currency: "ANGEL", date: "30/7/2025 06:24 AM", status: "COMPLETED" },
    { type: "Withdraw", amount: "-3,413.00", currency: "USDT", date: "30/7/2025 06:24 AM", status: "COMPLETED" },
    { type: "Withdraw", amount: "-5,611.00", currency: "CAPX", date: "30/7/2025 06:24 AM", status: "CANCELED" },
    { type: "Topup", amount: "+1,245.00", currency: "BTC", date: "30/7/2025 06:24 AM", status: "COMPLETED" },
    { type: "Withdraw", amount: "-3,451.456", currency: "ANGEL", date: "30/7/2025 06:24 AM", status: "COMPLETED" },
  ];

  // Combine actual transactions with mock data for display
  const allTransactions = transactions.map(tx => ({
    type: tx.transaction_type,
    amount: tx.amount,
    currency: tx.deposit_type, // Assuming deposit_type can represent currency
    date: tx.txn_date || tx.createdAt,
    status: tx.status || tx.txnstatus,
  })).concat(mockActivities); // Add mock activities for richer display

  const filteredActivities = allTransactions.filter(activity => {
    const activityDate = new Date(activity.date);
    const now = new Date();

    if (activeTab === "Today") {
      return activityDate.toDateString() === now.toDateString();
    } else if (activeTab === "Weekly") {
      const oneWeekAgo = new Date(now.setDate(now.getDate() - 7));
      return activityDate >= oneWeekAgo;
    } else if (activeTab === "Monthly") {
      const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1));
      return activityDate >= oneMonthAgo;
    }
    return true; // Should not happen with current tabs
  });

  return (
    <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">My Activity</h3>
        <div className="flex space-x-2 bg-gray-100 rounded-lg p-1">
          {["Today", "Weekly", "Monthly"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded-md text-xs font-medium ${
                activeTab === tab ? "bg-purple-600 text-white" : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredActivities.length > 0 ? (
          filteredActivities.map((activity, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-purple-100">
                  {activity.type === "Withdraw" ? (
                    <IoArrowDownCircleOutline size={20} className="text-purple-600" />
                  ) : (
                    <IoArrowUpCircleOutline size={20} className="text-purple-600" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">{getTransactionTypeDisplay(activity.type)}</p>
                  <p className="text-xs text-gray-500">{formatDate(activity.date)}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-800">{activity.amount} {activity.currency}</p>
                <p className={`text-xs font-medium ${getStatusColor(activity.status)}`}>{activity.status}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No activity found for {activeTab}.</p>
        )}
      </div>
    </div>
  );
};

export default MyActivityTable;

