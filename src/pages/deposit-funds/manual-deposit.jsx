import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { toast, Bounce, ToastContainer } from "react-toastify";
import {
  dispatchSaveManualTransaction
} from "../../store/slices/transactionSlice";
import encryptData from "../../utils/encryption/encryption";
import hashing from "../../utils/encryption/hashing";
import { on } from 'process';

const DepositConfirmation = ({ onClose, orderId, orderAmount, orderCurrency, orderDepositAddress }) => {
  const [hashId, setHashId] = useState('');
  const [userWalletAddress, setUserWalletAddress] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

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

  const handleClose = () => {

    const data = {
      txnAction: "cancel",
      orderId: orderId,
      txnId: "",
      txnImg: "",
    };

    const { encryptedData, id } = encryptData(data);
    const { reqdata } = hashing(data, id);

    if (!encryptedData || !id || !reqdata || isNaN(id)) {
      setButtonLoading(false);
      throw new Error("Invalid request data. Try again.");
    }

    const finalData = { data: encryptedData, reqid: id, reqdata };
    dispatch(dispatchSaveManualTransaction(finalData));
    if (onClose) onClose();
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(orderDepositAddress);
    toast.success("Deposit address copied to clipboard", toastOptions);
  };

  const handleSubmit = async () => {

    setLoading(true);
    if (!hashId.trim()) {
      toast.error("Please enter your transaction hash ID", toastOptions);
      setLoading(false);
      return;
    }
    // if (!userWalletAddress.trim()) {
    //   toast.error("Please enter your sending wallet address");
    //   return;
    // }
    try {

      const data = {
      txnAction: "success",
      orderId: orderId,
      txnId: hashId,
      txnImg: userWalletAddress ? userWalletAddress : "",
    };

    const { encryptedData, id } = encryptData(data);
    const { reqdata } = hashing(data, id);

    if (!encryptedData || !id || !reqdata || isNaN(id)) {
      setLoading(false);
      throw new Error("Invalid request data. Try again.");
    }

    const finalData = { data: encryptedData, reqid: id, reqdata };
    const saveResultAction = await dispatch(dispatchSaveManualTransaction(finalData));
    setLoading(false); // Move this up so it always runs after dispatch
    if (
      saveResultAction.type === dispatchSaveManualTransaction.fulfilled.type &&
      saveResultAction.payload?.status === "ok"
    ) {
      toast.success(
        "Transaction submitted successfully. Wallet will be credited after successfull confirmation.",
        toastOptions
      );
      onClose();
    } else {
      toast.error(
        saveResultAction.payload?.message || "Failed to submit transaction. Please try again.",
        toastOptions
      );
      onClose();
    }
    } catch (err) {
      setLoading(false);
      toast.error("Failed to submit transaction. Please try again.", toastOptions);
    }
  };

  return (
    <>
    {showSuccess && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-4">Success!</h2>
          <p className="mb-4">Your manual deposit transaction has been submitted successfully.</p>
          <button
            className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold"
            onClick={() => setShowSuccess(false)}
          >
            Close
          </button>
        </div>
      </div>
    )}
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-2xl mx-auto bg-gray-100 border rounded-lg shadow-xl p-6 my-12 sm:my-[50px] flex flex-col justify-center" style={{ minHeight: 'auto', height: 'auto' }}>
        <div className="relative pb-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Congratulations!</h2>
            {onClose && (
              <button
                onClick={handleClose}
                className="absolute text-xl right-4  mt-[-3] w-8 h-8 text-gray-500 hover:text-gray-800 border border-purple-300 rounded-full line-height-8"
              >
                &times;
              </button>
            )}
          </div>
          <p className="text-sm text-gray-600">
            Your deposit order has been successfully placed.
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-white border-2 border-purple-400 rounded-lg p-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Order number:</span>
                <span className="text-sm text-purple-600 font-semibold">{orderId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Pay:</span>
                {orderCurrency === "ETH" || orderCurrency === "eth" ? (
                  <span className="text-sm font-semibold text-purple-600">{orderAmount} USDT</span>) : (
                <span className="text-sm font-semibold text-purple-600">{orderAmount} {orderCurrency}</span>)}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Wallet Credit</span>
            {orderCurrency === "ETH" || orderCurrency === "eth" ? (
              <span className="text-lg font-semibold text-purple-600">{orderAmount} USDT</span>) : (
            <span className="text-lg font-semibold text-purple-600">{orderAmount} {orderCurrency}</span>)}
          </div>

          <p className="text-sm">
            To complete the transaction, please send the amount to the following address.
          </p>

          <div className="space-y-2">
            <label className="text-sm font-medium">Wallet Address</label>
            <div className="flex items-center gap-2 p-3 bg-white rounded-lg border-2 border-purple-400">
              <code className="text-md font-mono flex-1 break-all">
                {orderDepositAddress}
              </code>
              <button
                onClick={handleCopyAddress}
                className="text-purple-600 hover:text-purple-800"
              >
                Copy
              </button>
            </div>
          </div>

          <div className="bg-blue-100 border border-blue-200 rounded-lg p-3">
            <p className="text-sm">
              <span className="font-semibold text-blue-600">Important Note</span>: To expedite the verification process, please provide the wallet address from which you will be transferring the funds. Kindly enter your hash ID and sending wallet address in the designated fields below.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Txn Hash ID</label>
            <input
              type="text"
              placeholder="Enter Hash ID"
              value={hashId}
              onChange={(e) => setHashId(e.target.value)}
              className="w-full border rounded-lg p-2"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Sending Wallet Address</label>
            <input
              type="text"
              placeholder="Enter your wallet address"
              value={userWalletAddress}
              onChange={(e) => setUserWalletAddress(e.target.value)}
              className="w-full border rounded-lg p-2"
            />
          </div>

          <p className="text-xs text-gray-600">
            Please note that if you send a different amount, corresponding USD value will be adjusted accordingly.
          </p>

          <button
            disabled={!hashId || loading}
            onClick={handleSubmit}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg p-3"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
    </>
  );
};

export default DepositConfirmation;