import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import QRCode from "react-qr-code";
import googleAuthLogo from "../../assets/images/google_auth_logo.png";
import appleAuthLogo from "../../assets/images/apple_auth_logo.png";
import TwoFAConfirmation from "./TwoFAConfirmation.jsx";
import encryptData from '../../utils/encryption/encryption';
import hashing from '../../utils/encryption/hashing';
import { updateTwoFA } from '../../store/slices/profileSlice';
import { getUser } from "../../store/slices/authSlice";

const TwoFA = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  // All hooks at the top
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(59);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [status, setStatus] = useState("");
  const [statusError, setStatusError] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [code, setCode] = useState("");
  const [copyMsg, setCopyMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (timer > 0 && isResendDisabled) {
      const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(countdown);
    } else {
      setIsResendDisabled(false);
    }
  }, [timer, isResendDisabled]);

  // Success & error feedback auto clear
  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => {
        dispatch(getUser());
        setStatus("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  useEffect(() => {
    if (statusError) {
      const timer = setTimeout(() => {
        dispatch(getUser());
        setStatusError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [statusError]);


  const handleConfirm = () => {
    setShowConfirmModal(false);
    setTimer(0);
    setStatus("✅ 2FA has been enabled successfully.");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(user.twokey?.base32 || "");
    setCopyMsg("Copied!");
    setTimeout(() => setCopyMsg(""), 2000);
  };

  const handleUpdate = async () => {
    setLoading(true);
    setStatus("");

    const data = { code };
    const { encryptedData, id } = encryptData(data);
    const { reqdata } = hashing(data, id);
    const payload = { data: encryptedData, reqid: id, reqdata };

    const result = await dispatch(updateTwoFA(payload));
    if (result.type && result.type.endsWith("fulfilled")) {
      setStatus("✅ 2FA has been enabled successfully.");
    } else {
      const msg = result.payload || result.error?.message || "Invalid code.";
      setStatusError("❌ " + msg);
      setLoading(false);
    }

    
  };

  // ✅ Conditional rendering AFTER hooks
  if (user?.is_2fa_active) {
    return (
      <div className="flex items-center justify-center h-full bg-white dark:bg-zinc-900">
        <div className="bg-green-100 border border-green-300 rounded px-4 py-2 text-green-800 text-sm font-medium shadow-sm">
          2FA is active on your account
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Status messages */}
      {status && (
        <div className="mb-4 text-center border border-green-800 bg-green-100 text-green-900 rounded" style={{ borderRadius: 5, padding: '12px 20px', fontWeight: 600 }}>
          {status}
        </div>
      )}
      {statusError && (
        <div className="mb-4 text-center border border-red-800 bg-red-100 text-red-900 rounded" style={{ borderRadius: 5, padding: '12px 20px', fontWeight: 600 }}>
          {statusError}
        </div>
      )}

      <div className="h-full flex items-center justify-center bg-white dark:bg-zinc-900 relative">
        <div className="bg-[#f6eeff] dark:bg-zinc-800 rounded-2xl p-6 sm:p-10 text-center max-w-4xl w-full shadow-md">
          <div className="max-w-lg mx-auto">
            <h2 className="md:text-3xl sm:text-2xl text-xl font-semibold text-gray-900 dark:text-white mb-2">
              2FA (Two-Factor Authentication)
            </h2>
            <p className="text-md text-gray-700 dark:text-gray-300 mb-0">
              Download 2FA app from:
            </p>
            <div className="flex items-center justify-center gap-2 mb-0">
              <a href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en" target="_blank" rel="noopener noreferrer">
                <img src={googleAuthLogo} alt="Google Authenticator" className="w-40 object-contain" />
              </a>
              <a href="http://apps.apple.com/us/app/google-authenticator/id388497605" target="_blank" rel="noopener noreferrer">
                <img src={appleAuthLogo} alt="Apple Authenticator" className="w-40 object-contain" />
              </a>
            </div>
            <p className="text-md text-gray-700 dark:text-gray-300 mb-2">Scan the QR code below with your authenticator app.</p>

            <div className="flex flex-col items-center gap-2 mb-4">
              {user.twokey?.otpauth_url && (
                <QRCode value={user.twokey.otpauth_url} size={140} />
              )}
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs font-mono bg-gray-200 dark:bg-zinc-700 px-2 py-1 rounded select-all dark:text-white">{user.twokey?.base32}</span>
                <button
                  onClick={handleCopy}
                  className="text-xs px-2 py-1 bg-[#7A44FF] text-white rounded hover:bg-[#5a2bbf]"
                  type="button"
                >
                  Copy
                </button>
                {copyMsg && <span className="text-green-600 dark:text-white text-md ml-2">{copyMsg}</span>}
              </div>
            </div>

            <div className="mb-4">
              <input
                type="text"
                value={code}
                onChange={e => setCode(e.target.value)}
                maxLength={6}
                placeholder="Enter 2FA code"
                className="w-full py-2 px-4 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-md dark:bg-zinc-700 dark:text-white dark:border-zinc-600 text-center text-base"
              />
            </div>
            <button
              onClick={handleUpdate}
              disabled={loading || !code}
              className="w-full bg-[#7A44FF] hover:bg-[#5a2bbf] text-white py-2 rounded-md font-medium transition disabled:opacity-60"
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </div>

        {/* Modal */}
        {showConfirmModal && (
          <TwoFAConfirmation
            cancel={() => setShowConfirmModal(false)}
            enable={handleConfirm}
          />
        )}
      </div>
    </>
  );
};

export default TwoFA;
