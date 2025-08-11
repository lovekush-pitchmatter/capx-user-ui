import React, { useState, useEffect } from "react";

const ProfitCalculator = () => {
  const [capxAmount, setCapxAmount] = useState("");
  const [listingPrice, setListingPrice] = useState("");
  const [roi, setRoi] = useState("0.00%");

  const currentPrice = 2.50; // Example: 1 CAPX = $2.50

  useEffect(() => {
    if (capxAmount && listingPrice && parseFloat(capxAmount) > 0 && parseFloat(listingPrice) > 0) {
      const totalInvested = parseFloat(capxAmount) * currentPrice;
      const totalValueAtLaunch = parseFloat(capxAmount) * parseFloat(listingPrice);
      const profit = totalValueAtLaunch - totalInvested;
      if (totalInvested > 0) {
        const calculatedRoi = (profit / totalInvested) * 100;
        setRoi(`${calculatedRoi.toFixed(2)}%`);
      } else {
        setRoi("0.00%");
      }
    } else {
      setRoi("0.00%");
    }
  }, [capxAmount, listingPrice]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Calculate profit on launch</h3>
        <select className="border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none">
          <option>Stage 1</option>
          <option>Stage 2</option>
        </select>
      </div>

      <div>
        <label className="block text-xs text-gray-500 mb-1">AMOUNT OF CAPX</label>
        <div className="flex items-center border border-gray-300 rounded-lg p-2">
          <input
            type="number"
            value={capxAmount}
            onChange={(e) => setCapxAmount(e.target.value)}
            placeholder="0.00"
            className="w-full text-lg font-semibold text-gray-800 focus:outline-none"
          />
          <span className="ml-2 text-sm text-gray-600">CAPX</span>
        </div>
      </div>

      <div>
        <label className="block text-xs text-gray-500 mb-1">PRICE</label>
        <input
          type="text"
          value={`1 CAPX = $${currentPrice.toFixed(2)}`}
          readOnly
          className="w-full border border-gray-300 rounded-lg p-2 text-lg font-semibold text-gray-800 bg-gray-50 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-xs text-gray-500 mb-1">LISTING PRICE</label>
        <input
          type="number"
          value={listingPrice}
          onChange={(e) => setListingPrice(e.target.value)}
          placeholder="0.00"
          className="w-full border border-gray-300 rounded-lg p-2 text-lg font-semibold text-gray-800 focus:outline-none"
        />
      </div>

      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold text-gray-800">ROI</span>
        <span className="text-lg font-bold text-green-600">{roi}</span>
      </div>
    </div>
  );
};

export default ProfitCalculator;
