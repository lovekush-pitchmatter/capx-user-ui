import React, { useState } from "react";
// ...import modals as needed...

const fiatCurrencies = [
  { label: "USD", value: "usd", balance: 4725.18, min: 10, fee: 2 },
];
const fiatWithdrawalModes = [
  { label: "Bank Transfer", value: "bank" },
  { label: "PayPal", value: "paypal" },
];
const fiatPaymentMethods = [
  { label: "SWIFT", value: "swift" },
  { label: "ACH", value: "ach" },
];
const fiatNetworks = [
  { label: "SWIFT Network", value: "swift" },
  { label: "ACH Network", value: "ach" },
];

const handleFiatSubmit = (e) => {
  e.preventDefault();
  // Handle fiat withdrawal submission logic here
}

const FiatWithdraw = () => {
  // ...move fiat form logic and modals here...
  // ...existing code...
  return (
    <div>
       <form className="bg-white border rounded-2xl shadow p-8 flex flex-col gap-5" onSubmit={handleFiatSubmit}>
              {/* <div>
                <label className="block text-sm font-medium mb-1">Currency</label>
                <select
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none"
                  value={fiatCurrency}
                  onChange={e => setFiatCurrency(e.target.value)}
                >
                  {fiatCurrencies.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Select Withdrawal Mode</label>
                <select
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none"
                  value={fiatMode}
                  onChange={e => setFiatMode(e.target.value)}
                >
                  <option value="">Select withdrawal mode</option>
                  {fiatWithdrawalModes.map((m) => (
                    <option key={m.value} value={m.value}>{m.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Payment Method</label>
                <select
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none"
                  value={fiatMethod}
                  onChange={e => setFiatMethod(e.target.value)}
                >
                  <option value="">Select payment method</option>
                  {fiatPaymentMethods.map((m) => (
                    <option key={m.value} value={m.value}>{m.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Network</label>
                <select
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none"
                  value={fiatNetwork}
                  onChange={e => setFiatNetwork(e.target.value)}
                >
                  <option value="">Select withdrawal network</option>
                  {fiatNetworks.map((n) => (
                    <option key={n.value} value={n.value}>{n.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Receive Address</label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none"
                  placeholder="Enter Wallet Address"
                  value={fiatAddress}
                  onChange={e => setFiatAddress(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Amount</label>
                <input
                  type="number"
                  min={selectedFiat.min}
                  max={selectedFiat.balance}
                  step="0.01"
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none"
                  placeholder={`Min ${selectedFiat.min} - Max ${selectedFiat.balance}`}
                  value={fiatAmount}
                  onChange={e => setFiatAmount(e.target.value)}
                />
                <div className="text-xs text-[#7703D9] mt-1 underline">Available balance: USD {selectedFiat.balance.toFixed(2)}</div>
              </div>
              <div className="bg-[#EADAFD] rounded-xl p-4 flex flex-col gap-2 text-sm text-[#7703D9] mb-2">
                <div className="flex justify-between">
                  <span>Minimum withdrawal</span>
                  <span className="font-semibold text-[#2D1153]">USD {selectedFiat.min.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Network Fee</span>
                  <span className="font-semibold text-[#2D1153]">2.00 USD</span>
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-2xl font-semibold text-white text-lg mt-2 shadow-lg"
                style={{ background: 'linear-gradient(90deg, #3D06BE 0%, #7703D9 50%, #AF01F3 100%)' }}
              >
                Submit Withdrawal
              </button> */}
              <div className="text-center text-gray-500">Fiat withdrawal feature coming soon!</div>
            </form>
    </div>
  );
};

export default FiatWithdraw;
