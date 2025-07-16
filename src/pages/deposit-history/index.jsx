import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../../components/layout/Layout";
import { LuEye } from "react-icons/lu";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { depositReport } from "../../store/slices/transactionSlice";

const getStatusClass = (status) => {
  switch (status) {
    case "completed":
    case "success":
      return "text-green-600";
    case "pending":
      return "text-yellow-500";
    case "failed":
      return "text-red-600";
    default:
      return "";
  }
};

const DepositHistory = () => {
  const dispatch = useDispatch();
  const { depositHistory, loading, error } = useSelector((state) => state.transaction);

  console.log("Deposit History:", depositHistory);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(depositReport());
  }, [dispatch]);

  const totalPages = depositHistory
    ? Math.ceil(depositHistory.length / itemsPerPage)
    : 0;
  const paginatedData = depositHistory
    ? depositHistory.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : [];

  return (
    <Layout>
      <div className="bg-white dark:bg-zinc-900 mx-auto rounded-xl w-full max-w-5xl px-2 sm:px-4 py-6 overflow-hidden">
        <h2 className="text-2xl text-start dark:text-white font-semibold mb-6">
          Deposit History
        </h2>
        <div className="overflow-x-auto border-2 border-gray-100 dark:border-zinc-800 rounded-t-xl max-w-[85vw] mx-auto">
          <table className="w-full text-left text-sm sm:text-base border-collapse">
            <thead className="bg-[#7a44ff] max-lg:whitespace-nowrap">
              <tr>
                <th className="p-4 max-lg:whitespace-nowrap text-white">Sr.No</th>
                <th className="p-4 max-lg:whitespace-nowrap text-white">Transaction ID</th>
                <th className="p-4 max-lg:whitespace-nowrap text-white">Deposited Amount</th>
                <th className="p-4 max-lg:whitespace-nowrap text-white">Date</th>
                <th className="p-4 max-lg:whitespace-nowrap text-white">Transaction Status</th>
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
                    Error: {error}
                  </td>
                </tr>
              ) : paginatedData.length > 0 ? (
                paginatedData.map((item, key) => (
                  <tr
                    key={item._id}
                    className="border-t dark:bg-gray-200 dark:border-zinc-800 hover:bg-gray-50 transition-all"
                  >
                    <td className="p-2 sm:p-4">
                      {key + 1}
                    </td>
                    <td className="p-2 sm:p-4">
                      {item._id}
                    </td>
                    <td className="p-2 sm:p-4">{item.deposit_amount}</td>
                    <td className="p-2 sm:p-4">
                      {new Date(item.updatedAt).toLocaleString()}
                    </td>
                    <td
                      className={`p-4 font-medium capitalize ${getStatusClass(
                        item.txnstatus
                      )}`}
                    >
                      {item.txnstatus}
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center p-4">
                    No deposit history found.
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

export default DepositHistory;

