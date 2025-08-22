import React, { useState } from "react";

const BuyCapx = () => {
  const [payAmount, setPayAmount] = useState("");
  const [receiveAmount, setReceiveAmount] = useState("0");

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 w-full h-full">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Buy CAPX</h3>
      
      <div className="space-y-4">
        {/* You Pay Section */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            YOU PAY (MIN. 50.00$)
          </label>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <input
                  type="text"
                  value={payAmount}
                  onChange={(e) => setPayAmount(e.target.value)}
                  placeholder="0.00"
                  className="text-3xl font-light text-gray-700 bg-transparent border-none outline-none w-full"
                />
                <div className="text-sm text-gray-500 mt-1">$0.00</div>
              </div>
              
              <div className="ml-4">
                <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-2 min-w-[120px]">
                  <div className="w-5 h-5 bg-blue-600 rounded-full mr-2 flex items-center justify-center">
                    <svg width="12" height="20" viewBox="0 0 12 20" fill="none" className="text-white">
                      <path d="M11.4 9.6L6 12.8L0.6 9.6L6 0L11.4 9.6ZM6 13.9L0.6 10.7L6 20L11.4 10.7L6 13.9Z" fill="currentColor"/>
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700 mr-1">Ethereum</span>
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="text-gray-400">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="text-xs text-gray-500 text-right mt-1">Balance: 0.00000 Max</div>
              </div>
            </div>
          </div>
        </div>

        {/* Exchange Arrow */}
        <div className="flex justify-center py-3">
          <div className="bg-purple-600 rounded-lg p-3">
            <svg width="20" height="16" viewBox="0 0 20 16" fill="none" className="text-white">
              <path d="M6 1L2 5L6 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18 5H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 15L18 11L14 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 11H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* You Receive Section */}
        <div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <input
                  type="text"
                  value={receiveAmount}
                  onChange={(e) => setReceiveAmount(e.target.value)}
                  placeholder="0"
                  className="text-3xl font-light text-gray-700 bg-transparent border-none outline-none w-full"
                />
              </div>
              
              <div className="ml-4">
                <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-2 min-w-[100px]">
                  <div className="w-5 h-5 bg-purple-600 rounded-full mr-2 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">C</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">CAPX</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Buy Button */}
        <button className="w-full bg-gray-300 text-gray-500 py-3 rounded-lg font-medium text-sm mt-6 cursor-not-allowed">
          Buy CAPX
        </button>
      </div>
    </div>
  );
};

export default BuyCapx;