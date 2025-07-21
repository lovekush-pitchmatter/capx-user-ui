import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, Bounce, ToastContainer } from "react-toastify";
import { buyTokenPlanThunk } from "../../store/slices/transactionSlice";
import SuccessModal from "./SuccessModal";
import logo from "../../assets/images/plan_logo.png";

const BuyCapXDetails = ({ plan, onBack }) => {
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector((state) => state.transaction.buyPlan || {});
  const [apiError, setApiError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const success = !!data && data.status === "ok";
  const navigate = useNavigate();

  const [orderAmount, setOrderAmount] = useState(plan.minimum_investment || 100);
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Mock data for demonstration - replace with actual data
  const username = "jamessmith";
  const availableAmount = 4726.10;
  const marketPrice = 1.00;
  const discountPercentage = 80;
  const bonusPercentage = 5.00;

  const handleConfirm = async() => {
    if (!agreeTerms) {
      toast.error("Please agree to the terms and conditions.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      return;
    }
    if (orderAmount < plan.minimum_investment || orderAmount > plan.maximum_investment) {
      toast.error(`Please enter an amount between ${plan.minimum_investment} and ${plan.maximum_investment}.`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      return;
    }
    // Show modal popup regardless of balance or API response
    setShowModal(true);
    
    // Still make the API call in the background for actual processing
    const result = await dispatch(buyTokenPlanThunk({ planId: plan._id, orderAmount: orderAmount }));
    console.log("result", result)
    
    // Handle any errors silently or you can still show them if needed
    if (result.payload.status !== "ok") {
      setApiError(result.payload.message || "You have insufficient fund in your wallet. Top up your wallet now.");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    // Navigate to dashboard regardless of transaction status
    navigate("/dashboard");
  };

  const eligibleTokens = (orderAmount / plan.issued_price);
  const bonusTokens = (eligibleTokens * bonusPercentage) / 100;
  const totalTokens = eligibleTokens + bonusTokens;

  return (
    <>
      {showModal && (
        <SuccessModal
          onClose={handleCloseModal}
          purchaseData={{
            marketPrice: marketPrice,
            discount: discountPercentage,
            eligibleTokens: eligibleTokens,
            bonus: bonusTokens,
            total: totalTokens
          }}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto p-6 border border-gray-300 rounded-3xl bg-gray-50">
        {/* Left Card */}
        <div className="bg-white border-2 border-purple-500 rounded-2xl p-6 space-y-4">
          {/* Header with Logo */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <img src={logo} alt="CAPX" className="w-8 h-8" />
            </div>
            <div>
              <div className="text-sm text-gray-600 font-medium">CAPShield</div>
              <div className="text-lg font-bold text-gray-900">CAPX</div>
            </div>
          </div>

          {/* Token Details */}
          <div className="space-y-3">
            <div>
              <div className="text-purple-600 text-sm font-semibold">TGE Unlock</div>
              <div className="text-gray-900 font-semibold">{plan.tge_unlock}%</div>
            </div>
            
            <div>
              <div className="text-purple-600 text-sm font-semibold">Post-TGE Lock</div>
              <div className="text-gray-900 font-semibold">{plan.cliff_period} months cliff</div>
            </div>
            
            <div>
              <div className="text-purple-600 text-sm font-semibold">Vesting</div>
              <div className="text-gray-900 font-semibold">{plan.vesting_period}% monthly x {plan.duration_months} months</div>
            </div>
            
            <div>
              <div className="text-purple-600 text-sm font-semibold">Bonus</div>
              <div className="text-gray-900 font-semibold">{bonusPercentage}%</div>
            </div>
          </div>

          {/* Username */}
          <div className="pt-2">
            <div className="text-gray-900 font-medium">Username: {username}</div>
          </div>

          {/* Amount Input */}
          <div className="space-y-2">
            <div className="relative">
              <input
                type="number"
                min={plan.minimum_investment}
                max={plan.maximum_investment}
                value={orderAmount}
                onChange={(e) => setOrderAmount(Number(e.target.value))}
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-lg font-semibold outline-none focus:border-purple-500"
                placeholder="USD 10000.00"
              />
              <button
                onClick={() => setOrderAmount(plan.maximum_investment)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-600 font-semibold text-sm hover:text-purple-800"
              >
                MAX
              </button>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-purple-600">Available amount: {availableAmount.toFixed(2)}</div>
            </div>
          </div>

          {/* Minimum and Tokens to Receive */}
          <div className="space-y-2 pt-2">
            <div className="text-gray-900">
              <span className="font-medium">Minimum : </span>
              <span className="font-semibold">{plan.minimum_investment}.00 CAPX</span>
            </div>
            
            <div className="text-gray-900">
              <span className="font-medium">You'll receive : </span>
              <span className="font-bold text-purple-600 text-lg">{totalTokens.toFixed(2)} CAPX</span>
            </div>
          </div>
        </div>

        {/* Right Card */}
        <div className="bg-white border-2 border-purple-500 rounded-2xl overflow-hidden">
          {/* Summary Rows */}
          <div className="space-y-0">
            <div className="flex justify-between items-center px-6 py-4 bg-purple-100 border-b border-gray-200">
              <span className="font-medium text-gray-700">Market Price</span>
              <span className="font-semibold text-gray-900">{marketPrice.toFixed(2)} USD</span>
            </div>
            
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
              <span className="font-medium text-gray-700">Discount</span>
              <span className="font-semibold text-gray-900">{discountPercentage}%</span>
            </div>
            
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
              <span className="font-medium text-gray-700">Eligible Tokens</span>
              <span className="font-semibold text-gray-900">{eligibleTokens.toFixed(2)} CAPX</span>
            </div>
            
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
              <span className="font-medium text-gray-700">Bonus</span>
              <span className="font-semibold text-gray-900">{bonusTokens.toFixed(2)} CAPX</span>
            </div>
          </div>

          {/* Total Section */}
          <div className="px-6 py-8 space-y-6">
            <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl">
              <span className="font-bold text-white text-lg">Total</span>
              <span className="font-bold text-white text-xl">{totalTokens.toFixed(2)} CAPX</span>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <label htmlFor="terms" className="text-sm text-gray-600 leading-tight">
                I have read and agreed to the Terms & Conditions.
              </label>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={onBack}
                className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-xl hover:bg-gray-300 transition-colors"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className={`px-6 py-3 font-semibold rounded-xl transition-all ${
                  !agreeTerms || loading
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-purple-800 text-white hover:from-purple-700 hover:to-purple-900'
                }`}
                disabled={!agreeTerms || loading}
              >
                {loading ? "Confirming..." : "Confirm"}
              </button>
            </div>

            {/* Error Message */}
            {apiError && (
              <div className="text-red-500 text-center text-sm font-semibold bg-red-50 p-3 rounded-lg">
                {apiError}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <ToastContainer />
    </>
  );
};

export default BuyCapXDetails;

