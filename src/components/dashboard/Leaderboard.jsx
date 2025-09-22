import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import trophy from "../../assets/rewards/leaderboard.png";
import trophy_one from "../../assets/rewards/first.png";
import trophy_two from "../../assets/rewards/second.png";
import trophy_three from "../../assets/rewards/third.png";

const Leaderboard = ({ capxLeaderBoard = [] }) => {
  const [activeTab, setActiveTab] = useState("Daily");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Show 5 items per page
  
  // Format amounts to show proper currency format with 2 decimals
  const formatAmount = (amount) => {
    return `$${parseFloat(amount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };
  
  // Calculate pagination info
  const totalItems = capxLeaderBoard?.data?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Get current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = capxLeaderBoard?.data?.slice(indexOfFirstItem, indexOfLastItem) || [];
  
  // Handle page navigation
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const tabs = ["Daily", "All Time"];

  const getRankIcon = (rank) => {
    switch(rank) {
      case 1:
        return (
          <div className="flex items-center justify-center capx-box">
            <div className="rounded-full flex items-center justify-center relative trophy-img">
              <img src={trophy_one} alt="Trophy" className="trophy-img" />
            </div>
            <span className="ml-2 font-semibold text-gray-800">#1</span>
          </div>
        );
      case 2:
        return (
          <div className="flex items-center justify-center capx-box">
            <div className="rounded-full flex items-center justify-center relative trophy-img">
              <img src={trophy_two} alt="Trophy" className="trophy-img" />
            </div>
            <span className="ml-2 font-semibold text-gray-800">#2</span>
          </div>
        );
      case 3:
        return (
          <div className="flex items-center justify-center capx-box">
            <div className="rounded-full flex items-center justify-center relative trophy-img">
              <img src={trophy_three} alt="Trophy" className="trophy-img" />
            </div>
            <span className="ml-2 font-semibold text-gray-800">#3</span>
          </div>
        );
      default:
        return <span className="font-semibold text-gray-600 w-8 ml-8">#{rank}</span>;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 w-full h-full flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
            <img src={trophy} alt="Trophy" className="w-6 h-6 text-yellow-800" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Leaderboard</h3>
            <p className="text-sm text-gray-500">Top 50 Holders</p>
          </div>
        </div>
        
        {/* Tab Switcher */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                activeTab === tab
                  ? "bg-white text-gray-800 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Player List */}
      <div className="space-y-0">
        {currentItems.length > 0 ? (
          currentItems.map((player, idx) => (
            <React.Fragment key={player.rank}>
              <div className="flex items-center justify-between py-1.5">
                <div className="flex items-center gap-3">
                  {getRankIcon(player.rank)}
                  <span className="text-gray-700 font-medium lowercase">{player.username}</span>
                </div>
                <span className="font-semibold text-gray-900">{formatAmount(player.usdamount)}</span>
              </div>
              {/* Bottom line except for last item */}
              {idx < currentItems.length - 1 && (
                <div className="border-b border-gray-100 mx-0"></div>
              )}
            </React.Fragment>
          ))
        ) : (
          <div className="text-center py-10 text-gray-500">No leaderboard data available</div>
        )}
      </div>

      {/* Pagination */}
      {totalItems > 0 && (
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
          <button 
            className={`w-10 h-10 rounded-full ${currentPage === 1 ? 'bg-gray-100 cursor-not-allowed' : 'bg-gray-100 hover:bg-gray-200 cursor-pointer'} flex items-center justify-center transition-colors`}
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <span className="text-sm font-medium text-gray-600">{currentPage}/{totalPages}</span>
          <button 
            className={`w-10 h-10 rounded-full ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700 cursor-pointer'} flex items-center justify-center transition-colors`}
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className={`w-5 h-5 ${currentPage === totalPages ? 'text-gray-600' : 'text-white'}`} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;