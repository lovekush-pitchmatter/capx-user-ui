import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { sendTransferOtpThunk, verifyUsername } from '../../store/slices/transactionSlice';
import { verifyOtp } from '../../store/slices/authSlice';
import { walletBalance } from '../../store/slices/profileSlice';
import UserWithdraw from "../../components/withdraw/UserWithdraw";
import FiatWithdraw from "../../components/withdraw/FiatWithdraw";
import CryptoWithdraw from "../../components/withdraw/CryptoWithdraw";
 
const networks = [
  { label: "Ethereum", value: "eth", display: "Ethereum" },
  { label: "Binance Smart Chain (BEP20)", value: "bsc", display: "BNB Smart Chain (BEP20)" },
  // Add more networks as needed
];

const fiatCurrencies = [
  { label: "USD", value: "usd", balance: 4725.18, min: 10, fee: 2 }
];
const WithdrawFunds = () => {

  const [tab, setTab] = useState("crypto");
  const [coin, setCoin] = useState("capx");
  const [addressType, setAddressType] = useState("external");
  const dispatch = useDispatch();

  const userWalletBalance = useSelector((state) => state.profile.userWalletBalance);

  // Prepare coins array based on wallet balance
  const coins = [
    { label: "CAPShield (CAPX)", value: "capx", balance: userWalletBalance?.user_total_tokens_unlocked || 0, min: 10, fee: 0.00 },
    { label: "ETH", value: "eth", balance: userWalletBalance?.eth || 0, min: 0.01, fee: 0.00 },
    { label: "BNB", value: "bnb", balance: userWalletBalance?.bnb || 0, min: 0.01, fee: 0.00 },
    { label: "USD", value: "usd", balance: userWalletBalance?.wallet_amount || 0, min: 10, fee: 0.00 },
  ];

  useEffect(() => {
    dispatch(walletBalance());
  }, []);

  return (
    <Layout menu_one="Wallet" menu_two="Withdraw">
      <h2 className="text-2xl font-semibold mb-6 mx-8 text-left">Withdraw Funds</h2>
      <div className="flex flex-col items-center justify-center min-h-[80vh] w-full">
      
        <div className="w-full max-w-md mx-auto">
          

          {/* Tabs */}
          <div className="flex mb-6 w-full rounded-full border border-[#7A44FF] overflow-hidden">
            <button
              className={`flex-1 py-2 text-sm font-semibold transition-all ${tab === "crypto" ? "bg-gradient-to-r from-[#7A44FF] to-[#B500EF] text-white" : "bg-white text-[#7A44FF]"}`}
              onClick={() => setTab("crypto")}
            >
              Withdraw Crypto
            </button>
            <button
              className={`flex-1 py-2 text-sm font-semibold transition-all ${tab === "fiat" ? "bg-gradient-to-r from-[#7A44FF] to-[#B500EF] text-white" : "bg-white text-[#7A44FF]"}`}
              onClick={() => setTab("fiat")}
            >
              Withdraw Fiat
            </button>
          </div>

          {/* Crypto Withdraw Form */}
          {tab === "crypto" && (
            <>
              {/* Select Coin */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Select Coin</label>
                <select
                  className="w-full border rounded px-3 py-2 focus:outline-none"
                  value={coin}
                  onChange={e => setCoin(e.target.value)}
                >
                  {coins.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>
                {/* Withdraw Amount input above Withdrawal Address */}
                {/* Address Type Tabs */}
                <div className="flex w-full mb-4">
                <button
                  type="button"
                    className={`flex-1 py-2 rounded-l-full font-semibold text-sm transition-all border ${addressType === "external" ? "bg-gradient-to-r from-[#3D06BE] via-[#7703D9] to-[#AF01F3] text-white border-transparent" : "bg-white text-[#3D06BE] border-[#3D06BE]"}`}
                  onClick={() => setAddressType("external")}
                >
                  External Address
                </button>
                <button
                  type="button"
                    className={`flex-1 py-2 rounded-r-full font-semibold text-sm transition-all border ${addressType === "user" ? "bg-gradient-to-r from-[#3D06BE] via-[#7703D9] to-[#AF01F3] text-white border-transparent" : "bg-white text-[#3D06BE] border-[#3D06BE]"}`}
                  onClick={() => setAddressType("user")}
                >
                  Other User
                </button>
              </div> 

                {/* External Address Form */}
                {addressType === "external" && (
                  <CryptoWithdraw cointype={coin} />
                )}
                {/* Other User Form (unchanged) */}
              {addressType === "user" && (
                <UserWithdraw cointype={coin} />
              )}
              
            </>
          )}

          {/* Fiat Withdraw Form */}
          {tab === "fiat" && (
            <FiatWithdraw cointype={coin} />
          )}

        </div>
      </div>
    </Layout>
  );
};

export default WithdrawFunds;
