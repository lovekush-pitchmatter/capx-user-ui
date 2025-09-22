import React, { useState, useEffect } from "react";
import capxCoin from "../../assets/crypto/capx.png";

const CalculateProfit = ({ presalePriceData = [] }) => {

  console.log("hello data", presalePriceData)
  // Create a default stage 1 object for when no data is available
  const defaultStage = { 
    _id: 'default',
    stage_title: 'Presale 1',
    stage_number: 1,
    token_price_below_min: 2.5,
    token_price_above_min: 5
  };

  const [capxAmount, setCapxAmount] = useState("");
  const [selectedStage, setSelectedStage] = useState(defaultStage);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState("0.00");
  const [roi, setRoi] = useState("0.00");
  const [stagesList, setStagesList] = useState([defaultStage]);
  
  // Fixed listing price
  const listingPrice = 5;
  
  // Process and deduplicate stages on component mount
  useEffect(() => {
    if (presalePriceData && presalePriceData.length > 0) {
      // Remove duplicates by stage_number
      const uniqueStages = Array.from(
        new Map(presalePriceData.map(item => [item.stage_number, item])).values()
      ).sort((a, b) => a.stage_number - b.stage_number);
      
      setStagesList(uniqueStages);
      
      // Find stage 1 or use the first stage as default
      const stage1 = uniqueStages.find(stage => stage.stage_number === 1) || uniqueStages[0];
      setSelectedStage(stage1);
    }
  }, [presalePriceData]);

  // Calculate total price and ROI when amount or selected stage changes
  useEffect(() => {
    if (selectedStage && capxAmount && capxAmount !== "") {
      const amountNum = parseFloat(capxAmount);
      // Use below_min price if amount > 4999, else above_min price
      const purchasePrice = amountNum > 4999
        ? selectedStage.token_price_above_min
        : selectedStage.token_price_below_min;
      const calculatedTotalPrice = amountNum * purchasePrice;
      setTotalPrice(calculatedTotalPrice.toFixed(2));

      // Calculate ROI: ((listing value - purchase value) / purchase value) * 100
      const totalInvestment = calculatedTotalPrice;
      const totalReturn = amountNum * listingPrice;
      const calculatedRoi = ((totalReturn - totalInvestment) / totalInvestment) * 100;

      setRoi(calculatedRoi.toFixed(2));
    } else {
      setTotalPrice("0.00");
      setRoi("0.00");
    }
  }, [capxAmount, selectedStage, listingPrice]);

  // Handle user input for CAPX amount
  const handleCapxAmountChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
      setCapxAmount(value);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 w-full h-full dashboard-section-buy-capx">
      {/* Header with Stage Dropdown */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Calculate profit on launch</h3>
        <div className="relative">
          <div 
            className="flex items-center bg-blue-500 text-white rounded-lg px-4 py-2 cursor-pointer"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className="text-sm font-medium mr-2">
              {selectedStage ? `Stage ${selectedStage.stage_number}` : "Select Stage"}
            </span>
            <svg 
              width="10" 
              height="6" 
              viewBox="0 0 10 6" 
              fill="none" 
              className={`text-white transition-transform ${isDropdownOpen ? 'transform rotate-180' : ''}`}
              stroke="currentColor"
            >
              <path d="M1 1L5 5L9 1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          {/* Stage Dropdown */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 w-full min-w-[160px] z-[1000]">
              {stagesList.map((stage) => (
                <div 
                  key={stage._id || `stage-${stage.stage_number}`}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSelectedStage(stage);
                    setIsDropdownOpen(false);
                  }}
                >
                  Stage {stage.stage_number}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-6">
        {/* Amount of CAPX */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2 uppercase tracking-wide">
            AMOUNT OF CAPX
          </label>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <input
                  type="text"
                  value={capxAmount}
                  onChange={handleCapxAmountChange}
                  placeholder="0.00"
                  className="text-2xl font-light text-gray-700 bg-transparent border-none outline-none w-full"
                />
              </div>
              
              <div className="ml-4">
                <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-2">
                  <div>
                    <img src={capxCoin} alt="CAPX" className="w-6 h-6 mr-2" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">CAPX</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Price Info */}
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">PRICE</span>
          <span className="text-sm font-medium text-gray-700">
            1 CAPX = ${capxAmount && parseFloat(capxAmount) > 4999
              ? selectedStage.token_price_above_min
              : selectedStage.token_price_below_min}
          </span>
        </div>

        {/* Total Price Input */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2 uppercase tracking-wide">
            TOTAL PRICE
          </label>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <input
              type="text"
              value={`$${totalPrice}`}
              placeholder="$0.00"
              disabled
              className="text-2xl font-light text-gray-700 bg-transparent border-none outline-none w-full"
            />
          </div>
        </div>

        {/* Listing Price and ROI */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2 uppercase tracking-wide">
              LISTING PRICE
            </label>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <span className="text-2xl font-light text-gray-600">
                ${listingPrice.toFixed(2)}
              </span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2 uppercase tracking-wide">
              ROI
            </label>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <span className="text-2xl font-light text-gray-600">{roi}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculateProfit;