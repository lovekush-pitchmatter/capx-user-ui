import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchReferralWithdrawals, getReferralDetails, convertCapx } from "../../store/slices/rewardsHubSlice";
import { getUser } from "../../store/slices/authSlice";
import Layout from "../../components/layout/Layout";
import refImg from "../../assets/images/referral.png";
import totalH from "../../assets/images/total-referrals.png";
import allTH from "../../assets/images/ath.png";
import connectWallet from "../../assets/images/connect-wallet.png";
import encryptData from "../../utils/encryption/encryption";
import hashing from "../../utils/encryption/hashing";
import { set } from "react-hook-form";
import { Copy, Check } from "lucide-react";
  
const ReferralDashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.user);
  const referralWithdrawals = useSelector((state) => state.rewards?.referralWithdrawals);
  const referralDetails = useSelector((state) => state.rewards?.referralDetails);
  const [copied, setCopied] = useState(false);
  
  // Add loading state
  const [isLoading, setIsLoading] = useState(true);
  const [referralLink, setReferralLink] = useState(`https://capshield.io/${user?.referral_id}`);
  const [showEntries, setShowEntries] = useState('10');
  const [startDate, setStartDate] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const [endDate, setEndDate] = useState(new Date());
  const [statusFilter, setStatusFilter] = useState('All status');
  const [searchQuery, setSearchQuery] = useState('');
  const [claimAmount, setClaimAmount] = useState(0);
  const [calculatedCapx, setCalculatedCapx] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isButtonLoading, setIsButtonLoading] = useState(false); // Rename to distinguish from page loading

  // Format number to always show 2 decimal places
  const formatNumber = (num) => {
    if (num === undefined || num === null) return "0.00";
    return parseFloat(num).toFixed(2);
  };

  // Check if claim amount is valid
  const isValidAmount = () => {
    const minAmount = 30; // Minimum amount requirement
    const availableAmount = parseFloat(referralDetails?.data?.availableReferralEarnings || 0);
    const amount = parseFloat(claimAmount);
    
    return !isNaN(amount) && amount >= minAmount && amount <= availableAmount;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setIsButtonLoading(true); // Start loading button
    setErrorMessage(""); // Clear previous error messages
    setSuccessMessage(""); // Clear previous success messages

    try {
      // Validate input amount
      if (!isValidAmount()) {
        setErrorMessage("Please enter a valid claim amount (minimum $30.00, not exceeding available balance).");
        setIsButtonLoading(false);
        return;
      }

      const data = {
        amount: claimAmount,
      };
      const { encryptedData, id } = encryptData(data);
      const { reqdata } = hashing(data, id);
      const payload = {
        data: encryptedData,
        reqid: id,
        reqdata: reqdata,
      };

      const result = await dispatch(convertCapx(payload));
      
      if (result.type && result.type.endsWith("fulfilled")) {
        setSuccessMessage("Conversion successful! Your CAPX tokens will be credited soon.");
      } else {
        setErrorMessage("Conversion failed. Please try again later.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsButtonLoading(false);
      setSubmitted(false);
    }
  };

  const updateClaimAmount = async(amount) => {
    setClaimAmount(amount);
    const capxAmount = amount * (referralDetails?.data?.currentCapxWorth || 0);
    // console.log("Calculated CAPX Amount:", capxAmount, referralDetails?.data?.currentCapxWorth, referralDetails?.data);
    setCalculatedCapx(capxAmount);
  }

  // Fetch data and handle loading state
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await Promise.all([
          dispatch(getUser()),
          dispatch(fetchReferralWithdrawals()),
          dispatch(getReferralDetails())
        ]);
      } catch (error) {
        console.error("Error fetching referral data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [dispatch]);

  // Update referral link when user data is available - MOVED UP before conditional return
  useEffect(() => {
    if (user?.referral_id) {
      setReferralLink(`https://capshield.io/${user.referral_id}`);
    }
  }, [user]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    // You can add a toast notification here
  };

  const withdrawalData = [];

  // Show loading UI when data is being fetched
  if (isLoading) {
    return (
      <Layout>
        <div className="bg-white h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500 mb-4"></div>
            <p className="text-gray-600">Loading referral data...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout menu_one="Referral" menu_two="Referral Dashboard">
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
                        className="bg-gradient-to-r from-purple-600 to-purple-800 hover:opacity-90 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors w-full sm:w-auto flex items-center"
                      >
                        {copied ? <Check size={16} /> : <Copy size={16} />}{' '}
                        {copied ? 'Copied!' : 'Copy'}
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
                  </div>
            </div>
          </div>

          {/* Your Referral Earnings Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-3 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Your Referral Earnings
            </h2>
            <hr className="border-t border-gray-200 mb-4" />

            {/* Display success message if present */}
            {successMessage && (
              <div className="mb-4 p-3 bg-green-100 border border-green-200 text-green-800 rounded-lg">
                {successMessage}
              </div>
            )}
            
            {/* Display error message if present */}
            {errorMessage && (
              <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-800 rounded-lg">
                {errorMessage}
              </div>
            )}

            {/* Available to Claim */}
            <div className="mb-6">
              <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
                AVAILABLE TO CLAIM: ${formatNumber(referralDetails?.data?.availableReferralEarnings)}
              </p>
              <div className="rounded-lg p-1 flex items-center justify-between">
                <div className="relative flex items-center w-full">
                  <input
                    type="text"
                    placeholder='Enter claim amount.'
                    value={claimAmount}
                    onChange={(e) => updateClaimAmount(e.target.value)}
                    className="w-full pl-3 pr-20 py-2 rounded-lg border border-black text-sm text-gray-800 focus:outline-none"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1 rounded-lg bg-white border border-gray-300 text-xs font-medium text-gray-600">
                    MIN: $30.00
                  </span>
                </div>
              </div>
              {claimAmount > 0 && (
                <div className="flex items-center">
                  <span className="text-xs font-medium text-gray-600">You will receive:</span>
                  <span className="text-sm font-semibold text-gray-800 ml-1">{formatNumber(calculatedCapx)} CAPX</span>
                </div>
              )}
            </div>

            {/* Gradient Button - Conditionally styled and with loading state */}
            <button 
              onClick={handleSubmit}
              disabled={!isValidAmount() || isButtonLoading}
              className={`w-full py-3 rounded-lg font-medium transition-all duration-200 mb-6 flex justify-center items-center ${
                isValidAmount() && !isButtonLoading 
                  ? "bg-gradient-to-r from-[#B500EF] to-[#37009A] hover:opacity-90 text-white cursor-pointer" 
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {isButtonLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "Convert to CAPX"
              )}
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
                  <p className="text-lg font-bold text-gray-800">${formatNumber(referralDetails?.data?.totalReferralEarnings)}</p>
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
                  <p className="text-lg font-bold text-gray-800">{referralDetails?.data?.totalNumberOfReferrals || 0}</p>
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
          <div className="bg-purple-50 rounded-xl p-4 mb-6 flex flex-col md:flex-row md:items-center md:gap-4">
            <div className="flex flex-row gap-3 w-full md:w-auto items-center">
              <label className="text-xs text-gray-500 font-medium mr-1">Show</label>
              <div>
                <select
                  value={showEntries}
                  onChange={(e) => setShowEntries(e.target.value)}
                  className="px-3 py-2 border border-[#B5A7D6] rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                </select>
              </div>
              <div className="relative">
                <DatePicker
                  selected={startDate}
                  onChange={(dates) => {
                    const [start, end] = dates;
                    setStartDate(start);
                    setEndDate(end);
                  }}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Select date range"
                  className="pl-3 pr-10 py-2 rounded-lg border border-[#B5A7D6] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 min-w-[240px] w-[240px]"
                />
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                </svg>
              </div>
              <div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-[#B5A7D6] rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="All status">All status</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
            <div className="mt-3 md:mt-0 md:ml-auto w-full md:w-1/3">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full pl-10 pr-3 py-2 rounded-lg border border-[#B5A7D6] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-gray-400"
                />
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
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
                        <td className="py-3 px-4 text-sm text-gray-800 font-medium">${formatNumber(row.amount)}</td>
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
                {referralWithdrawals?.data?.length > 0 ? (
                  referralWithdrawals.data.map((row, idx) => (
                    <div key={idx} className="bg-white rounded-lg border border-gray-200 p-3">
                      <div className="grid grid-cols-5 gap-3 items-center">
                        <div className="text-sm text-gray-800">{String(row.id).padStart(2, '0')}</div>
                        <div className="text-sm text-gray-800">{row.createdAt}</div>
                        <div className="text-sm font-medium text-gray-800">${formatNumber(row.amount)}</div>
                        <div>
                          <span className={`font-medium ${row.transaction_status === 'completed' ? 'text-green-600' : 'text-orange-500'}`}>
                            {row.transaction_status}
                          </span>
                        </div>
                        <div className="text-sm font-medium text-gray-800">{formatNumber(row.converted_amount)}</div>
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
