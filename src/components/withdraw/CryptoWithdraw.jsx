import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { walletBalance } from '../../store/slices/profileSlice';
import { verifyUsername, processCryptoWithdraw, sendCryptoWithdrawOtpThunk, confirmCryptoWithdraw } from '../../store/slices/transactionSlice';
import { verifyOtp } from '../../store/slices/authSlice';
import { useNavigate } from "react-router-dom";
import encryptData from "../../utils/encryption/encryption";
import hashing from "../../utils/encryption/hashing";

const networks = [
    { label: "Ethereum", value: "eth", display: "Ethereum" },
    { label: "Binance Smart Chain (BEP20)", value: "bsc", display: "BNB Smart Chain (BEP20)" },
];

function WithdrawalSummaryModal({ open, onClose, summary, onSubmit, isSubmitting, reqid }) {
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
                        <span className="font-semibold text-base text-[#2D1153]">{summary.amount} {summary.coinLabel}</span>
                    </div>
                    <div className="flex justify-between items-center px-4 py-3">
                        <span className="text-[#7703D9] text-base font-medium">Receive Address</span>
                        <span className="flex items-center gap-1 font-mono text-base text-[#7703D9] select-all">
                            {summary.address}
                            <button className="ml-1" onClick={() => { navigator.clipboard.writeText(summary.address) }} type="button" tabIndex={-1}>
                                <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" stroke="#7703D9" strokeWidth="2" /><rect x="3" y="3" width="13" height="13" rx="2" stroke="#7703D9" strokeWidth="2" /></svg>
                            </button>
                        </span>
                    </div>
                    <div className="flex justify-between items-center px-4 py-3">
                        <span className="text-[#7703D9] text-base font-medium">Network</span>
                        <span className="font-semibold text-base text-[#2D1153]">{summary.networkDisplay}</span>
                    </div>
                    <div className="flex justify-between items-center px-4 py-3">
                        <span className="text-[#7703D9] text-base font-medium">Network Fee</span>
                        <span className="font-semibold text-base text-[#2D1153]">{summary.fee} {summary.coinLabel}</span>
                    </div>
                </div>
                <ul className="mb-6 text-sm text-[#2D1153] space-y-2">
                    <li className="flex items-start gap-2"><span className="mt-2 w-2 h-2 rounded-full bg-[#7703D9] inline-block"></span> <span>Please ensure the address is correct and belongs to the selected network.</span></li>
                    <li className="flex items-start gap-2"><span className="mt-2 w-2 h-2 rounded-full bg-[#7703D9] inline-block"></span> <span>Transactions are final and cannot be cancelled.</span></li>
                </ul>
                <button
                    className="w-full py-3 rounded-2xl font-semibold text-white text-lg mt-2 shadow-lg flex justify-center items-center"
                    style={{ background: 'linear-gradient(90deg, #3D06BE 0%, #7703D9 50%, #AF01F3 100%)' }}
                    onClick={onSubmit}
                    disabled={isSubmitting}
                >
                    {isSubmitting && (
                        <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    )}
                    {isSubmitting ? "Processing..." : "Submit"}
                </button>
            </div>
        </div>
    );
}

