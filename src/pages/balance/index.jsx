import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../../components/layout/Layout";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { balanceDetailsThunk } from "../../store/slices/transactionSlice";
import { Link } from "react-router-dom";

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

const WalletBalance = () => {
  const dispatch = useDispatch();
  const balanceDetails = useSelector(
    (state) => state.transaction.balanceDetails || {}
  );
  const loading = useSelector((state) => state.transaction.loading || false);
  const error = useSelector((state) => state.transaction.error || null);

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    dispatch(balanceDetailsThunk());
  }, [dispatch]);

  // console.log("balance details", balanceDetails);

  // Extract crypto_amount array and wallet_details for table display
  const cryptoData = balanceDetails?.crypto_amount || [];
  const walletDetails = balanceDetails?.wallet_details || [];
  const walletAmount = balanceDetails?.wallet_amount || 0;

  // Use wallet_details if available, otherwise fall back to crypto_amount
  const displayData = walletDetails.length > 0 ? walletDetails : cryptoData;

  const filteredData = displayData.filter((item) => {
    const coinName = item.coinname || item.coin_type || "";
    const matchesSearch = coinName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter ? item.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Layout>
      <div className="bg-white dark:bg-zinc-900 mx-auto rounded-xl w-full max-w-5xl px-2 sm:px-4 py-6 overflow-hidden">
        <h2 className="text-2xl text-start dark:text-white font-semibold mb-6">
          Wallet Balance
        </h2>
        <div className="flex flex-wrap items-center gap-4 bg-[#f6f1ff] border border-[#cfc1f7] rounded-xl px-4 py-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-[#000]">Show</span>
            <div className="relative">
              <select
                className="border-2 border-gray-400 rounded-xl px-2 py-2 text-sm appearance-none pr-6"
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
          <div className="flex-1" />
          <div className="relative w-56">
            <input
              type="text"
              className="border-2 border-gray-400 rounded-xl px-4 py-2 text-sm w-full pr-8"
              placeholder="Search..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
            <svg
              className="absolute right-2 top-1/2 -translate-y-1/2"
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
                <th className="p-4 whitespace-nowrap">Crypto</th>
                <th className="p-4 whitespace-nowrap">Balance</th>
                <th className="p-4 whitespace-nowrap">In Staking</th>
                <th className="p-4 whitespace-nowrap">In Vesting</th>
                <th className="p-4 whitespace-nowrap">Available</th>
                <th className="p-4 whitespace-nowrap">Value(USD)</th>
                <th className="p-4 whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center p-4">
                    Loading...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="7" className="text-center p-4 text-red-500">
                    Error: {error?.message || "Something went wrong"}
                  </td>
                </tr>
              ) : paginatedData.length > 0 ? (
                paginatedData.map((item, index) => (
                  <tr
                    key={index}
                    className="border-t dark:bg-gray-200 dark:border-zinc-800 hover:bg-gray-50 transition-all"
                  >
                    <td className="p-2 sm:p-4">
                      {item.coinname || item.coin_type || "N/A"}
                    </td>
                    <td className="p-2 sm:p-4">
                      {Number(
                        item.available_balance || item.amount || 0
                      ).toFixed(2)}
                    </td>
                    <td className="p-2 sm:p-4">
                      {Number(item.vested_balance || 0).toFixed(2)}
                    </td>
                    <td className="p-2 sm:p-4">
                      {Number(item.vested_balance || 0).toFixed(2)}
                    </td>
                    <td className="p-2 sm:p-4">
                      {Number(
                        item.available_balance || item.amount || 0
                      ).toFixed(2)}
                    </td>
                    <td className="p-2 sm:p-4">
                      ${Number(item.usd_balance || 0).toFixed(2)}
                    </td>
                    <td className="p-2 sm:p-4">
                      <div className="flex gap-2">
                        <Link
                          to="/deposit-funds"
                          className="px-6 py-3 bg-gradient-to-r to-[#B500EF] from-[#37009A] text-white rounded-lg hover:bg-purple-700 font-semibold transition-colors text-sm"
                        >
                          Deposit
                        </Link>
                        <Link
                          to="/transfer"
                          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold transition-colors text-sm"
                        >
                          Withdraw
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center p-4">
                    {displayData.length === 0
                      ? `No crypto assets found. Total wallet amount: $${walletAmount.toLocaleString()}`
                      : "No wallet balance found."}
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
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
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

export default WalletBalance;
