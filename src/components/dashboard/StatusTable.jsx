import React, { useState } from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";


const getStatusColor = (status) => {
  switch ((status || '').toLowerCase()) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border border-yellow-400 rounded-md px-2 py-1 text-sm font-semibold capitalize';
    case 'complete':
    case 'completed':
      return 'bg-green-100 text-green-800 border border-green-500 rounded-md px-2 py-1 text-sm font-semibold capitalize';
    case 'failed':
    case 'error':
      return 'bg-red-100 text-red-800 border border-red-500 rounded-md px-2 py-1 text-sm font-semibold capitalize';
    default:
      return 'bg-gray-100 text-gray-800 border border-gray-400 rounded-md px-2 py-1 text-sm font-semibold capitalize';
  }
};


const StatusTable = ({ transactions }) => {
  const [showAll, setShowAll] = useState(false);
  const txns = Array.isArray(transactions) ? transactions : [];
  const displayedTransactions = showAll ? txns : txns.slice(0, 5);

  return (
    <div className="bg-white dark:bg-zinc-900 shadow-lg rounded-xl w-full md:px-4 px-1 py-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-lg dark:text-white text-start px-4 sm:text-xl md:text-2xl font-semibold mb-6">
          Transactions
        </h2>
        <div className="overflow-x-auto rounded-t-xl border-4 border-gray-100 dark:border-zinc-800 max-sm:max-w-[80vw] mx-auto">
          <table className="w-full text-left text-sm sm:text-base border-collapse">
            <thead className="bg-gray-100 dark:text-white dark:bg-zinc-800 whitespace-nowrap">
              <tr>
                <th className="px-4 py-3 font-bold">Date</th>
                <th className="px-4 py-3 font-bold">Type</th>
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
                    <td className="px-4 py-3 text-bold text-sm" style={{ fontSize: "12px" }}>{tx.createdAt ? new Date(tx.createdAt).toLocaleDateString() : '-'}</td>
                    <td className="px-4 py-3 uppercase text-sm" style={{ fontSize: "12px" }}>{tx.deposit_type || '-'}</td>
                    <td className="px-4 py-3 text-sm" style={{ fontSize: "12px" }}>{tx.amount || tx.txnamount || '-'}</td>
                    <td className="px-4 py-3 text-sm"style={{ fontSize: "12px" }} >USD</td>
                    <td className="px-4 py-3 text-sm" style={{ fontSize: "12px" }}>
                      <span className={getStatusColor(tx.status || tx.txnstatus)} style={{ fontSize: "12px" }}>
                        {tx.status || tx.txnstatus || '-'}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="5" className="text-center py-4">No transactions found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        {txns.length > 5 && (
          <div
            className="bg-gray-100 flex gap-2 justify-end items-center p-4 dark:bg-zinc-900 text-purple-600 font-medium text-sm cursor-pointer max-sm:max-w-[80vw] mx-auto"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? <IoChevronUp size={20}/> : <IoChevronDown size={20}/>}
            <span>{showAll ? "View less" : "View more"}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default StatusTable;