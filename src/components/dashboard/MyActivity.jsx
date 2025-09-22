import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrowUp, ArrowDown, ChevronLeft, ChevronRight } from "lucide-react";
import { fetchActivity } from "../../store/slices/rewardsHubSlice";
import noRecords from "../../assets/no-records.jpg";

// Simple version without memo to avoid potential circular references
const MyActivity = ({ userActivity = {}}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("today"); // Add filter state
  const itemsPerPage = 10;
  
  // Format number to always show 2 decimal places
  const formatNumber = (num) => {
    if (typeof num === 'number') {
      return num.toFixed(2);
    } else if (typeof num === 'string' && !isNaN(parseFloat(num))) {
      return parseFloat(num).toFixed(2);
    }
    return num;
  };
  

  // Helper to filter activities by period
  const filterActivities = (activities, period) => {
    if (!activities) return [];
    const now = new Date();
    return activities.filter(a => {
      const activityDate = new Date(a.date);
      if (period === "today") {
        return activityDate.toDateString() === now.toDateString();
      }
      if (period === "weekly") {
        const weekAgo = new Date();
        weekAgo.setDate(now.getDate() - 7);
        return activityDate >= weekAgo && activityDate <= now;
      }
      if (period === "monthly") {
        const monthAgo = new Date();
        monthAgo.setMonth(now.getMonth() - 1);
        return activityDate >= monthAgo && activityDate <= now;
      }
      return true;
    });
  };

  // Filtered activities
  const filteredActivities = filterActivities(userActivity?.user_activities, filter);

  // Calculate total pages
  const totalItems = filteredActivities.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredActivities.slice(indexOfFirstItem, indexOfLastItem) || [];
  
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  // Reset to first page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 w-full h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-gray-800">My Activity</h2>
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            className={`px-3 py-1 text-xs font-medium rounded-md ${filter === "today" ? "bg-white shadow-sm text-gray-800" : "text-gray-500"}`}
            onClick={() => setFilter("today")}
          >
            Today
          </button>
          <button
            className={`px-3 py-1 text-xs font-medium rounded-md ${filter === "weekly" ? "bg-white shadow-sm text-gray-800" : "text-gray-500"}`}
            onClick={() => setFilter("weekly")}
          >
            Weekly
          </button>
          <button
            className={`px-3 py-1 text-xs font-medium rounded-md ${filter === "monthly" ? "bg-white shadow-sm text-gray-800" : "text-gray-500"}`}
            onClick={() => setFilter("monthly")}
          >
            Monthly
          </button>
        </div>
      </div>

      {currentItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <img src={noRecords} alt="No records" className="w-32 h-32 mb-4 object-contain" />
          <p className="text-lg font-semibold text-gray-500">No records found</p>
        </div>
      ) : (
        <div className="space-y-4 mb-4">
          {currentItems.map((a, i) => (
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
                  <p className="text-[11px] text-gray-500">{a.date}</p>
                </div>
              </div>
              {/* Column 2: Amount */}
              <div className="w-1/3 text-center">
                <p className="text-sm font-semibold text-gray-900">
                  {a.type.toLowerCase().includes("withdraw") ? "-" : "+"}{formatNumber(a.amount)}
                </p>
                <p className="text-[11px] text-gray-500 uppercase">{a.coin_type}</p>
              </div>
              {/* Column 3: Status */}
              <div className="w-1/3 text-right">
                <p className={`text-[11px] font-semibold ${
                  a.txnstatus.toLowerCase() === 'completed' 
                    ? 'text-green-600' 
                    : a.txnstatus.toLowerCase() === 'pending' 
                      ? 'text-yellow-600' 
                      : 'text-red-600'
                }`}>{a.txnstatus.toUpperCase()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-6 pt-4 border-t border-gray-100">
          <button 
            onClick={prevPage} 
            disabled={currentPage === 1}
            className={`p-1 rounded-md ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            <ChevronLeft size={16} />
          </button>
          
          <div className="flex space-x-1">
            {[...Array(totalPages).keys()].map(number => (
              <button
                key={number + 1}
                onClick={() => paginate(number + 1)}
                className={`w-8 h-8 rounded-md ${
                  currentPage === number + 1 
                    ? 'bg-purple-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {number + 1}
              </button>
            ))}
          </div>
          
          <button 
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`p-1 rounded-md ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default MyActivity;