import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../components/layout/Layout";
import TransferConfirmation from "./transfer-confirmation";
import Success from "./success";
import { verifyUsername, transferAmount } from "../../store/slices/transactionSlice";
import encryptData from "../../utils/encryption/encryption";
import hashing from "../../utils/encryption/hashing";
import { toast, Bounce, ToastContainer } from "react-toastify";

const paymentConfigs = {
  nowpayment: {
    coins: ["ETH", "USDT (TRC-20)", "USDT (ERC-20)", "USDT (BEP-20)", "USD"],
    chains: {
      ETH: "ETH",
      BNB: "BNB",
      "USDT (TRC-20)": "TRON",
      "USDT (ERC-20)": "ETH",
      "USDT (BEP-20)": "Binance Smart Chain (BSC)",
      USD: "USD"
    },
  },
}; 

const Transfer = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    currency: "",
    amount: "",
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [depositCoin, setDepositCoin] = useState("ETH");
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [usernameVerified, setUsernameVerified] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [fullname, setFullname] = useState("");
  const [toUserId, setToUserId] = useState(null);

    const toastOptions = {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce
    };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "username") {
      setUsernameVerified(false);
      setUsernameError("");
      setToUserId(null);
    }
  };

  const handleVerifyUsername = async () => {
    setVerifyLoading(true);
    setUsernameError("");
    try {
      const result = await dispatch(verifyUsername({ username: formData.username })).unwrap();
      if (result.status === "ok") {
        setUsernameVerified(true);
        setToUserId(result?.user?.userId);
        setFullname(result?.user?.fullname);
        setUsernameError("");
      } else {
        setUsernameVerified(false);
        setUsernameError("Username not found or not verified.");
      }
    } catch (err) {
      setUsernameVerified(false);
      setUsernameError(err.message || "Username verification failed.");
    }
    setVerifyLoading(false);
  };

  const isFormValid =
    usernameVerified &&
    formData.username &&
    depositCoin &&
    formData.amount &&
    !isNaN(Number(formData.amount)) &&
    Number(formData.amount) > 0;

  const handleNext = () => {
    setShowConfirmation(true);
  };

  const handleTransferConfirm = async (twofa, otp) => {
    // code can be OTP or confirmation code if needed
    const type = depositCoin === "USD" ? "usd" : "crypto";
    const cointype = depositCoin;
    const data = {
      amount: formData.amount,
      toUserId,
      type,
      code: twofa,
      cointype,
      otp
    }

    const { encryptedData, id } = encryptData(data);
    const { reqdata } = hashing(data, id);

    if (!encryptedData || !id || !reqdata || isNaN(id)) {
      setButtonLoading(false);
      throw new Error("Invalid request data. Try again.");
    }

    const finalData = { data: encryptedData, reqid: id, reqdata };

    try {
      const result = await dispatch(transferAmount(finalData)).unwrap();
      if(result.type === transferAmount.fulfilled.type && result.payload.status === "ok") {
          setShowConfirmation(false);
          setShowSuccess(true);
      }else{
          toast.error(result.payload.message || "Transfer failed. Please try again.", toastOptions);
          setShowConfirmation(false);
          setShowSuccess(false);
      }
    } catch (err) {
      toast.error("Transfer failed!! Please try again.", toastOptions);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center p-6 font-sans">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <h2 className="text-2xl mb-6 text-black-800 text-center">Transfer Funds to</h2>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-black">Username</label>
            <div className="relative">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Enter username"
                className={`w-full p-2 border border-gray-300 rounded-md text-sm pr-16 ${usernameVerified ? "border-green-500" : ""}`}
                disabled={usernameVerified}
              />
              <button
                type="button"
                className="absolute top-0 right-0 h-full px-4 bg-gradient-to-r from-[#B500EF] to-[#37009A] text-white rounded-r-md hover:from-blue-500 hover:to-purple-500 flex items-center"
                onClick={handleVerifyUsername}
                disabled={verifyLoading || !formData.username || usernameVerified}
              >
                {usernameVerified ? (
                  <span className="text-green-500 font-bold">&#10003;</span>
                ) : verifyLoading ? (
                  <span className="animate-spin">...</span>
                ) : (
                  "Verify"
                )}
              </button>
            </div>
            {usernameError && (
              <div className="text-red-500 text-xs mt-2">{usernameError}</div>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-black">Currency</label>
            <select
              value={depositCoin}
              onChange={(e) => setDepositCoin(e.target.value)}
              className="w-full px-4 py-2 rounded border"
            >
              {paymentConfigs.nowpayment.coins.map((coin) => (
                <option key={coin} value={coin}>
                  {coin}
                </option>
              ))}
            </select> 
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-black">Amount</label>
            <input
              type="text"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              placeholder="Enter Amount"
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
          <button
            className={`w-full h-[44px] bg-gradient-to-r from-[#B500EF] to-[#37009A] text-white font-semibold rounded hover:bg-purple-700 ${!usernameVerified ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={handleNext}
            disabled={!isFormValid || !usernameVerified}
          >
            Next
          </button>
        </div>
      </div>
      {showConfirmation && (
        <TransferConfirmation
          onClose={() => setShowConfirmation(false)}
          onConfirm={handleTransferConfirm}
          amount={formData.amount}
          toUserId={toUserId}
          fullname={fullname}
          username={formData.username}
          type={depositCoin === "USD" ? "usd" : "crypto"}
          cointype={depositCoin}
        />
      )}
      {showSuccess && <Success onClose={() => setShowSuccess(false)} />}
    </Layout>
  );
};

export default Transfer;
