import React, { useState } from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const getTransactionTypeDisplay = (transactionType) => {
  switch ((transactionType || '').toLowerCase()) {
    case 'wallet-top':
      return 'Wallet Topup';
    case 'token-purchase':
      return 'Token Purchase';
    case 'withdraw':
      return 'Withdraw';
    default:
      return transactionType || '-';
  }
};

const getStatusColor = (status) => {
  const normalizedStatus = (status || '').toLowerCase();
  // Convert expired to failed
  const displayStatus = normalizedStatus === 'expired' ? 'failed' : normalizedStatus;
  
  switch (displayStatus) {
    case 'pending':
    case 'processing':
      return 'bg-yellow-100 text-yellow-800 border border-yellow-400 rounded-md px-2 py-1 text-sm font-semibold capitalize';
    case 'complete':
    case 'completed':
      return 'bg-green-100 text-green-800 border border-green-500 rounded-md px-2 py-1 text-sm font-semibold capitalize';
    case 'failed':
    case 'error':
    case 'expired':
      return 'bg-red-100 text-red-800 border border-red-500 rounded-md px-2 py-1 text-sm font-semibold capitalize';
    default:
      return 'bg-gray-100 text-gray-800 border border-gray-400 rounded-md px-2 py-1 text-sm font-semibold capitalize';
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


const StatusTable = ({ transactions }) => {
  const [showAll, setShowAll] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate, endDate] = dateRange;
  
  const txns = Array.isArray(transactions) ? transactions : [];

  // Filter transactions based on search, status, and date
  const filteredTransactions = txns.filter((tx) => {
    // Search filter
    const matchesSearch = search === "" || 
      (tx._id && tx._id.toLowerCase().includes(search.toLowerCase())) ||
      (tx.ref_table_id && tx.ref_table_id.toLowerCase().includes(search.toLowerCase())) ||
      (tx.transaction_type && tx.transaction_type.toLowerCase().includes(search.toLowerCase())) ||
      (tx.deposit_type && tx.deposit_type.toLowerCase().includes(search.toLowerCase())) ||
      (tx.amount && tx.amount.toString().includes(search));

    // Status filter - convert expired to failed for comparison
    const txStatus = (tx.status || tx.txnstatus || '').toLowerCase();
    const normalizedTxStatus = txStatus === 'expired' ? 'failed' : txStatus;
    const matchesStatus = statusFilter === "" || normalizedTxStatus === statusFilter.toLowerCase();

    // Date filter
    const txDate = new Date(tx.txn_date || tx.createdAt);
    const matchesDate = 
      (!startDate || txDate >= new Date(startDate.setHours(0, 0, 0, 0))) &&
      (!endDate || txDate <= new Date(endDate.setHours(23, 59, 59, 999)));

    return matchesSearch && matchesStatus && matchesDate;
  });

  const displayedTransactions = showAll ? filteredTransactions : filteredTransactions.slice(0, 5);

  const dateRangeDisplay = 
    startDate && endDate
      ? `${formatDate(startDate)} - ${formatDate(endDate)}`
      : "Select Date Range";

  return (
    <div className="bg-white dark:bg-zinc-900 shadow-lg rounded-xl w-full md:px-4 px-1 py-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-lg dark:text-white text-start px-4 sm:text-xl md:text-2xl font-semibold mb-6">
          Latest Transactions
        </h2>
        
        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-4 bg-[#f6f1ff] border border-[#cfc1f7] rounded-xl px-4 py-3 mb-4 mx-4 relative overflow-visible">
          {/* Status Filter */}
          <div className="relative">
            <select
              className="border rounded px-2 py-1 text-sm appearance-none pr-6 min-w-[120px]"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="failed">Failed</option>
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

          {/* Date Filter */}
          <div className="relative flex items-center">
            <input
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

          {/* Search Filter */}
          <div className="flex-1" />
          <div className="relative w-56">
            <input
              type="text"
              className="border rounded px-2 py-1 text-sm w-full pl-8"
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
        <div className="overflow-x-auto rounded-t-xl border-4 border-gray-100 dark:border-zinc-800 max-sm:max-w-[80vw] mx-auto">
          <table className="w-full text-left text-sm sm:text-base border-collapse">
            <thead className="bg-gray-100 dark:text-white dark:bg-zinc-800 whitespace-nowrap">
              <tr>
                <th className="px-4 py-3 font-bold">Transaction Date</th>
                <th className="px-4 py-3 font-bold">Transaction ID</th>
                <th className="px-4 py-3 font-bold">Transaction Type</th>
                <th className="px-4 py-3 font-bold">Deposit Type</th>
                <th className="px-4 py-3 font-bold">Amount</th>
                <th className="px-4 py-3 font-bold">Currency</th>
                <th className="px-4 py-3 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="whitespace-nowrap bg-white dark:bg-zinc-800">
              {displayedTransactions.length > 0 ? (
                displayedTransactions.map((tx, idx) => (
                  <tr
                    key={idx}
                    className="border-t text-sm dark:bg-gray-200 dark:border-zinc-800 border-gray-200 hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3 text-bold text-sm" style={{ fontSize: "12px" }}>
                      {tx.txn_date || tx.createdAt ? new Date(tx.txn_date || tx.createdAt).toLocaleDateString() : '-'}
                    </td>
                    <td className="px-4 py-3 text-sm" style={{ fontSize: "12px" }}>
                      {tx._id || tx.ref_table_id || '-'}
                    </td>
                    <td className="px-4 py-3 text-sm" style={{ fontSize: "12px" }}>
                      {getTransactionTypeDisplay(tx.transaction_type)}
                    </td>
                    <td className="px-4 py-3 uppercase text-sm" style={{ fontSize: "12px" }}>
                      {tx.deposit_type || '-'}
                    </td>
                    <td className="px-4 py-3 text-sm" style={{ fontSize: "12px" }}>
                      {tx.amount ? parseFloat(tx.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '-'}
                    </td>
                    <td className="px-4 py-3 text-sm" style={{ fontSize: "12px" }}>USD</td>
                    <td className="px-4 py-3 text-sm" style={{ fontSize: "12px" }}>
                      <span className={getStatusColor(tx.status || tx.txnstatus)} style={{ fontSize: "12px" }}>
                        {(tx.status || tx.txnstatus || '').toLowerCase() === 'expired' ? 'Failed' : (tx.status || tx.txnstatus || '-')}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="7" className="text-center py-4">No transactions found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        {filteredTransactions.length > 5 && (
          <div
            className="bg-gray-100 flex gap-2 justify-end items-center p-4 dark:bg-zinc-900 text-purple-600 font-medium text-sm cursor-pointer max-sm:max-w-[80vw] mx-auto"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? <IoChevronUp size={20}/> : <IoChevronDown size={20}/>}
            <span>{showAll ? "View less" : "View more"}</span>
          </div>
        )}
        
        {/* Results Info */}
        {filteredTransactions.length > 0 && (
          <div className="px-4 py-2 text-sm text-gray-600">
            Showing {displayedTransactions.length} of {filteredTransactions.length} transactions
          </div>
        )}
      </div>
    </div>
  );
}

export default StatusTable;