function SecurityVerificationModal({ open, onClose, details, onConfirm, txnid }) {
    const dispatch = useDispatch();
    const [pin, setPin] = useState(["", "", "", "", "", ""]);
    const [emailCode, setEmailCode] = useState("");
    const [codeSent, setCodeSent] = useState(false);
    const [sending, setSending] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const [otpError, setOtpError] = useState("");
    const [otpSuccess, setOtpSuccess] = useState("");
    const [disableBtn, setDisableBtn] = useState(true)

    // Encrypt txnid for OTP request
    const handleGetCode = async () => {
        setSending(true);
        setOtpError("");
        setOtpSuccess("");
        try {

            
            const { encryptedData, id } = encryptData({ txnid });
            const { reqdata } = hashing({ txnid }, id);
            const payload = {
                data: encryptedData,
                reqid: id,
                reqdata: reqdata,
            };
            const result = await dispatch(sendCryptoWithdrawOtpThunk(payload))
            if (result.type && result.type.endsWith("fulfilled")) {
                    
                setDisableBtn(false);
                setCodeSent(true);
                setOtpSuccess("OTP sent successfully.");
            
            } else {

                setCodeSent(true);
                setOtpError(result?.payload?.message);
            }
            
        } catch (err) {
            setOtpError(typeof err === 'string' ? err : 'Failed to send OTP');
        }
        setSending(false);
    };

    // Validate OTP code and submit
    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        setVerifying(true);
        setOtpError("");
        setOtpSuccess("");
        // Validate OTP code
        if (!emailCode || isNaN(emailCode) || emailCode.length < 6) {
            setOtpError("Please enter a valid 6-digit OTP code.");
            setVerifying(false);
            return;
        }
        // Validate PIN (2FA)
        const pinCode = pin.join("");
        if (!pinCode || isNaN(pinCode) || pinCode.length < 6) {
            setOtpError("Please enter a valid 6-digit 2FA code.");
            setVerifying(false);
            return;
        }
        try {
            // Encrypt and dispatch confirmCryptoWithdraw
            const data = {
                email_otp: emailCode,
                reqid: txnid,
                code: pinCode,
            };
            const { encryptedData, id } = encryptData(data);
            const { reqdata } = hashing(data, id);
            const payload = {
                data: encryptedData,
                reqid: id,
                reqdata: reqdata,
            };
            const result = await dispatch(confirmCryptoWithdraw(payload));
            if (result.type && result.type.endsWith("fulfilled")) {
                    
                onConfirm();
            
            } else {
                setErrorMsg(result?.payload?.message || "Invalid Email OTP or 2FA code.");
                setTimeout(() => setErrorMsg(""), 8000);
            }

            
        } catch (err) {
            setOtpError(typeof err === 'string' ? err : 'Invalid Email OTP or 2FA code.');
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
                <h2 className="text-2xl font-bold text-center mb-1 text-[#7A44FF]">Security Verification</h2>
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
                    <label className="block text-sm font-medium mb-2">Enter 2FA Code / 6 Digit Pin</label>
                    <div className="flex gap-2 mb-4">
                        {pin.map((digit, idx) => (
                            <input
                                key={idx}
                                id={`pin-input-${idx}`}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                className="w-10 h-10 border-2 border-[#7A44FF] rounded-lg text-center text-xl font-bold focus:outline-none focus:border-[#B500EF]"
                                value={digit}
                                onChange={e => {
                                    if (/^\d?$/.test(e.target.value)) {
                                        const newPin = [...pin];
                                        newPin[idx] = e.target.value;
                                        setPin(newPin);
                                        if (e.target.value && idx < 5) {
                                            document.getElementById(`pin-input-${idx + 1}`)?.focus();
                                        }
                                    }
                                }}
                                onKeyDown={e => {
                                    if (e.key === "Backspace" && !pin[idx] && idx > 0) {
                                        document.getElementById(`pin-input-${idx - 1}`)?.focus();
                                    }
                                }}
                            />
                        ))}
                    </div>
                    <label className="block text-sm font-medium mb-2">Email Verification Code</label>
                    <div className="flex gap-2 mb-1">
                        <input
                            type="text"
                            inputMode="numeric"
                            maxLength={6}
                            pattern="\d*"
                            className="flex-1 border rounded px-3 py-2 focus:outline-none"
                            placeholder="Enter Email verification code"
                            value={emailCode}
                            onChange={e => {
                                const val = e.target.value.replace(/\D/g, "");
                                setEmailCode(val);
                            }}
                        />
                        <button
                            type="button"
                            className="px-3 py-2 rounded bg-gradient-to-r from-[#7A44FF] to-[#B500EF] text-white font-semibold text-sm disabled:opacity-60"
                            onClick={handleGetCode}
                            disabled={sending}
                        >
                            {codeSent ? "Resend" : sending ? "Sending..." : "Get code"}
                        </button>
                    </div>
                    {codeSent && <div className="text-xs text-gray-500 mb-4">Enter the 6-digit verification code sent to your email</div>}
                    {otpSuccess && <div className="text-green-500 text-xs mb-2">{otpSuccess}</div>}
                    {otpError && <div className="text-red-500 text-xs mb-2">{otpError}</div>}
                    <button
                        type="submit"
                        style={{
                            marginTop: 30,
                            background: disableBtn
                                ? 'linear-gradient(90deg, #e5e7eb 0%, #d1d5db 100%)'
                                : 'linear-gradient(90deg, #7A44FF 0%, #B500EF 100%)',
                            cursor: disableBtn ? 'not-allowed' : 'pointer'
                        }}
                        className={`w-full py-2 rounded-xl font-semibold text-white transition-all flex justify-center items-center
                            ${disableBtn ? "hover:cursor-not-allowed" : "bg-gradient-to-r from-[#7A44FF] to-[#B500EF] hover:opacity-90"}
                        `}
                        disabled={disableBtn}
                    >
                        {verifying && (
                            <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        )}
                        {verifying ? "Verifying..." : "Confirm"}
                    </button>
                </form>
            </div>
        </div>
    );
}

