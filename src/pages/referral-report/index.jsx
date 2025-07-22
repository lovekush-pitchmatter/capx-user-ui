import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../../components/layout/Layout";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { referralReport } from "../../store/slices/transactionSlice";

const statuses = ["completed", "pending", "failed"];

const getStatusClass = (status) => {
  switch (status) {
    case "completed":
      return "text-green-600";
    case "pending":
      return "text-yellow-500";
    case "failed":
      return "text-red-600";
    default:
      return "";
  }
};

const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const ReferralReport = () => {
  const dispatch = useDispatch();
  const { referralHistory = [], loading = false, error = null } = useSelector((state) => state.transaction);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [dateRange, setDateRange] = useState([null, null]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const dateInputRef = useRef(null);
  const [startDate, endDate] = dateRange;

  useEffect(() => {
    dispatch(referralReport());
  }, [dispatch]);

  const filteredData = (referralHistory || []).filter((item) => {
    const matchesSearch =
      (item.fullname?.toLowerCase().includes(search.toLowerCase()) ||
      item.username?.toLowerCase().includes(search.toLowerCase()) ||
      item.email?.toLowerCase().includes(search.toLowerCase()) ||
      item.mobileno?.includes(search)) ?? false;
    
    const matchesStatus = statusFilter === "" ? true : 
      statusFilter === "completed" ? item.is_token_purchased === true : 
      statusFilter === "pending" ? item.is_token_purchased === false : true;
    
    const itemDate = new Date(item.createdAt);
    const matchesDate =
      (!startDate || itemDate >= new Date(startDate.setHours(0, 0, 0, 0))) &&
      (!endDate || itemDate <= new Date(endDate.setHours(23, 59, 59, 999)));
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
 
  const dateRangeDisplay =
    startDate && endDate
      ? `${formatDate(startDate)} - ${formatDate(endDate)}`
      : "Select Date Range";

  return (
    <Layout>
      <div className="bg-white dark:bg-zinc-900 mx-auto rounded-xl w-full overflow-hidden">
        <h2 className="text-2xl text-start dark:text-white font-semibold mb-6">
          Referral Report
        </h2>
        <div className="flex flex-wrap items-center gap-4 bg-[#f6f1ff] border border-[#cfc1f7] rounded-xl px-4 py-3 mb-4 relative overflow-visible">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-[#000]">Show</span>
            <div className="relative">
              <select
                className="border rounded px-2 py-1 text-sm appearance-none pr-6"
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                {[10, 20, 30, 50].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
              <svg
                className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2"
                width="12"
                height="7"
                viewBox="0 0 12 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1.5L6 6L11 1.5"
                  stroke="#292D32"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <div className="relative flex items-center" style={{ zIndex: 1000 }}>
            <input
              ref={dateInputRef}
              type="text"
              className="border rounded px-2 py-1 text-sm pr-8 min-w-[180px] cursor-pointer bg-white"
              placeholder="Select Date Range"
              value={dateRangeDisplay}
              readOnly
              onClick={() => setShowDatePicker((v) => !v)}
            />
            <svg
              className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
              width="18"
              height="17"
              viewBox="0 0 18 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => setShowDatePicker((v) => !v)}
            >
              <path
                d="M6.16797 1.41675V3.54175"
                stroke="#292D32"
                strokeWidth="1.0625"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.832 1.41675V3.54175"
                stroke="#292D32"
                strokeWidth="1.0625"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15.375 6.02091V12.0417C15.375 14.1667 14.3125 15.5834 11.8333 15.5834H6.16667C3.6875 15.5834 2.625 14.1667 2.625 12.0417V6.02091C2.625 3.89591 3.6875 2.47925 6.16667 2.47925H11.8333C14.3125 2.47925 15.375 3.89591 15.375 6.02091Z"
                stroke="#292D32"
                strokeWidth="1.0625"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.45703 7.79175H9.70703"
                stroke="#292D32"
                strokeWidth="1.0625"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.45703 11.3333H7.31286"
                stroke="#292D32"
                strokeWidth="1.0625"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {showDatePicker && (
              <div className="absolute z-[9999] top-full mt-1 left-0 bg-white shadow-2xl rounded-lg border-2 border-gray-200" style={{ zIndex: 9999 }}>
                <DatePicker
                  selected={startDate}
                  onChange={(update) => {
                    setDateRange(update);
                    if (update[0] && update[1]) {
                      setShowDatePicker(false);
                      setCurrentPage(1);
                    }
                  }}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  inline
                  maxDate={new Date()}
                />
                <div className="p-3 border-t border-gray-200 flex gap-2 justify-end bg-gray-50 rounded-b-lg">
                  <button
                    onClick={() => {
                      setDateRange([null, null]);
                      setShowDatePicker(false);
                      setCurrentPage(1);
                    }}
                    className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                  >
                    Clear
                  </button>
                  <button
                    onClick={() => setShowDatePicker(false)}
                    className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="relative">
            <select
              className="border rounded px-2 py-1 text-sm appearance-none pr-6"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">All Status</option>
              <option value="completed">Active</option>
              <option value="pending">Pending</option>
            </select>
            <svg
              className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2"
              width="12"
              height="7"
              viewBox="0 0 12 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1.5L6 6L11 1.5"
                stroke="#292D32"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="flex-1" />
          <div className="relative w-56">
            <input
              type="text"
              className="border rounded px-2 py-1 text-sm w-full pl-8"
              placeholder="Search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
            <svg
              className="absolute left-2 top-1/2 -translate-y-1/2"
              width="16"
              height="15"
              viewBox="0 0 16 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.6875 13.125C10.9667 13.125 13.625 10.4667 13.625 7.1875C13.625 3.90831 10.9667 1.25 7.6875 1.25C4.40831 1.25 1.75 3.90831 1.75 7.1875C1.75 10.4667 4.40831 13.125 7.6875 13.125Z"
                stroke="#292D32"
                strokeWidth="0.9375"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.25 13.75L13 12.5"
                stroke="#292D32"
                strokeWidth="0.9375"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <div className="overflow-x-auto border-2 border-gray-100 dark:border-zinc-800 rounded-t-xl max-w-[89vw] mx-auto min-h-[400px]">
          <table className="w-full text-left text-sm sm:text-base border-collapse">
            <thead className="bg-[#F6EEFE] text-purple-500 whitespace-nowrap font-medium text-sm">
              <tr>
                <th className="p-4 whitespace-nowrap">Joining Date</th>
                <th className="p-4 whitespace-nowrap">Name</th>
                <th className="p-4 whitespace-nowrap">Username</th>
                <th className="p-4 whitespace-nowrap">Email ID</th>
                <th className="p-4 whitespace-nowrap">Country</th>
                <th className="p-4 whitespace-nowrap">Joining Date</th>
                <th className="p-4 whitespace-nowrap">Level</th>
                <th className="p-4 whitespace-nowrap">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="text-center p-4">
                    Loading...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="8" className="text-center p-4 text-red-500">
                    Error: {error}
                  </td>
                </tr>
              ) : paginatedData.length > 0 ? (
                paginatedData.map((item) => (
                  <tr
                    key={item._id}
                    className="border-t dark:bg-gray-200 dark:border-zinc-800 hover:bg-gray-50 transition-all"
                  >
                    <td className="p-2 sm:p-4">
                      {new Date(item.createdAt).toLocaleString()}
                    </td>
                    <td className="p-2 sm:p-4 capitalize">{item.fullname || "-"}</td>
                    <td className="p-2 sm:p-4">{item.username || "-"}</td>
                    <td className="p-2 sm:p-4">{item.email || "-"}</td>
                    <td className="p-2 sm:p-4">{item.user_country || "-"}</td>
                    <td className="p-2 sm:p-4">
                      {new Date(item.createdAt).toLocaleString()}
                    </td>
                    <td className="p-2 sm:p-4">{item.level_eligibles == "level2" ? "Partner" : (item.level_eligibles == "level3" ? "Strategist" : "Member")}</td>
                    <td
                      className={`p-4 font-medium ${item.is_token_purchased ? 'text-green-600' : 'text-red-600'}`}
                    >
                      {item.is_token_purchased ? 'Active' : 'Pending'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center p-4 dark:text-white">
                    No referral history found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {filteredData.length > 0 && (
          <div className="flex items-center justify-between p-4 border-t border-gray-200">
            <div className="text-sm text-gray-700">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} entries
            </div>
            {totalPages > 1 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-2 py-1 text-[#7A44FF] hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed rounded"
                >
                  <MdChevronLeft size={20} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 border-2 border-[#7A44FF] rounded-lg ${
                      page === currentPage
                        ? "bg-[#7a44ff] text-white"
                        : "bg-white text-[#7A44FF] hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-2 py-1 text-[#7A44FF] hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed rounded"
                >
                  <MdChevronRight size={20} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ReferralReport;