import React, { useState } from 'react';
import Layout from "../../components/layout/Layout";
import refImg from "../../assets/images/referral.png";
import totalH from "../../assets/images/total-referrals.png";
import allTH from "../../assets/images/ath.png";
import connectWallet from "../../assets/images/connect-wallet.png";
 
const ReferralDashboard = () => {
  const [referralLink, setReferralLink] = useState('https://capshield.io/lovekushtari');
  const [showEntries, setShowEntries] = useState('10');
  const [dateRange, setDateRange] = useState('01 June 2025 - 30 June 2025');
  const [statusFilter, setStatusFilter] = useState('All status');
  const [searchQuery, setSearchQuery] = useState('');
  const [claimAmount, setClaimAmount] = useState("$0");

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    // You can add a toast notification here
  };

  const withdrawalData = [];

  return (
    <Layout>
    <div className="min-h-screen bg-gray-50 p-1.5 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Section - Referral Program and Earnings Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Referral Program Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Referral Program</h2>
            <hr className="border-t border-gray-200 mb-4" />
            <div>
                  {/* Referral Link Input */}
                  <div className="rounded-lg  mb-6">
                    <h3 className="text-sm font-medium text-gray-600 mb-2 uppercase">YOUR REFERRAL LINK</h3>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="text"
                        value={referralLink}
                        onChange={(e) => setReferralLink(e.target.value)}
                        className="flex-1 px-3 py-2 bg-white border border-black rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
                        readOnly
                      />
                      <button
                        onClick={copyToClipboard}
                        className="bg-gradient-to-r from-purple-600 to-purple-800 hover:opacity-90 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors w-full sm:w-auto"
                      >
                        Copy
                      </button>
                    </div>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-xl">
                    <div className="flex flex-row items-start gap-4">
                      {/* Left side content */}
                      <div className="w-1/2">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">Earn USDT Instantly</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          Share your unique link and earn 5% rewards on every purchase made through it! Invite friends—earn together!
                        </p>
                      </div>
                      {/* Right side image */}
                      <div className="w-1/2 flex justify-center items-center">
                        <img src={refImg} alt="referral" className="max-h-28 object-contain" />
                      </div>
                    </div>
                    {/* Button aligned bottom below full content */}
                    <div className="mt-4 flex justify-start">
                      <button className="bg-gradient-to-r from-purple-600 to-purple-800 hover:opacity-90 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors">
                        How it works
                      </button>
                    </div>
                  </div>
            </div>
          </div>

          {/* Your Referral Earnings Card */}
<div className="bg-white rounded-2xl border border-gray-200 p-3 shadow-sm">
  <h2 className="text-lg font-semibold text-gray-700 mb-4">
    Your Referral Earnings
  </h2>
  <hr className="border-t border-gray-200 mb-4" />

  {/* Available to Claim */}
  <div className="mb-6">
    <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
      AVAILABLE TO CLAIM
    </p>
    <div className="rounded-lg p-1 flex items-center justify-between">
      <div className="relative flex items-center w-full">
        <input
          type="text"
          placeholder='Enter claim amount.'
          value={claimAmount}
          onChange={(e) => setClaimAmount(e.target.value)}
          className="w-full pl-3 pr-20 py-2 rounded-lg border border-black text-sm text-gray-800 focus:outline-none"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1 rounded-lg bg-white border border-gray-300 text-xs font-medium text-gray-600">
          MIN: $30.00
        </span>
      </div>
    </div>
  </div>


  {/* Gradient Button */}
  <button className="w-full bg-gradient-to-r from-[#B500EF] to-[#37009A] hover:opacity-90 text-white py-3 rounded-lg font-medium transition-all duration-200 mb-6">
    Convert to CAPX
  </button>

  {/* Stats */}
  <div className="grid grid-cols-2 gap-2">
    <div className="border border-500-gray rounded-lg p-2 flex items-center gap-4">
      <div className="bg-purple-100 rounded-full flex items-center justify-center">
        <img src={allTH} alt="all-time-earnings"  />
      </div>
      <div className="flex flex-col">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          ALL-TIME EARNINGS
        </p>
        <p className="text-lg font-bold text-gray-800">$0.00</p>
      </div>
    </div>

    <div className="border border-500-gray rounded-lg p-2 flex items-center gap-4">
      <div className="bg-purple-100 rounded-full flex items-center justify-center">
        <img src={totalH} alt="total-referrals" className="w-15 h-15" />
      </div>
      <div className="flex flex-col">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          TOTAL REFERRALS
        </p>
        <p className="text-lg font-bold text-gray-800">0</p>
      </div>
    </div>
  </div>
</div>

        </div>

        {/* Referral Program Steps */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Referral Program</h2>
            <hr className="border-t border-gray-200 mb-2" />
            <p className="text-sm text-gray-500">Share & Earn Instantly</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* Step 1 */}
            <div className="border border-gray-200 rounded-lg p-4 text-left">
              <div className="w-full max-w-[100%] h-[100px] bg-green-50 rounded-lg mx-auto flex items-center justify-center border border-green-100">
                <img src={connectWallet} alt="Connect Your Wallet" className="w-full object-cover rounded-lg" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-3 text-lg pt-5">Connect Your Wallet</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Link your crypto wallet securely to unlock your referral dashboard.</p>
            </div>

            {/* Step 2 */}
            <div className="border border-gray-200 rounded-lg p-4 text-left">
              <div className="w-full max-w-[100%] h-[100px] bg-green-50 rounded-lg mx-auto flex items-center justify-center border border-green-100">
                <img src={connectWallet} alt="Share Your Unique Link" className="w-full object-cover rounded-lg" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-3 text-lg pt-5">Share Your Unique Link</h3>
                <p className="text-sm text-gray-600 leading-relaxed">Copy your referral link and share it with friends via any network.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="border border-gray-200 rounded-lg p-4 text-left">
              <div className="w-full max-w-[100%] h-[100px] bg-green-50 rounded-lg mx-auto flex items-center justify-center border border-green-100">
                <img src={connectWallet} alt="Earn 5% Instantly" className="w-full object-cover rounded-lg"/>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-3 text-lg pt-5">Earn 5% Instantly</h3>
                <p className="text-sm text-gray-600 leading-relaxed">Get 5% cashback per referral – paid in crypto or convert to CAPX.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Referral Withdrawals Table */}
        <div className="bg-white rounded-xl border border-gray-200 p-3">
          <h2 className="text-lg font-semibold text-gray-700 mb-6">Referral Withdrawals</h2>
          <hr className="border-t border-gray-200 mb-6" />
          
          {/* Filters Row */}
          <div className="bg-purple-50 rounded-lg p-4 mb-6">
            {/* top selectors in a single row on mobile (3 columns) and desktop */}
            <div className="grid grid-cols-3 gap-3 items-center">
              <div>
                <label className="text-sm text-gray-600 block mb-1">Show</label>
                <select
                  value={showEntries}
                  onChange={(e) => setShowEntries(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-600 block mb-1">Date</label>
                <div className="relative">
                  <input
                    type="text"
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    placeholder="DD/MM/YY"
                    className="w-full pl-3 pr-10 py-2 rounded-lg border border-gray-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                  </svg>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-600 block mb-1">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="All status">All status</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>

            {/* search bar spanning full width below selectors */}
            <div className="mt-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Table */}
          <div>
            {/* Desktop table - visible on md+ */}
            <div className="hidden md:block">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-purple-50 text-purple-700 ">
                    <th className="text-left py-3 px-4 font-semibold text-sm">SI. No</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">Amount</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">Token</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {withdrawalData.length > 0 ? (
                    withdrawalData.map((row, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4 text-sm text-gray-800">{String(row.id).padStart(2, '0')}</td>
                        <td className="py-3 px-4 text-sm text-gray-800">{row.date}</td>
                        <td className="py-3 px-4 text-sm text-gray-800 font-medium">{row.amount}</td>
                        <td className="py-3 px-4">
                          <span className={`font-medium ${row.status === 'Completed' ? 'text-green-600' : 'text-orange-500'}`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-800 font-medium">{row.token}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="py-6 px-4 text-center text-sm text-gray-500">No withdrawals available.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile header strip + stacked rows (no horizontal scroll) */}
            <div className="md:hidden">
              <div className="bg-purple-50 rounded-lg p-4 mb-3">
                <div className="grid grid-cols-5 gap-3 text-purple-700 font-semibold text-sm">
                  <div>Sl. No</div>
                  <div>Date</div>
                  <div>Amount</div>
                  <div>Status</div>
                  <div>Token</div>
                </div>
              </div>

              <div className="space-y-3">
                {withdrawalData.length > 0 ? (
                  withdrawalData.map((row, idx) => (
                    <div key={idx} className="bg-white rounded-lg border border-gray-200 p-3">
                      <div className="grid grid-cols-5 gap-3 items-center">
                        <div className="text-sm text-gray-800">{String(row.id).padStart(2, '0')}</div>
                        <div className="text-sm text-gray-800">{row.date}</div>
                        <div className="text-sm font-medium text-gray-800">{row.amount}</div>
                        <div>
                          <span className={`font-medium ${row.status === 'Completed' ? 'text-green-600' : 'text-orange-500'}`}>
                            {row.status}
                          </span>
                        </div>
                        <div className="text-sm font-medium text-gray-800">{row.token}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-6 px-4 text-center text-sm text-gray-500">No withdrawals available.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default ReferralDashboard;
