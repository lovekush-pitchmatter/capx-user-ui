import React, { useState, useEffect, useRef } from "react";

const RESEND_WAIT = 30;

const OtpModal = ({ open, onClose, onVerify, onResend, loading, error, email }) => {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (open) {
      setOtp("");
      setTimer(0);
    }
  }, [open]);

  useEffect(() => {
    if (timer > 0) {
      intervalRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(intervalRef.current);
    }
  }, [timer]);

  if (!open) return null;

  const handleVerify = (e) => {
    e.preventDefault();
    if (otp.length === 6) {
      onVerify(otp);
    }
  };

  const handleResend = async () => {
    if (timer === 0 && !loading) {
      await onResend();
      setTimer(RESEND_WAIT);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-2xl flex flex-col items-center justify-center shadow-xl py-8 px-6 max-w-xs w-full relative text-center">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700">✕</button>
        <h2 className="text-xl font-bold mb-2">Verify OTP</h2>
        <p className="text-sm text-gray-600 mb-4">Enter the 6-digit OTP sent to <span className="font-semibold">{email}</span></p>
        <form onSubmit={handleVerify} className="w-full flex flex-col items-center gap-2">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value.toUpperCase().slice(0, 6))}
            className="text-center tracking-widest w-40 px-3 py-2 border border-gray-300 rounded-md text-lg font-mono mb-2"
            placeholder="------"
            maxLength={6}
            autoFocus
          />
          {error && <div className="text-red-500 text-xs mb-1">{error}</div>}
          <button
            type="submit"
            className="w-full bg-[#7A44FF] text-white rounded-md py-2 font-semibold disabled:bg-gray-400"
            disabled={loading || otp.length !== 6}
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>
        <button
          onClick={handleResend}
          className="mt-3 text-xs text-[#7A44FF] hover:underline disabled:text-gray-400"
          disabled={loading || timer > 0}
        >
          {timer > 0 ? `Resend OTP (wait ${timer}s)` : 'Resend OTP'}
        </button>
      </div>
    </div>
  );
};

export default OtpModal;
