import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { sendTransferOtpThunk } from '../../store/slices/transactionSlice';
import { verifyOtp } from '../../store/slices/authSlice';

const coins = [
  { label: "CAPShield (CAPX)", value: "capx", balance: 13.99646785, min: 10, fee: 2 },
  // Add more coins as needed
];
const networks = [
  { label: "Ethereum", value: "eth", display: "Ethereum" },
  { label: "Binance Smart Chain (BEP20)", value: "bsc", display: "BNB Smart Chain (BEP20)" },
  // Add more networks as needed
];

const fiatCurrencies = [
  { label: "USD", value: "usd", balance: 4725.18, min: 10, fee: 2 },
  // Add more fiat currencies as needed
];
const fiatWithdrawalModes = [
  { label: "Bank Transfer", value: "bank" },
  { label: "PayPal", value: "paypal" },
  // Add more modes as needed
];
const fiatPaymentMethods = [
  { label: "SWIFT", value: "swift" },
  { label: "ACH", value: "ach" },
  // Add more methods as needed
];
const fiatNetworks = [
  { label: "SWIFT Network", value: "swift" },
  { label: "ACH Network", value: "ach" },
  // Add more networks as needed
];

function WithdrawalSummaryModal({ open, onClose, summary, onSubmit }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 relative border border-[#7703D9]">
        <button
          className="absolute top-4 right-4 text-2xl text-[#7703D9] hover:text-[#AF01F3] focus:outline-none"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-center mb-6 text-[#2D1153]">Withdrawal Summary</h2>
        <div className="border border-[#7703D9] rounded-xl mb-6 divide-y divide-[#E0E0E0] overflow-hidden">
          <div className="flex justify-between items-center px-4 py-3">
            <span className="text-[#2D1153] text-base font-medium">Amount</span>
            <span className="font-semibold text-base text-[#2D1153]">{summary.amount} CAPX</span>
          </div>
          <div className="flex justify-between items-center px-4 py-3">
            <span className="text-[#7703D9] text-base font-medium">Receive Address</span>
            <span className="flex items-center gap-1 font-mono text-base text-[#7703D9] select-all">
              {summary.address}
              <button className="ml-1" onClick={() => {navigator.clipboard.writeText(summary.address)}} type="button" tabIndex={-1}>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" stroke="#7703D9" strokeWidth="2"/><rect x="3" y="3" width="13" height="13" rx="2" stroke="#7703D9" strokeWidth="2"/></svg>
              </button>
            </span>
          </div>
          <div className="flex justify-between items-center px-4 py-3">
            <span className="text-[#7703D9] text-base font-medium">Network</span>
            <span className="font-semibold text-base text-[#2D1153]">{summary.networkDisplay}</span>
          </div>
          <div className="flex justify-between items-center px-4 py-3">
            <span className="text-[#7703D9] text-base font-medium">Network Fee</span>
            <span className="font-semibold text-base text-[#2D1153]">{summary.fee} CAPX</span>
          </div>
        </div>
        <ul className="mb-6 text-sm text-[#2D1153] space-y-2">
          <li className="flex items-start gap-2"><span className="mt-2 w-2 h-2 rounded-full bg-[#7703D9] inline-block"></span> <span>Please ensure the address is correct and belongs to the selected network.</span></li>
          <li className="flex items-start gap-2"><span className="mt-2 w-2 h-2 rounded-full bg-[#7703D9] inline-block"></span> <span>Transactions are final and cannot be cancelled.</span></li>
        </ul>
        <button
          className="w-full py-3 rounded-2xl font-semibold text-white text-lg mt-2 shadow-lg"
          style={{ background: 'linear-gradient(90deg, #3D06BE 0%, #7703D9 50%, #AF01F3 100%)' }}
          onClick={onSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

function SecurityVerificationModal({ open, onClose, details, onConfirm, buttonLabel }) {
  const dispatch = useDispatch();
  const [pin, setPin] = useState(["", "", "", "", "", ""]);
  const [emailCode, setEmailCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [otpError, setOtpError] = useState("");

  const handlePinChange = (idx, val) => {
    if (/^\d?$/.test(val)) {
      const newPin = [...pin];
      newPin[idx] = val;
      setPin(newPin);
      if (val && idx < 5) {
        document.getElementById(`pin-input-${idx + 1}`)?.focus();
      }
    }
  };

  const handleGetCode = async () => {
    setSending(true);
    setOtpError("");
    try {
      await dispatch(sendTransferOtpThunk()).unwrap();
      setCodeSent(true);
    } catch (err) {
      setOtpError(typeof err === 'string' ? err : 'Failed to send OTP');
    }
      setSending(false);
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setVerifying(true);
    setOtpError("");
    try {
      await dispatch(verifyOtp({ otp: emailCode })).unwrap();
      onConfirm();
    } catch (err) {
      setOtpError(typeof err === 'string' ? err : 'Invalid OTP');
    }
    setVerifying(false);
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative">
        <button
          className="absolute top-3 right-3 text-2xl text-[#7A44FF] hover:text-[#B500EF]"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-center mb-1 text-[#7A44FF]">Security verification</h2>
        <p className="text-center text-gray-700 mb-4 text-sm">Confirm your withdrawal by completing the security checks below.</p>
        <div className="border rounded-xl mb-6 px-4 py-3">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-[#7A44FF]">Amount</span>
            <span className="font-semibold">{details.amountLabel}</span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-[#7A44FF]">Asset</span>
            <span className="font-semibold">{details.assetLabel}</span>
          </div>
          <div className="flex flex-col text-sm mt-2">
            <span className="text-[#7A44FF]">Wallet Address</span>
            <span className="font-mono text-xs break-all text-[#7A44FF] font-semibold">{details.address}</span>
          </div>
        </div>
        <form onSubmit={handleOtpSubmit}>
          <label className="block text-sm font-medium mb-2">Enter Security PIN</label>
          <div className="flex gap-2 justify-center mb-4">
            {pin.map((digit, idx) => (
              <input
                key={idx}
                id={`pin-input-${idx}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                className="w-10 h-10 border-2 border-[#7A44FF] rounded-lg text-center text-xl font-bold focus:outline-none focus:border-[#B500EF]"
                value={digit}
                onChange={e => handlePinChange(idx, e.target.value)}
              />
            ))}
          </div>
          <label className="block text-sm font-medium mb-2">Email Verification Code</label>
          <div className="flex gap-2 mb-1">
            <input
              type="text"
              className="flex-1 border rounded px-3 py-2 focus:outline-none"
              placeholder="Enter Email verification code"
              value={emailCode}
              onChange={e => setEmailCode(e.target.value)}
            />
            <button
              type="button"
              className="px-3 py-2 rounded bg-gradient-to-r from-[#7A44FF] to-[#B500EF] text-white font-semibold text-sm disabled:opacity-60"
              onClick={handleGetCode}
              disabled={sending || codeSent}
            >
              {codeSent ? "Sent" : sending ? "Sending..." : "Get code"}
            </button>
          </div>
          <div className="text-xs text-gray-500 mb-4">Enter the 6-digit verification code sent to your email</div>
          {otpError && <div className="text-red-500 text-xs mb-2">{otpError}</div>}
          <button
            type="submit"
            className="w-full py-2 rounded-xl font-semibold text-white bg-gradient-to-r from-[#7A44FF] to-[#B500EF] transition-all hover:opacity-90 mt-2"
            disabled={verifying}
          >
            {verifying ? "Verifying..." : buttonLabel}
          </button>
        </form>
      </div>
    </div>
  );
}

function WithdrawalSuccessModal({ open, onClose }) {
  const navigate = useNavigate();
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative flex flex-col items-center">
        <button
          className="absolute top-3 right-3 text-2xl text-[#7A44FF] hover:text-[#B500EF]"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="w-full flex flex-col items-center justify-center mb-4 mt-2">
          {/* Placeholder for success image/icon */}
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-2">
            {/* You can replace this with a real icon/image if available */}
            <svg width="40" height="40" fill="#7A44FF" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#F3E8FF"/><path d="M8 12.5l2.5 2.5L16 9" stroke="#7A44FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center mb-2">Withdrawal Successful</h2>
        <p className="text-center text-gray-700 mb-6">Your withdrawal request has been submitted.<br/>You may visit History to check the status of your withdrawal.</p>
        <div className="flex gap-3 w-full justify-center">
          <button
            className="flex-1 py-2 rounded-xl font-semibold border border-[#7A44FF] text-[#7A44FF] bg-white transition-all hover:bg-[#F8F3FF]"
            onClick={() => { onClose(); navigate("/balance"); }}
          >
            View Wallet
          </button>
          <button
            className="flex-1 py-2 rounded-xl font-semibold text-white bg-gradient-to-r from-[#7A44FF] to-[#B500EF] transition-all hover:opacity-90"
            onClick={() => { onClose(); navigate("/withdraw-history"); }}
          >
            View History
          </button>
        </div>
      </div>
    </div>
  );
}

const WithdrawFunds = () => {
  const [tab, setTab] = useState("crypto");
  const [coin, setCoin] = useState(coins[0].value);
  const [address, setAddress] = useState("");
  const [network, setNetwork] = useState("");
  const [addressType, setAddressType] = useState("external");
  const [amount, setAmount] = useState("");
  const [showSummary, setShowSummary] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Fiat state
  const [fiatCurrency, setFiatCurrency] = useState(fiatCurrencies[0].value);
  const [fiatMode, setFiatMode] = useState("");
  const [fiatMethod, setFiatMethod] = useState("");
  const [fiatNetwork, setFiatNetwork] = useState("");
  const [fiatAddress, setFiatAddress] = useState("");
  const [fiatAmount, setFiatAmount] = useState("");
  const [showFiatVerification, setShowFiatVerification] = useState(false);

  // Other User (internal transfer) state
  const [otherUsername, setOtherUsername] = useState("");
  const [otherUsernameStatus, setOtherUsernameStatus] = useState("idle"); // idle, verifying, valid, invalid
  const [otherAmount, setOtherAmount] = useState("");
  const [otherNote, setOtherNote] = useState("");
  const [otherReceiveAmount, setOtherReceiveAmount] = useState(0);

  // Simulate username verification
  const handleVerifyUsername = () => {
    setOtherUsernameStatus("verifying");
    setTimeout(() => {
      if (otherUsername === "aaravmehra") {
        setOtherUsernameStatus("valid");
      } else if (otherUsername) {
        setOtherUsernameStatus("invalid");
      } else {
        setOtherUsernameStatus("idle");
      }
    }, 1000);
  };

  const selectedCoin = coins.find((c) => c.value === coin);
  const selectedNetwork = networks.find((n) => n.value === network);
  const selectedFiat = fiatCurrencies.find((c) => c.value === fiatCurrency);

  const handleContinue = (e) => {
    e.preventDefault();
    setShowSummary(true);
  };

  const handleCloseSummary = () => setShowSummary(false);
  const handleSubmit = () => {
    setShowSummary(false);
    setShowVerification(true);
  };
  const handleCloseVerification = () => setShowVerification(false);
  const handleConfirmVerification = () => {
    setShowVerification(false);
    setShowSuccess(true);
  };
  const handleCloseSuccess = () => setShowSuccess(false);

  // Fiat submit handler
  const handleFiatSubmit = (e) => {
    e.preventDefault();
    setShowFiatVerification(true);
  };
  const handleCloseFiatVerification = () => setShowFiatVerification(false);
  const handleConfirmFiatVerification = () => {
    setShowFiatVerification(false);
    setShowSuccess(true);
  };

  return (
    <Layout>
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
              <form className="bg-white border rounded-2xl shadow p-6 flex flex-col gap-4" onSubmit={handleContinue}>
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
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-1">Withdrawal Address</label>
                      <input
                        type="text"
                        className="w-full border rounded px-3 py-2 focus:outline-none"
                        placeholder="Enter Address"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        required
                      />
                    </div>
                    {/* Network Selector */}
                    <div>
                      <label className="block text-sm font-medium mb-1">Network</label>
                      <select
                        className="w-full border rounded px-3 py-2 focus:outline-none"
                        value={network}
                        onChange={e => setNetwork(e.target.value)}
                        required
                      >
                        <option value="">Select withdrawal network</option>
                        {networks.map((n) => (
                          <option key={n.value} value={n.value}>{n.label}</option>
                        ))}
                      </select>
                    </div>
                    {/* Info Box */}
                    <div className="bg-[#EADAFD] rounded-xl p-4 flex flex-col gap-2 text-xs text-[#3D06BE] mb-2">
                      <div className="flex justify-between">
                        <span>CAPX Token Balance</span>
                        <span className="font-semibold">{selectedCoin.balance} CAPX</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Minimum Withdrawal</span>
                        <span className="font-semibold">{selectedCoin.min.toFixed(4)} CAPX</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Network Fee</span>
                        <span className="font-semibold">{selectedCoin.fee.toFixed(2)} CAPX</span>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 rounded-2xl font-semibold text-white text-lg mt-2 shadow-lg"
                      style={{ background: 'linear-gradient(90deg, #3D06BE 0%, #7703D9 50%, #AF01F3 100%)' }}
                    >
                      Continue
                    </button>
                  </>
                )}
                {/* Other User Form (unchanged) */}
              {addressType === "user" && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-1">Recipient Username:</label>
                    <div className="flex gap-2 items-center">
                      <input
                        type="text"
                        className={`flex-1 border rounded px-3 py-2 focus:outline-none ${otherUsernameStatus === "valid" ? "border-green-500" : otherUsernameStatus === "invalid" ? "border-red-500" : ""}`}
                        placeholder="Enter Username"
                        value={otherUsername}
                        onChange={e => { setOtherUsername(e.target.value); setOtherUsernameStatus("idle"); }}
                        disabled={otherUsernameStatus === "verifying"}
                      />
                      {otherUsernameStatus === "idle" && !!otherUsername && (
                        <button
                          type="button"
                          className="px-4 py-2 rounded bg-gradient-to-r from-[#7A44FF] to-[#B500EF] text-white font-semibold text-sm"
                          onClick={handleVerifyUsername}
                        >
                          Verify
                        </button>
                      )}
                      {otherUsernameStatus === "verifying" && (
                        <span className="text-[#7A44FF] text-xs">Verifying...</span>
                      )}
                      {otherUsernameStatus === "valid" && (
                        <span className="text-green-600 text-xl">&#10003;</span>
                      )}
                      {otherUsernameStatus === "invalid" && (
                        <span className="text-red-500 text-xl">&#10007;</span>
                      )}
                    </div>
                    {otherUsernameStatus === "valid" && (
                      <div className="flex items-center gap-1 text-green-600 text-xs mt-1"><span>&#10003;</span> Username Verified</div>
                    )}
                    {otherUsernameStatus === "invalid" && (
                      <div className="flex items-center gap-1 text-red-500 text-xs mt-1"><span>&#10007;</span> Invalid Username</div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Withdraw Amount:</label>
                    <div className="flex gap-2 items-center">
                      <input
                        type="number"
                        className="flex-1 border rounded px-3 py-2 focus:outline-none"
                        placeholder="Enter Amount"
                        value={otherAmount}
                        onChange={e => setOtherAmount(e.target.value)}
                      />
                      <button
                        type="button"
                        className="px-2 py-1 rounded bg-gray-100 text-[#7A44FF] font-semibold text-xs"
                        onClick={() => setOtherAmount("11254.341")}
                      >
                        MAX
                      </button>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Available balance: 11254.341 CAPX</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Note (optional)</label>
                    <input
                      type="text"
                      className="w-full border rounded px-3 py-2 focus:outline-none"
                      placeholder="Enter Note"
                      value={otherNote}
                      onChange={e => setOtherNote(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-1 mb-2">
                    <div className="flex justify-between text-xs">
                      <span>Receive Amount</span>
                      <span className="font-semibold">{otherReceiveAmount} CAPX</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="w-full py-2 rounded-xl font-semibold text-white bg-gradient-to-r from-[#7A44FF] to-[#B500EF] mt-2 transition-all hover:opacity-90"
                  >
                    Send Funds
                  </button>
                </>
              )}
              </form>
            </>
          )}

          {/* Fiat Withdraw Form */}
          {tab === "fiat" && (
            <form className="bg-white border rounded-2xl shadow p-8 flex flex-col gap-5" onSubmit={handleFiatSubmit}>
              <div>
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
              </button>
            </form>
          )}

        </div>
      </div>
      <WithdrawalSummaryModal
        open={showSummary}
        onClose={handleCloseSummary}
        summary={{
          amount: Number(amount).toFixed(8),
          address,
          networkDisplay: selectedNetwork ? selectedNetwork.display : "",
          fee: selectedCoin.fee.toFixed(2),
        }}
        onSubmit={handleSubmit}
      />
      <SecurityVerificationModal
        open={showVerification}
        onClose={handleCloseVerification}
        details={{
          amountLabel: `USD ${amount || "0"}`,
          assetLabel: `${selectedCoin.label} (${selectedNetwork ? selectedNetwork.display : ""})`,
          address,
        }}
        onConfirm={handleConfirmVerification}
        buttonLabel="Confirm"
      />
      <SecurityVerificationModal
        open={showFiatVerification}
        onClose={handleCloseFiatVerification}
        details={{
          amountLabel: `USD ${Number(fiatAmount || 0).toFixed(2)}`,
          assetLabel: `${selectedFiat.label} (${fiatNetwork ? fiatNetworks.find(n => n.value === fiatNetwork)?.label : ""})`,
          address: fiatAddress,
        }}
        onConfirm={handleConfirmFiatVerification}
        buttonLabel="Submit Withdrawal"
      />
      <WithdrawalSuccessModal open={showSuccess} onClose={handleCloseSuccess} />
    </Layout>
  );
};

export default WithdrawFunds;
