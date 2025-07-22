import React, { useState, useRef } from "react";
import Layout from "../../components/layout/Layout";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Mock data for demonstration
const mockEarnings = [
  {
    joiningDate: "27-Jul-2024 14:14:29",
    transactionId: "AGYGV634768",
    fromUsername: "Abhiram",
    amount: 56.0,
    currency: "USD",
    status: "Confirmed",
  },
  {
    joiningDate: "27-Jul-2024 14:14:29",
    transactionId: "AGYGV634768",
    fromUsername: "Amal Krishna",
    amount: 56.0,
    currency: "USD",
    status: "Confirmed",
  },
  {
    joiningDate: "27-Jul-2024 14:14:29",
    transactionId: "AGYGV634768",
    fromUsername: "Shahana",
    amount: 56.0,
    currency: "USD",
    status: "Confirmed",
  },
  {
    joiningDate: "27-Jul-2024 14:14:29",
    transactionId: "AGYGV634768",
    fromUsername: "Ruben",
    amount: 56.0,
    currency: "USD",
    status: "Confirmed",
  },
  {
    joiningDate: "27-Jul-2024 14:14:29",
    transactionId: "AGYGV634768",
    fromUsername: "Amal Noth",
    amount: 56.0,
    currency: "USD",
    status: "Pending",
  },
  {
    joiningDate: "27-Jul-2024 14:14:29",
    transactionId: "AGYGV634768",
    fromUsername: "Rothin",
    amount: 56.0,
    currency: "USD",
    status: "Confirmed",
  },
  {
    joiningDate: "27-Jul-2024 14:14:29",
    transactionId: "AGYGV634768",
    fromUsername: "Athul",
    amount: 56.0,
    currency: "USD",
    status: "Confirmed",
  },
  {
    joiningDate: "27-Jul-2024 14:14:29",
    transactionId: "AGYGV634768",
    fromUsername: "Unni",
    amount: 56.0,
    currency: "USD",
    status: "Pending",
  },
  {
    joiningDate: "27-Jul-2024 14:14:29",
    transactionId: "AGYGV634768",
    fromUsername: "Manju",
    amount: 56.0,
    currency: "USD",
    status: "Confirmed",
  },
  {
    joiningDate: "27-Jul-2024 14:14:29",
    transactionId: "AGYGV634768",
    fromUsername: "Manju",
    amount: 56.0,
    currency: "USD",
    status: "Confirmed",
  },
];

const statuses = ["Confirmed", "Pending", "Failed"];

const getStatusClass = (status) => {
  switch (status) {
    case "Confirmed":
      return "text-green-600";
    case "Pending":
      return "text-yellow-500";
    case "Failed":
      return "text-red-600";
    default:
      return "";
  }
};

const EarningsReport = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [dateRange, setDateRange] = useState([null, null]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const dateInputRef = useRef(null);
  const [startDate, endDate] = dateRange;

  // Filtered and paginated data
  const filteredData = mockEarnings.filter((item) => {
    const matchesSearch =
      item.transactionId.toLowerCase().includes(search.toLowerCase()) ||
      item.fromUsername.toLowerCase().includes(search.toLowerCase()) ||
      item.currency.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter ? item.status === statusFilter : true;
    // For demo, skipping date filter
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const dateRangeDisplay =
    startDate && endDate
      ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
      : "Select Date Range";

  return (
    <Layout>
      <div className="bg-white dark:bg-zinc-900 mx-auto rounded-xl w-full max-w-5xl px-2 sm:px-4 py-6 overflow-hidden">
        <h2 className="text-2xl text-start dark:text-white font-semibold mb-6">
          Earnings Report
        </h2>
        <div className="flex flex-wrap items-center gap-4 bg-[#f6f1ff] border border-[#cfc1f7] rounded-xl px-4 py-3 mb-4">
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
          <div className="relative flex items-center">
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
              <path d="M6.16797 1.41675V3.54175" stroke="#292D32" strokeWidth="1.0625" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M11.832 1.41675V3.54175" stroke="#292D32" strokeWidth="1.0625" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15.375 6.02091V12.0417C15.375 14.1667 14.3125 15.5834 11.8333 15.5834H6.16667C3.6875 15.5834 2.625 14.1667 2.625 12.0417V6.02091C2.625 3.89591 3.6875 2.47925 6.16667 2.47925H11.8333C14.3125 2.47925 15.375 3.89591 15.375 6.02091Z" stroke="#292D32" strokeWidth="1.0625" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M5.45703 7.79175H9.70703" stroke="#292D32" strokeWidth="1.0625" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M5.45703 11.3333H7.31286" stroke="#292D32" strokeWidth="1.0625" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {showDatePicker && (
              <div className="absolute z-50 top-12 left-0">
                <DatePicker
                  selected={startDate}
                  onChange={(update) => {
                    setDateRange(update);
                    if (update[0] && update[1]) setShowDatePicker(false);
                  }}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  inline
                />
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
              <option value="">All status</option>
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s}
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
          <div className="flex-1" />
          <div className="relative w-56">
            <input
              type="text"
              className="border rounded px-2 py-1 text-sm w-full pl-8"
              placeholder="Search..."
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

        <div className="overflow-x-auto border-2 border-gray-100 dark:border-zinc-800 rounded-t-xl max-w-[89vw] mx-auto">
          <table className="w-full text-left text-sm sm:text-base border-collapse">
            <thead className="bg-[#F6EEFE] text-purple-500 whitespace-nowrap font-medium text-sm">
              <tr>
                <th className="p-4 whitespace-nowrap">Joining Date</th>
                <th className="p-4 whitespace-nowrap">Transaction ID</th>
                <th className="p-4 whitespace-nowrap">From Username</th>
                <th className="p-4 whitespace-nowrap">Amount</th>
                <th className="p-4 whitespace-nowrap">Currency</th>
                <th className="p-4 whitespace-nowrap">Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((item, idx) => (
                  <tr
                    key={idx}
                    className="border-t dark:bg-gray-200 dark:border-zinc-800 hover:bg-gray-50 transition-all"
                  >
                    <td className="p-2 sm:p-4">{item.joiningDate}</td>
                    <td className="p-2 sm:p-4">{item.transactionId}</td>
                    <td className="p-2 sm:p-4">{item.fromUsername}</td>
                    <td className="p-2 sm:p-4">{item.amount.toFixed(2)}</td>
                    <td className="p-2 sm:p-4">{item.currency}</td>
                    <td className={`p-4 font-medium ${getStatusClass(item.status)}`}>{item.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center p-4">
                    No earnings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-end gap-2 p-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-2 py-1 text-[#7A44FF] hover:bg-gray-100 disabled:opacity-50"
            >
              <MdChevronLeft size={20} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 dark:text-white py-1 border-2 border-[#7A44FF] rounded-lg ${
                  page === currentPage
                    ? "bg-[#7a44ff] text-white"
                    : "hover:bg-gray-100 dark:hover:text-black"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-2 py-1 text-[#7A44FF] hover:bg-gray-100 disabled:opacity-50"
            >
              <MdChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default EarningsReport; 