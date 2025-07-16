import React from 'react';
import { useNavigate } from 'react-router-dom';
import successImg from '../../assets/images/successfully.png';

import loginIllustration from '../../assets/images/login_illustaration.png';

const TaskCompletePage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full font-roboto">
      {/* Blurred Login Background */}
      <div className="fixed inset-0 z-0 pointer-events-none select-none">
        <div className="min-h-screen w-full flex flex-col lg:flex-row p-0 m-0">
          {/* Left Section */}
          <div className="w-full lg:w-1/2 bg-[#FFFFFF] py-8 px-0 flex flex-col items-start">
            <div className="w-full max-w-[125px] ml-[20px] mb-8 px-[30.25px] py-[3.98px]">
              <div className="font-inter font-semibold text-[21.76px] leading-[26px] text-[#7A44FF]">
                CAPShield
              </div>
            </div>
            <div className="max-w-[334px] mx-auto flex flex-col items-center gap-[40px]">
              <div className="flex flex-col items-center gap-[19.37px]">
                <div className="flex flex-col items-center gap-[20.29px]">
                  <div className="flex flex-col items-center gap-[14.75px]">
                    <div className="flex flex-col items-center gap-[4.62px] leading-[32px]">
                      <h2 className="w-full font-semibold text-[27.04px] leading-[32px] text-start text-[#000000] whitespace-nowrap">
                        Sign in to CAPShield
                      </h2>
                      <p className="w-[173px] h-[14px] font-medium text-[11.96px] leading-[14px] text-center text-[rgba(7,0,23,0.3)]">
                        Presales. Profits. Protection.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="max-w-[334px] mx-auto mt-[61px] flex flex-col gap-[21px]">
              <div className="flex flex-row flex-wrap justify-center items-center gap-x-[55.85px] gap-y-[26px] w-full">
                <a href="#" className="font-roboto font-normal text-[8.56px] leading-[11px] text-[#4A5567] text-center">
                  Privacy Policy
                </a>
                <a href="#" className="font-roboto font-normal text-[8.56px] leading-[11px] text-[#4A5567] text-center">
                  Terms and Conditions
                </a>
                <div className="relative">
                  <div className="flex flex-row items-center gap-[4.38px] w-[59.77px] h-[17px] bg-[#FFFFFF] rounded-[3px] px-[2px] cursor-pointer">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.28354 10.7724C8.80353 10.7724 10.8464 8.72956 10.8464 6.20957C10.8464 3.68958 8.80353 1.64673 6.28354 1.64673C3.76356 1.64673 1.7207 3.68958 1.7207 6.20957C1.7207 8.72956 3.76356 10.7724 6.28354 10.7724Z" stroke="#4A5567" strokeWidth="0.684426" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M4.4581 2.10303H4.91439C4.02463 4.76773 4.02463 7.65144 4.91439 10.3161H4.4581" stroke="#4A5567" strokeWidth="0.684426" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7.65234 2.10303C8.5421 4.76773 8.5421 7.65144 7.65234 10.3161" stroke="#4A5567" strokeWidth="0.684426" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2.17676 8.0349V7.57861C4.84146 8.46837 7.72517 8.46837 10.3899 7.57861V8.0349" stroke="#4A5567" strokeWidth="0.684426" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2.17676 4.8409C4.84146 3.95115 7.72517 3.95115 10.3899 4.8409" stroke="#4A5567" strokeWidth="0.684426" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="font-roboto font-normal text-[8.56px] leading-[11px] text-[#4A5567]">
                      English
                    </span>
                    <svg width="8.76" height="8.76" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 6L8 10L12 6" stroke="#4A5567" strokeWidth="0.547541"/>
                    </svg>
                  </div>
                </div>
              </div>
              <p className="font-roboto font-normal text-[8.56px] leading-[11px] text-[#4A5567] text-center">
                © 2025 CAPShield. All Rights Reserved.
              </p>
            </div>
          </div>
          {/* Right Section */}
          <div className="w-full lg:w-1/2 bg-[#8E5CFF] flex items-start pt-[16px] px-[84px] pb-[300px]">
            <div className="flex flex-col items-center gap-[20.78px] max-w-[506px]">
              <div className="w-[400px] h-[430px] rounded-[7.46px] flex items-center justify-center text-white text-lg">
                <img src={loginIllustration} alt="SignIN Illustration" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col items-center gap-[11.43px] w-full">
                <h2 className="font-roboto font-semibold text-[33.25px] leading-[39px] text-[#FFFFFF] text-center">
                  Secure. Simple. Early Access.
                </h2>
                <p className="font-roboto font-normal text-[18.70px] leading-[22px] text-[#FFFFFF] text-center">
                  Early access to presales, staking rewards, and a token that helps de-risk your investments
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Blur overlay */}
        <div className="absolute inset-0 backdrop-blur-[6px] bg-white/40 z-10" />
      </div>
      {/* Centered Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-20">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-[400px] font-roboto relative flex flex-col items-center">
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold focus:outline-none"
            onClick={() => navigate('/login')}
            aria-label="Close"
          >
            ×
          </button>
          <img src={successImg} alt="Success" className="w-[120px] h-[120px] mb-4" />
          <h3 className="text-[20px] font-semibold text-[#000000] mb-2 text-center">You successfully changed your password</h3>
          <p className="text-[13px] text-[#A0AEBF] mb-6 text-center">
            Please enter a new password. Your new password must be different from the previous one.
          </p>
          <button
            className="w-full h-[44px] bg-[#7A44FF] rounded-[8px] font-roboto font-semibold text-[16px] leading-[18px] text-[#FFFFFF] hover:bg-purple-700 mt-2"
            onClick={() => navigate('/login')}
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCompletePage;
