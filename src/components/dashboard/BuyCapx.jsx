import React, { useState, useEffect } from "react";
import capxBuy from "../../assets/buy-capx.png";
import capxCoin from "../../assets/crypto/capx.png";
import CryptoDropdown from "../common/CryptoDropdown";
import { buyCapx } from "../../store/slices/transactionSlice";
import { useDispatch, useSelector } from "react-redux";
import encryptData from "../../utils/encryption/encryption";
import hashing from "../../utils/encryption/hashing";
import SuccessModal from "./SuccessModal";

const BuyCapx = ({ presaleData, currentPresaleStage, cryptoPrices, userWallet, onSuccess }) => {
  // console.log("presale stage and data", presaleData, currentPresaleStage)
  const [payAmount, setPayAmount] = useState("");
  const [receiveAmount, setReceiveAmount] = useState("0");
  const [selectedCrypto, setSelectedCrypto] = useState("usdt");
  const [usdtEquivalent, setUsdtEquivalent] = useState("0.00");
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [tokensToReceive, settokensToReceive] = useState("");
  const dispatch = useDispatch();
  
  const cryptoPriceMap = {
    eth: cryptoPrices?.find(crypto => crypto.crypto_name === "eth")?.current_price || 4500,
    bnb: cryptoPrices?.find(crypto => crypto.crypto_name === "bnb")?.current_price || 1032,
    usdt: 1
  };
  
  // Find current stage object
  const currentStageObj = presaleData?.find(
    (stage) => stage.stage_number === currentPresaleStage
  );

  // Helper to get correct token price based on input
  const getTokenPrice = (usdValue) => {
    if (!currentStageObj) return 0;
    return usdValue < 5000
      ? currentStageObj.token_price_below_min
      : currentStageObj.token_price_above_min;
  };

  // Calculate token amounts when input or selected crypto changes
  useEffect(() => {
    if (payAmount === "" || parseFloat(payAmount) <= 0) {
      setReceiveAmount("0");
      setUsdtEquivalent("0.00");
      setIsButtonActive(false);
      return;
    }
    const inputValue = parseFloat(payAmount);
    const usdValue = inputValue * cryptoPriceMap[selectedCrypto];
    const tokenPrice = getTokenPrice(usdValue);
    const capxTokens = tokenPrice > 0 ? usdValue / tokenPrice : 0;
    setUsdtEquivalent(usdValue.toFixed(2));
    setReceiveAmount(capxTokens.toFixed(2));
    setIsButtonActive(true);
  }, [payAmount, selectedCrypto, currentStageObj]);
  
  // Handler for crypto selection change
  const handleCryptoChange = (cryptoId) => {
    setSelectedCrypto(cryptoId);
    // Recalculate values based on new crypto
    if (payAmount) {
      const inputValue = parseFloat(payAmount);
      const usdValue = inputValue * cryptoPriceMap[cryptoId];
      const tokenPrice = getTokenPrice(usdValue);
      const capxTokens = tokenPrice > 0 ? usdValue / tokenPrice : 0;
      
      setUsdtEquivalent(usdValue.toFixed(2));
      setReceiveAmount(capxTokens.toFixed(2));
    }
  };
  
  // Handler for pay amount change
  const handlePayAmountChange = (e) => {
    const value = e.target.value;
    // Only allow numbers and decimal point
    if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
      setPayAmount(value);
    }
  };

  // Handle buy button click with loading and error toast
  const handleSubmit = async() => {
    setIsLoading(true);

    const data = {
      amount: payAmount,
      coin: selectedCrypto,
    }

    const { encryptedData, id } = encryptData(data);
    const { reqdata } = hashing(data, id);
    const finalData = { data: encryptedData, reqid: id, reqdata };

    const result = await dispatch(buyCapx(finalData));
    if (result?.payload?.status === "ok") {
      setIsLoading(false);
      setShowModal(true);
      settokensToReceive(receiveAmount);
      
      // Call the callback with the amount
      if (typeof onSuccess === 'function') {
        onSuccess(receiveAmount);
      }
    } else {
      const cryptoName = selectedCrypto.toUpperCase();
      setToastMessage(`You do not have enough ${cryptoName}`);
      setShowToast(true);
      setIsLoading(false);
      // Hide toast after 5 seconds
      setTimeout(() => {
        setShowToast(false);
      }, 5000); 

    }
    
  };
  
  //here the prices changes based on stage settings
  //if amount enter is less than 5k than the amount_min of stage price is applied
  //if amount enter is more than 5k than the amount_max of stage price is applied -> with discount
  //get current stage number



  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 w-full h-full dashboard-section-buy-capx relative">
      {/* Toast notification */}
      {showToast && (
        <div className="absolute top-0 right-0 left-0 mx-auto mt-4 w-11/12 animate-fade-in">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex justify-between items-center">
            <span>{toastMessage}</span>
            <button onClick={() => setShowToast(false)} className="text-red-700">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </button>
          </div>
        </div>
      )} 


      <h3 className="text-xl font-semibold text-gray-800 mb-6">Buy CAPX</h3>
      
      <div className="space-y-4"> 
        {/* You Pay Section */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            YOU PAY (MIN. 50.00$)
          </label>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4" style={{ zIndex: 1}}>
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <input
                  type="text"
                  value={payAmount}
                  onChange={handlePayAmountChange}
                  placeholder="0.00"
                  className="text-3xl font-light text-gray-700 bg-transparent border-none outline-none w-full"
                />
                <div className="text-sm text-gray-500 mt-1">≈ ${usdtEquivalent}</div>
              </div>
              
              <div className="ml-4 mt-10" style={{ marginTop: 10}}>
                <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-2 min-w-[120px]">
                  {/* Dropdown for crypto with logo and tracking selected value */}
                  <CryptoDropdown 
                    value={selectedCrypto} 
                    onChange={handleCryptoChange} 
                  />
                </div>
                <div className="text-xs text-gray-500 text-right mt-1">
                  Available Wallet Balance: {selectedCrypto === "usdt" ? userWallet?.usdAmount : "0.0000"} {selectedCrypto.toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Exchange Arrow */}
        <div className="flex justify-center py-3">
          <div className="bg-purple-700 rounded-lg p-3">
            <img src={capxBuy} alt="Buy Capx" className="w-6 h-6" />
          </div>
        </div>

        {/* You Receive Section */}
        <div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div className="flex-1 flex justify-between">
                <input
                  type="text"
                  value={receiveAmount}
                  placeholder="0"
                  disabled
                  className="text-3xl font-light text-gray-700 bg-transparent border-none outline-none w-full"
                />
                {/* Show discount badge if applicable */}
                {parseFloat(usdtEquivalent) >= 5000 && currentStageObj && (
  <span className="ml-2 px-3 py-1 rounded bg-fuchsia-500 text-white text-xs font-semibold inline-block mt-2">
    +{(
      ((currentStageObj.token_price_below_min - currentStageObj.token_price_above_min) /
        currentStageObj.token_price_above_min) *
      100
    ).toFixed(0)}% DISCOUNT APPLIED
  </span>
)}
              </div>
              
              <div className="ml-4">
                <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-2 min-w-[100px]">
                  <div className="w-6 h-6 mr-2 flex items-center justify-center">
                    <img src={capxCoin} alt="CAPX" className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">CAPX</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Buy Button - Conditionally styled with loading state */}
        <button 
          className={`w-full py-3 rounded-lg font-medium text-sm mt-6 flex justify-center items-center ${
            isButtonActive 
              ? "bg-gradient-to-r from-[#B500EF] to-[#37009A] text-white font-semibold cursor-pointer" 
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!isButtonActive || isLoading}
          onClick={handleSubmit}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            "Buy CAPX"
          )}
        </button>
      </div> 

    </div>
  );
};

export default BuyCapx;