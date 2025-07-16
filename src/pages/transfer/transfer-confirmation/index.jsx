import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendTransferOtpThunk } from "../../../store/slices/transactionSlice";

const TransferConfirmation = ({
  onClose,
  onConfirm,
  amount,
  toUserId,
  fullname,
  username,
  type,
  cointype,
}) => {
  const dispatch = useDispatch();
  const { sendTransferOtp } = useSelector((state) => state.transaction);
  const [otpSent, setOtpSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [otp, setOtp] = useState("");
  const [twofa, setTwofa] = useState("");

  const handleSendOtp = async () => {
    try {
      await dispatch(sendTransferOtpThunk()).unwrap();
      setOtpSent(true);
      setResendTimer(60);
      const timer = setInterval(() => {
        setResendTimer((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            setOtpSent(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      console.error("Failed to send OTP:", error);
      // You can add error handling here, like showing a toast notification
    }
  };

  const handleNext = () => {
    if (onConfirm) {
      onConfirm({ otp, twofa, amount, toUserId, type, cointype });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">
      <div className="bg-white rounded-lg border-2 border-purple-600 shadow-lg p-6 w-full max-w-md relative space-y-4">
        <button
          className="absolute text-xl right-4  mt-[-3] w-8 h-8 text-gray-500 hover:text-gray-800 border border-purple-300 rounded-full line-height-8"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold text-center mb-6">P2P transfer confirm</h2>
        <div className="border-2 border-purple-600 p-3 rounded-lg">
          <div className="space-y-4 ">
            <div className="flex justify-between">
              <span className="text-black">Transferring to:</span>
              <span className="text-purple-600 font-medium">{fullname || username}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-black">Currency:</span>
              <span className="text-purple-600 font-medium">{cointype}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-black">Amount:</span>
              <span className="text-purple-600 font-medium">{amount}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-black">Email Verification:</span>
              {otpSent ? (
                <div className="flex flex-col items-end">
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={e => setOtp(e.target.value)}
                    className="w-32 p-2 border border-gray-300 rounded-md text-sm mb-1"
                  />
                  <span className="text-xs text-gray-500">Resend OTP in {resendTimer}s</span>
                </div>
              ) : (
                <button
                  onClick={handleSendOtp}
                  disabled={sendTransferOtp?.loading}
                  className={`bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-md px-4 py-2 hover:from-blue-500 hover:to-purple-500 ${
                    sendTransferOtp?.loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {sendTransferOtp?.loading ? 'Sending...' : 'Send OTP'}
                </button>
              )}
            </div>
            <div className="flex items-center justify-between">
              <label className="block text-black mb-2">2FA Code</label>
              <div>
                <input
                  type="text"
                  placeholder="Enter 2FA Code"
                  value={twofa}
                  onChange={e => setTwofa(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
            </div>
          </div>
          <button
            className={`w-full h-[44px] bg-gradient-to-r from-[#B500EF] to-[#37009A] text-white font-semibold rounded mt-6 hover:bg-purple-700 ${(!twofa || !otp || !otpSent) ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={handleNext}
            disabled={!twofa || !otp || !otpSent}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransferConfirmation;