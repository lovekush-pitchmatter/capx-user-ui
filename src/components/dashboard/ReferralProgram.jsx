import React, { useState } from "react";
import { Copy, Check, Smartphone, Users, DollarSign } from "lucide-react";
import USDTicon from "../../assets/dashboard/USDT.png";
 
const ReferralProgram = () => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText("https://capshield.io/username");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 w-full max-w-4xl">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">Referral Program</h3>
      
      {/* Referral Link Section */}
      <div className="mb-6">
        <p className="text-sm font-medium text-gray-600 mb-2 tracking-wide">YOUR REFERRAL LINK</p>
        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
          <input
            type="text"
            readOnly
            value="https://capshield.io/amansinghal20"
            className="flex-1 px-4 py-3 text-gray-700 bg-white focus:outline-none"
          />
          <button 
            onClick={handleCopy}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors duration-200 flex items-center gap-2"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      {/* Main Info Box with dotted border */}
      <div className="border-2 border-solid border-black-200 rounded-lg p-6">
        <div className="flex flex-col-reverse md:flex-row items-center gap-6">
          {/* Left Content */}
          <div className="flex-1 md:w-2/3 text-center md:text-left">
            <h4 className="text-xl font-semibold text-gray-800 mb-3">Earn USDT Instantly</h4>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Share your unique link and earn 5% rewards on every purchase made through it. Invite friends—earn together!
            </p>
            <button className="px-6 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors duration-200">
              How it works
            </button>
          </div>

          {/* Right Image Placeholder */}
            <div className="text-center mb-4 md:mb-0 md:w-1/3 flex justify-center">
              <img src={USDTicon} alt="USDT" className="w-24 h-24 sm:w-32 sm:h-32 object-contain" />
            </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralProgram;