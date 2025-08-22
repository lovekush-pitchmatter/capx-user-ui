import React, { useState } from "react";

const CalculateProfit = () => {
  const [capxAmount, setCapxAmount] = useState("");
  const [price, setPrice] = useState("");

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 w-full h-full">
      {/* Header with Stage Dropdown */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Calculate profit on launch</h3>
        <div className="flex items-center bg-gray-100 border border-gray-200 rounded-lg px-3 py-2">
          <span className="text-sm font-medium text-gray-700 mr-2">Stage 1</span>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="text-gray-400">
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      
      <div className="space-y-6">
        {/* Amount of CAPX */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2 uppercase tracking-wide">
            AMOUNT OF CAPX
          </label>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <input
                  type="text"
                  value={capxAmount}
                  onChange={(e) => setCapxAmount(e.target.value)}
                  placeholder="0.00"
                  className="text-2xl font-light text-gray-700 bg-transparent border-none outline-none w-full"
                />
              </div>
              
              <div className="ml-4">
                <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-2">
                  <div className="w-5 h-5 bg-purple-600 rounded-full mr-2 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">C</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">CAPX</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Price Info */}
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">PRICE</span>
          <span className="text-sm font-medium text-gray-700">1 CAPX = $2.50</span>
        </div>

        {/* Price Input */}
        <div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0"
              className="text-2xl font-light text-gray-700 bg-transparent border-none outline-none w-full"
            />
          </div>
        </div>

        {/* Listing Price and ROI */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2 uppercase tracking-wide">
              LISTING PRICE
            </label>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <span className="text-2xl font-light text-gray-600">0.00</span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2 uppercase tracking-wide">
              ROI
            </label>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <span className="text-2xl font-light text-gray-600">200.00%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculateProfit;