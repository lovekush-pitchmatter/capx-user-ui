import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import SuccessModal from "../common/SuccessModal";
import { getUser } from '../../store/slices/authSlice';
import { sendEmailOtp, verifyEmailOtp } from '../../store/slices/profileSlice';
import encryptData from '../../utils/encryption/encryption';
import hashing from '../../utils/encryption/hashing';

const SecurityPin = () => {
  const dispatch = useDispatch();
  const [step, setStep] = useState("email");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    let interval;
    if (otpSent && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  const handleSendOtp = async () => {
    setErrors({});
    setSuccessMsg("");
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setErrors({ email: "*Please enter a valid email address." });
      return;
    }
    setLoading(true);
    try {

      const data = { email };
      const { encryptedData, id } = encryptData(data);
      const { reqdata } = hashing(data, id);
      const payload = { data: encryptedData, reqid: id, reqdata };
      const result = await dispatch(sendEmailOtp(payload));
      if (sendEmailOtp.fulfilled.match(result)) {
        setOtpSent(true);
        setStep("otp");
        setTimer(60);
        // setSuccessMsg("OTP sent to your email.");
      } else {
        setErrors({ email: "Failed to send OTP" || "Failed to send OTP." });
      }
    } catch (err) {

      console.log("error", err)
      setErrors({ email: "Failed to send OTP." });
    }
    setLoading(false);
  };

  const handleSubmitOtp = async () => {
    setErrors({});
    setSuccessMsg("");
    setLoading(true);
    try {

      const data = { email, otp };
      const { encryptedData, id } = encryptData(data);
      const { reqdata } = hashing(data, id);
      const payload = { data: encryptedData, reqid: id, reqdata };
      const result = await dispatch(verifyEmailOtp(payload));
      if (verifyEmailOtp.fulfilled.match(result)) {
        setShowSuccess(true);
        setStep("done");
        setSuccessMsg("Your Email has been successfully updated.");
        await dispatch(getUser());
      } else {
        setErrors({ otp: result.payload || "Invalid OTP." });
      }
    } catch (err) {
      setErrors({ otp: "Invalid OTP." });
    }
    setLoading(false);
  };

  return (
    <>
      <div className="max-w-4xl mx-auto py-10 px-4 bg-purple-100 dark:bg-zinc-800 rounded-xl shadow text-gray-800 dark:text-white">
        {step === "email" && (
          <div className="text-center flex flex-col items-center justify-center gap-6 max-w-md mx-auto">
            <h2 className="text-2xl font-bold">Update Email</h2>
            <p>We will send a One-Time Password (OTP) to your new email. Enter the OTP to update your Email.</p>
            <input
              type="email"
              className="border w-full py-2 px-6 focus:ring-2 focus:ring-[#7A44FF] outline-none rounded-xl border-2 border-gray-400 dark:bg-zinc-700 dark:text-white dark:border-zinc-600"
              placeholder="Enter new email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={loading}
            />
            {errors.email && <p className="text-red-500 text-start text-sm">{errors.email}</p>}
            {successMsg && <p className="text-green-600 text-sm">{successMsg}</p>}
            <button
              onClick={handleSendOtp}
              className="bg-[#7A44FF] text-white px-4 py-2 rounded-xl hover:bg-violet-800"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </div>
        )}
        {step === "otp" && (
          <div className="text-center flex items-center justify-center flex-col gap-6 max-w-md mx-auto">
            <h2 className="text-2xl font-bold">Verify Email</h2>
            <p>Enter the One-Time Password (OTP) sent to your email address.</p>
            <div className="flex flex-col gap-6">
              <div className="relative">
                <input
                  className="border w-full py-2 px-6 pr-28 focus:ring-2 focus:ring-[#7A44FF] outline-none rounded-xl border-2 border-gray-400 dark:bg-zinc-700 dark:text-white dark:border-zinc-600"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  disabled={loading}
                />
                {timer > 0 ? (
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm text-[#7A44FF] font-semibold">
                    00:{timer.toString().padStart(2, "0")}
                  </span>
                ) : (
                  <button
                    onClick={handleSendOtp}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm text-[#7A44FF] font-semibold hover:underline"
                    disabled={loading}
                  >
                    Resend OTP
                  </button>
                )}
              </div>

              {errors.otp && (
                <p className="text-red-500 text-start text-sm">{errors.otp}</p>
              )}
              {successMsg && <p className="text-green-600 text-sm">{successMsg}</p>}
              <button
                onClick={handleSubmitOtp}
                className="bg-[#7A44FF] text-white px-4 py-2 rounded-xl hover:bg-violet-800"
                disabled={loading}
              >
                {loading ? "Verifying..." : "Submit"}
              </button>
              <p className="text-purple-500 text-xs font-semibold italic">
                *OTP has been sent to your email. Please check your inbox (and spam folder).
              </p>
            </div>
          </div>
        )}
      </div>

      {showSuccess && (
        <SuccessModal
          onClose={() => setShowSuccess(false)}
          title="Success!"
          description="Your Email has been successfully updated."
          buttonLabel="Done"
        />
      )}
    </>
  );
};

export default SecurityPin;
