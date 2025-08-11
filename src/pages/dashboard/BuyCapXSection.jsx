import React, { useState } from "react";
import { PiCaretDownBold, PiCurrencyCircleDollar } from "react-icons/pi"; // Using Phosphor Icons

const BuyCapXSection = () => {
  const [amount, setAmount] = useState("");
  const [receiveAmount, setReceiveAmount] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("Ethereum"); // Default
  const minAmount = 50; // Example minimum

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    // Simple calculation for demonstration
    setReceiveAmount((parseFloat(value) / 2.5).toFixed(2)); // Assuming 1 CAPX = $2.5
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Buy CAPX</h3>
      <p className="text-xs text-gray-500">YOU PAY (MIN. ${minAmount}.00)</p>

      <div className="border border-gray-300 rounded-lg p-3 space-y-2">
        <div className="flex items-center justify-between">
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            placeholder="0.00"
            min={minAmount}
            className="w-full text-xl font-bold text-gray-800 focus:outline-none"
          />
          <select
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
            className="bg-transparent text-sm font-medium text-gray-600 focus:outline-none"
          >
            <option>Ethereum</option>
            <option>USDT</option>
          </select>
        </div>
        <p className="text-xs text-gray-500">Balance: 0.00000 Max</p>
      </div>

      <div className="flex justify-center">
        <PiCaretDownBold size={24} className="text-purple-600" />
      </div>

      <div className="border border-gray-300 rounded-lg p-3 flex items-center justify-between">
        <input
          type="text"
          value={receiveAmount}
          readOnly
          placeholder="0"
          className="w-full text-xl font-bold text-gray-800 bg-transparent focus:outline-none"
        />
        <div className="flex items-center text-sm font-medium text-gray-600">
          <PiCurrencyCircleDollar size={20} className="mr-1 text-purple-600" /> CAPX
        </div>
      </div>

      <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:opacity-90">
        Buy CAPX
      </button>
    </div>
  );
};

export default BuyCapXSection;