function WithdrawalSuccessModal({ open, onClose, summary }) {
    const navigate = useNavigate();
    // Format amount based on coin type
    let formattedAmount = summary.amount;
    if (summary.coinLabel === "USD") {
        formattedAmount = Number(summary.amount).toFixed(2);
    } else if (["ETH", "BNB"].includes(summary.coinLabel)) {
        formattedAmount = Number(summary.amount).toFixed(4);
    }
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
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                        <svg width="40" height="40" fill="#7A44FF" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#F3E8FF" /><path d="M8 12.5l2.5 2.5L16 9" stroke="#7A44FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-center mb-2">Withdrawal Successful</h2>
                <div className="mb-4 text-center text-gray-700">
                    <div><b>Amount:</b> {formattedAmount} {summary.coinLabel}</div>
                    <div><b>Network:</b> {summary.networkDisplay}</div>
                    <div>
                        <b>Address:</b>
                        <div className="break-all max-w-xs mx-auto text-gray-700 font-mono text-sm mt-1">{summary.address}</div>
                    </div>
                </div>
                <p className="text-center text-gray-700 mb-6">Your withdrawal request has been submitted.<br />You may visit History to check the status of your withdrawal.</p>
                <div className="flex gap-3 w-full justify-center">
                    <button
                        className="flex-1 py-2 rounded-xl font-semibold border border-[#7A44FF] text-[#7A44FF] bg-white transition-all hover:bg-[#F8F3FF]"
                        onClick={() => { onClose(); navigate("/balance"); }}
                    >
                        View Wallet
                    </button>
                    <button
                        className="flex-1 py-2 rounded-xl font-semibold text-white bg-gradient-to-r from-[#7A44FF] to-[#B500EF] transition-all hover:opacity-90"
                        onClick={() => { onClose(); navigate("/withdrawal-report"); }}
                    >
                        View History
                    </button>
                </div>
            </div>
        </div>
    );
}

const CryptoWithdraw = ({ cointype }) => {
    const dispatch = useDispatch();
    const userWalletBalance = useSelector((state) => state.profile.userWalletBalance);
    const [coin, setCoin] = useState(cointype);
    const [address, setAddress] = useState("");
    const [network, setNetwork] = useState("");
    const [amount, setAmount] = useState("");
    const [showSummary, setShowSummary] = useState(false);
    const [showVerification, setShowVerification] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [txnid, setTxnid] = useState("");

    useEffect(() => {
        dispatch(walletBalance());
    }, [dispatch]);

    const coins = [
        { label: "CAPShield (CAPX)", value: "capx", balance: userWalletBalance?.user_total_tokens_unlocked || 0, min: 10, fee: 0.00 },
        { label: "ETH", value: "eth", balance: userWalletBalance?.eth || 0, min: 0.01, fee: 0.00 },
        { label: "BNB", value: "bnb", balance: userWalletBalance?.bnb || 0, min: 0.01, fee: 0.00 },
        { label: "USD", value: "usd", balance: userWalletBalance?.wallet_amount || 0, min: 10, fee: 0.00 },
    ];
    const selectedCoin = coins.find((c) => c.value === cointype) || coins[0];
    const selectedNetwork = networks.find((n) => n.value === network);

    const handleSummarySubmit = async (e) => {
        if (e) e.preventDefault();
        setIsSubmitting(true);
        // Prepare withdrawal request
        const enteredAmount = Number(amount);
        if (isNaN(enteredAmount) || enteredAmount <= 0) {
            setErrorMsg("Please enter a valid withdrawal amount.");
            setTimeout(() => setErrorMsg(""), 8000);
            setIsSubmitting(false);
            return;
        }
        if (enteredAmount > selectedCoin.balance) {
            setErrorMsg("Withdrawal amount exceeds available balance. Please enter amount less than or equal to available balance.");
            setTimeout(() => setErrorMsg(""), 8000);
            setIsSubmitting(false);
            return;
        }
        if (!address || address.length < 10) {
            setErrorMsg("Please enter a valid wallet address.");
            setTimeout(() => setErrorMsg(""), 8000);
            setIsSubmitting(false);
            return;
        }
        // Encrypt and dispatch withdrawal
        const data = {
            amount,
            type: "crypto",
            wallet_address: address,
            cointype: selectedCoin.value,
            withdrawal_network: selectedNetwork ? selectedNetwork.value : "eth",
        };
        const { encryptedData, id } = encryptData(data);
        const { reqdata } = hashing(data, id);
        const payload = {
            data: encryptedData,
            reqid: id,
            reqdata: reqdata,
        };
        const result = await dispatch(processCryptoWithdraw(payload));
        if (result.type && result.type.endsWith("fulfilled")) {
            console.log("Withdrawal initiated, txn id:", result.payload.reqid);
            if(result.payload.reqid){

                setTxnid(result.payload.reqid);
                setShowSummary(false);
                setShowVerification(true);

            }else{
                
                setErrorMsg("Withdrawal failed. Please try again.");

            }
            
        } else {
            setErrorMsg(result?.payload?.message || "Withdrawal failed. Please try again.");
            setTimeout(() => setErrorMsg(""), 8000);
        }
        setIsSubmitting(false);
    };

    const handleConfirmVerification = () => {
        setShowVerification(false);
        setShowSuccess(true);
    };
    const handleCloseSuccess = () => setShowSuccess(false);

    return (
        <div>
            <div className="bg-white border rounded-2xl shadow p-6 flex flex-col gap-4">
                <div>
                    <label className="block text-sm font-medium mb-3 mt-3">Withdraw Amount</label>
                    <input
                        type="number"
                        className="w-full border rounded px-3 py-2 focus:outline-none"
                        placeholder={`Enter amount (Min ${selectedCoin.min})`}
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        min={selectedCoin.min}
                        max={selectedCoin.balance}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-3 mt-3">Withdrawal Address</label>
                    <input
                        type="text"
                        className="w-full border rounded px-3 py-2 focus:outline-none"
                        placeholder="Enter Address"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-3 mt-3">Network</label>
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
                <div className="bg-[#EADAFD] mb-3 mt-3 rounded-xl p-4 flex flex-col gap-2 text-xs text-[#3D06BE] mb-2">
                    <div className="flex justify-between">
                        <span>{selectedCoin.label} Balance</span>
                        <span className="font-semibold">{selectedCoin.balance} {selectedCoin.value.toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Minimum Withdrawal</span>
                        <span className="font-semibold">{selectedCoin.min.toFixed(4)} {selectedCoin.value.toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Network Fee</span>
                        <span className="font-semibold">{selectedCoin.fee ? selectedCoin.fee.toFixed(2) : "0.00"} {selectedCoin.value.toUpperCase()}</span>
                    </div>
                </div>
                {errorMsg && (
                    <div className="mb-2 p-3 rounded-[10px] border border-red-400 bg-red-50 text-red-700 text-sm text-center transition-opacity duration-300">
                        {errorMsg}
                    </div>
                )}
                <button
                    type="button"
                    className="w-full py-3 rounded-2xl font-semibold text-white text-lg mt-2 shadow-lg flex justify-center items-center"
                    style={{ background: 'linear-gradient(90deg, #3D06BE 0%, #7703D9 50%, #AF01F3 100%)' }}
                    disabled={isSubmitting}
                    onClick={() => handleSummarySubmit()}
                >
                    {isSubmitting && (
                        <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    )}
                    {isSubmitting ? "Submitting..." : "Continue"}
                </button>
            </div>

            <WithdrawalSummaryModal
                open={showSummary}
                onClose={() => setShowSummary(false)}
                summary={{
                    reqid: txnid,
                    amount: Number(amount).toFixed(8),
                    address,
                    networkDisplay: selectedNetwork ? selectedNetwork.display : "",
                    fee: selectedCoin.fee ? selectedCoin.fee.toFixed(2) : "0.00",
                    coinLabel: selectedCoin.value.toUpperCase(),
                }}
                onSubmit={handleSummarySubmit}
                isSubmitting={isSubmitting}
            />


            <SecurityVerificationModal
                open={showVerification}
                onClose={() => setShowVerification(false)}
                details={{
                    amountLabel: `${selectedCoin.value.toUpperCase()} ${amount || "0"}`,
                    assetLabel: `${selectedCoin.label} (${selectedNetwork ? selectedNetwork.display : ""})`,
                    address,
                }}
                onConfirm={handleConfirmVerification}
                txnid={txnid}
            />
            <WithdrawalSuccessModal
                open={showSuccess}
                onClose={handleCloseSuccess}
                summary={{
                    amount: Number(amount).toFixed(8),
                    address,
                    networkDisplay: selectedNetwork ? selectedNetwork.display : "",
                    coinLabel: selectedCoin.value.toUpperCase(),
                }}
            />
        </div>
    );
};

export default CryptoWithdraw;