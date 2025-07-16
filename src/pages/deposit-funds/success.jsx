import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import { FiCopy } from "react-icons/fi";

const SuccessDeposit = () => {
  const [hashId, setHashId] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [copied, setCopied] = useState(false);
  const orderNumber = "648652598065785675";
  const payAmount = "500.00 USDT";
  const creditAmount = "100.00 USDT";
  const depositWallet = "0xecd9A9...5F9117";

  const handleCopy = () => {
    navigator.clipboard.writeText("0xecd9A9d39d0fa40fAd28c64c5BFe6E02a5F9117");
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <Layout>
      <div className="w-full max-w-5xl mx-auto py-8 px-2 font-['Roboto']">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#000000] mb-2">Congratulations!</h2>
        <p className="text-base text-[#000000] mb-6">Your deposit order has been successfully placed.</p>
        {/* Order Info Box */}
        <div className="border-2 border-[#7A44FF] rounded-xl p-6 mb-6 flex flex-col gap-2 max-w-md mx-auto">
          <div className="flex justify-between text-[#000000] text-base">
            <span>Order number:</span>
            <span className="font-medium">{orderNumber}</span>
          </div>
          <div className="flex justify-between text-[#000000] text-base">
            <span>Pay:</span>
            <span className="font-bold text-lg">{payAmount}</span>
          </div>
        </div>
        {/* Wallet Credit Info */}
        <div className="mb-2 text-center">
          <span className="font-medium text-[#000000]">Wallet Credit (USD) </span>
          <span className="font-bold text-[#7A44FF]">{creditAmount}</span>
        </div>
        <p className="text-[#000000] mb-4 text-center">To complete the transaction, please send the amount to the following address.</p>
        {/* Wallet Address Box */}
        <div className="bg-[#EDE6FF] rounded-xl flex flex-col sm:flex-row items-center justify-between px-4 py-3 mb-6 max-w-2xl mx-auto">
          <span className="font-medium text-[#000000] mb-2 sm:mb-0">Wallet Address</span>
          <span className="ml-0 sm:ml-4 text-[#000000] font-mono break-all">0xecd9A9d39d0fa40fAd28c64c5BFe6E02a5F9117</span>
          <button onClick={handleCopy} className="ml-0 sm:ml-2 text-[#7A44FF] hover:text-[#000000] mt-2 sm:mt-0">
            <FiCopy size={20} />
          </button>
          {copied && <span className="ml-2 text-xs text-[#7A44FF]">Copied!</span>}
        </div>
        <p className="text-[#000000] mb-2 text-sm text-center">Your USD balance will be credited after the transaction receives 3 confirmations and is approved by our team.</p>
        <p className="text-sm mb-4 text-center">
          <span className="text-[#7A44FF] font-medium">Important Note</span>
          <span className="text-[#000000]"> : To expedite the verification process, please provide the wallet address from which you will be transferring the funds. Kindly enter your hash ID and sending wallet address in the designated fields below</span>
        </p>
        {/* Hash ID and Wallet Address Form */}
        <div className="bg-[#EDE6FF] rounded-xl p-6 max-w-lg mb-8 mx-auto">
          <form className="space-y-4">
            <div>
              <label className="block text-[#000000] font-semibold mb-1">Hash ID</label>
              <input
                type="text"
                className="w-full rounded-md border border-[#BDBDBD] px-4 py-2 bg-white text-[#000000] focus:outline-none focus:ring-2 focus:ring-[#7A44FF]"
                placeholder="Enter Hash ID"
                value={hashId}
                onChange={e => setHashId(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-[#000000] font-semibold mb-1">Your Wallet Address</label>
              <input
                type="text"
                className="w-full rounded-md border border-[#BDBDBD] px-4 py-2 bg-white text-[#000000] focus:outline-none focus:ring-2 focus:ring-[#7A44FF]"
                placeholder="Enter Sending wallet address (Optional)"
                value={walletAddress}
                onChange={e => setWalletAddress(e.target.value)}
              />
            </div>
            <p className="text-sm text-[#000000] mt-2">
              If you wish to provide the Hash ID later, <a href="#" className="text-[#7A44FF] underline">Click here</a>
            </p>
            <p className="text-xs text-[#000000] mt-1">
              Please note that if you send a different amount, corresponding USD value will be adjusted accordingly.
            </p>
          </form>
        </div>
        <div className="flex justify-center">
          <button className="w-full max-w-lg bg-[#7A44FF] text-white font-semibold rounded-lg py-3 mt-2 transition hover:bg-[#6a3be6] disabled:opacity-60">Submit</button>
        </div>
      </div>
    </Layout>
  );
};

export default SuccessDeposit; 