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
    const result = await dispatch(buyTokenPlanThunk({ planId: plan._id, orderAmount: orderAmount }));
    console.log("result", result)
    if (result.payload.status === "ok") {
      setShowModal(true);
    }else{
      setApiError(result.payload.message || "You have insufficient fund in your wallet. Top up your wallet now.");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    if (success) {
      navigate("/dashboard"); // Redirect to dashboard
    }
  };


  const tokensToReceive = (orderAmount / plan.issued_price).toFixed(2);

  return (
    <>
      {showModal && success && (
        <SuccessModal
          onClose={handleCloseModal}
          loading={loading}
          error={error}
          success={success}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-8 gap-4 max-w-5xl mx-auto rounded-2xl lg:p-8 p-4 bg-[#F8F3FF] dark:bg-zinc-800">
        {/* Left Box */}
        <div className="px-6 py-10 border-2 border-[#7A44FF] rounded-xl bg-white dark:bg-[#EDE6FF]">
          <div className="flex gap-2 items-center mb-6">
            <p className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-[10px] font-semibold">
              <img
                src={logo}
                alt={plan.plan_name}                
              />
            </p>
            <div className="font-medium flex flex-col">
              <span className="text-xl leading-none font-medium">
                {plan.plan_name}
              </span>
            </div>
          </div>

          <div>
            <p className="text-[#7A44FF] text-xs font-semibold mt-2">TGE Unlock</p>
            <p className="font-semibold">{plan.tge_unlock}%</p>
          </div>
          <div>
            <p className="text-[#7A44FF] text-xs font-semibold mt-2">Post-TGE Lock</p>
            <p className="font-semibold">{plan.cliff_period} months cliff</p>
          </div>
          <div>
            <p className="text-[#7A44FF] text-xs font-semibold mt-2">Vesting</p>
            <p className="font-semibold">{plan.vesting_period}% monthly for {plan.duration_months} months</p>
          </div>

          <div className="my-4">
            <label className="text-xs text-gray-600 block mb-1">
              Enter Amount (USD)
            </label>
            <div className="flex bg-[#F4F4F4] items-center border-2 border-gray-300 rounded-lg overflow-hidden">
              <input
                type="number"
                min={plan.minimum_investment}
                max={plan.maximum_investment}
                value={orderAmount}
                onChange={(e) => setOrderAmount(Number(e.target.value))}
                className="px-4 py-2 w-full bg-[#F4F4F4] outline-none text-sm"
              />
              <span
                className="px-3 text-xs text-[#7A44FF] font-medium cursor-pointer"
                onClick={() => setOrderAmount(plan.maximum_investment)}
              >
                MAX
              </span>
            </div>
            <div className="text-xs text-end w-full font-semibold text-gray-500 mt-1">
              Investment Range:
              <span className="text-[#7A44FF]"> ${plan.minimum_investment} - ${plan.maximum_investment}</span>
            </div>
          </div>

          <div className="font-semibold mt-4">
            Discount: <span className="text-[#7A44FF] text-xl">0</span>
          </div>
          <div className="font-semibold mt-4">
            Eligible Token:
            <span className="text-[#7A44FF] text-xl"> {tokensToReceive} CAPX</span>
          </div>
        </div>

        {/* Right Box - Summary */}
        <div className="flex flex-col justify-between border-2 border-[#7A44FF] rounded-xl bg-white dark:bg-[#EDE6FF] h-full rounded-xl p-5 overflow-hidden min-w-[260px]">
          <div>
            <div className="flex justify-between items-center px-4 py-2 bg-[#A58BDA] font-semibold text-black text-base rounded-t-xl">
              <span className="text-white">Price</span>
              <span className="text-white">{Number(plan.issued_price).toFixed(2)} USD</span>
            </div>
            <div className="flex justify-between items-center px-4 py-2 border-b border-[#7A44FF] rounded-t-[10px]">
              <span className="font-medium">Discount</span>
              <span className="font-semibold">0%</span>
            </div>
            <div className="flex justify-between items-center px-4 py-2 mt-2 border-b border-[#7A44FF] rounded-b-[10px]">
              <span className="font-medium">Eligible Tokens</span>
              <span className="font-semibold">{tokensToReceive} CAPX</span>
            </div>
            {/* <div className="bg-white flex justify-between items-center px-4 py-3 border-b border-[#E2D6F7] text-sm">
              <span className="font-medium">Staking rewards</span>
              <span className="font-semibold">100.00 CAPX</span>
            </div> */}
          </div>
 
          <div className="flex flex-col gap-2 px-4 py-4 bg-white">
            <div className="flex justify-between items-center px-4 py-4 bg-[#A58BDA] text-xl font-bold text-[#562CBF] rounded-b-xl">
              <span className="text-white">Total</span>
              <span className="text-white">{(parseFloat(tokensToReceive)).toFixed(2)} CAPX</span>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mr-2 mt-1"
              />
              <label htmlFor="terms" className="text-xs text-gray-600">
                I have read and agreed to the (CAPX Presale Terms & Conditions).
              </label>
            </div>
            <div className="flex gap-2 mt-2">
              <button
                onClick={onBack}
                className="w-1/2 text-sm border-2 font-semibold border-[#7A44FF] text-[#7A44FF] rounded-xl py-2"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="w-1/2 text-sm font-semibold bg-[#7A44FF] text-white rounded-xl py-2 shadow disabled:bg-gray-400"
                disabled={!agreeTerms || loading}
              >
                {loading ? "Confirming..." : "Confirm"}
              </button>
            </div>
            {apiError && (
              <div className="text-red-500 text-center mt-3 text-sm font-semibold">{apiError}</div>
            )}
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default BuyCapXDetails;
