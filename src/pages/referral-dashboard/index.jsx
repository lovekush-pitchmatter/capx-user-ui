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
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Section - Referral Program and Earnings Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Referral Program Card */}
          <div className="bg-[#F6EEFE] rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Referral Program</h2>
            <div className="bg-[#F6EEFE]">
                  {/* Referral Link Input */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={referralLink}
                        onChange={(e) => setReferralLink(e.target.value)}
                        className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        readOnly
                      />
                      <button
                        onClick={copyToClipboard}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        Copy
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-3">Earn USDT Instantly</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Share your unique link and earn 5% rewards on every purchase made through it! Invite friends—earn together!
                      </p>
                    </div>
                    
                    {/* Illustration */}
                    <div className="flex-shrink-0">
                      <img src={refImg} alt="referral" className="w-32 h-24 object-contain" />
                    </div>
                  </div>
            </div>
          </div>

          {/* Your Referral Earnings Card */}
<div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
  <h2 className="text-lg font-semibold text-gray-700 mb-4">
    Your Referral Earnings
  </h2>

  {/* Available to Claim */}
  <div className="mb-6">
    <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
      AVAILABLE TO CLAIM
    </p>
    <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
      <div className="relative flex items-center w-full">
        <input
          type="text"
          placeholder='Enter claim amount.'
          value={claimAmount}
          onChange={(e) => setClaimAmount(e.target.value)}
          className="w-full pl-3 pr-20 py-2 rounded-lg border border-gray-300 text-sm text-gray-800 focus:outline-none"
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
  <div className="grid grid-cols-2 gap-4">
    <div className="bg-gray-50 rounded-lg p-4 flex items-center gap-4">
      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
        <img src={allTH} alt="all-time-earnings" className="w-15 h-15" />
      </div>
      <div className="flex flex-col">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          ALL-TIME EARNINGS
        </p>
        <p className="text-lg font-bold text-gray-800">$0.00</p>
      </div>
    </div>

    <div className="bg-gray-50 rounded-lg p-4 flex items-center gap-4">
      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
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
            <p className="text-sm text-gray-500">Share & Earn Instantly</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Step 1 */}
            <div className="border border-gray-200 rounded-lg p-4 text-left">
              <div className="w-full max-w-[100%] h-[180px] bg-green-50 rounded-lg mx-auto mb-6 flex items-center justify-center border border-green-100 p-4">
                <img src={connectWallet} alt="Connect Your Wallet" className="w-full h-full object-contain" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-3 text-lg">Connect Your Wallet</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Link your crypto wallet securely to unlock your referral dashboard.</p>
            </div>

            {/* Step 2 */}
            <div className="border border-gray-200 rounded-lg p-4 text-left">
              <div className="w-full max-w-[100%] h-[180px] bg-green-50 rounded-lg mx-auto mb-6 flex items-center justify-center border border-green-100 p-4">
                <img src={connectWallet} alt="Share Your Unique Link" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-3 text-lg">Share Your Unique Link</h3>
                <p className="text-sm text-gray-600 leading-relaxed">Copy your referral link and share it with friends via any network.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="border border-gray-200 rounded-lg p-4 text-left">
              <div className="w-full max-w-[100%] h-[180px] bg-green-50 rounded-lg mx-auto mb-6 flex items-center justify-center border border-green-100 p-4">
                <img src={connectWallet} alt="Earn 5% Instantly" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-3 text-lg">Earn 5% Instantly</h3>
                <p className="text-sm text-gray-600 leading-relaxed">Get 5% cashback per referral – paid in crypto or convert to CAPX.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Referral Withdrawals Table */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-6">Referral Withdrawals</h2>
          
          {/* Filters Row */}
          <div className="bg-purple-50 rounded-lg p-4 mb-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Show</span>
                <select
                  value={showEntries}
                  onChange={(e) => setShowEntries(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                  placeholder="01 June 2025 - 30 June 2025"
                />
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                </svg>
              </div>
              
              <div className="flex items-center gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                >
                  <option value="All status">All status</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                </select>
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              </div>
              
              <div className="ml-auto">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="pl-8 pr-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                  />
                  <svg className="absolute left-2.5 top-1.5 w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-purple-50">
                  <th className="text-left py-4 px-4 font-semibold text-purple-700 text-sm">Sl. No</th>
                  <th className="text-left py-4 px-4 font-semibold text-purple-700 text-sm">Date</th>
                  <th className="text-left py-4 px-4 font-semibold text-purple-700 text-sm">Amount</th>
                  <th className="text-left py-4 px-4 font-semibold text-purple-700 text-sm">Status</th>
                  <th className="text-left py-4 px-4 font-semibold text-purple-700 text-sm">Token</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {withdrawalData.length > 0 ? (
                  withdrawalData.map((row, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4 text-sm text-gray-800">{row.id}</td>
                      <td className="py-4 px-4 text-sm text-gray-800">{row.date}</td>
                      <td className="py-4 px-4 text-sm text-gray-800 font-medium">{row.amount}</td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                          row.status === 'Completed' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-orange-100 text-orange-700'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-800 font-medium">{row.token}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-6 px-4 text-center text-sm text-gray-500">
                      No withdrawals available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default ReferralDashboard;
