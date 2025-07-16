import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../../components/layout/Layout";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="w-full min-h-[80vh] bg-gradient-to-br from-[#EDE6FF] to-[#F8F5FF] flex flex-col items-center justify-center p-10 rounded-3xl">
        <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-lg w-full text-center">
          {/* Success Icon */}
          <div className="mb-6">
            <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
              <svg
                className="w-12 h-12 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Payment Successful!
          </h1>
          
          <p className="text-gray-600 mb-6 text-lg">
            Your deposit has been processed successfully. You will receive a confirmation email shortly.
          </p>

          {/* Success Details */}
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-center mb-3">
              <svg
                className="w-6 h-6 text-green-600 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-green-700 font-semibold">Transaction Confirmed</span>
            </div>
            <p className="text-green-600 text-sm">
              Your funds will be credited to your account within the next few minutes.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="w-full py-3 px-6 bg-[#7A44FF] text-white rounded-xl font-semibold hover:bg-[#6A3AEF] transition-colors duration-200 shadow-lg"
            >
              Go to Dashboard
            </button>
            
            <button
              onClick={() => navigate("/deposit-funds")}
              className="w-full py-3 px-6 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors duration-200"
            >
              Make Another Deposit
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Need help? Contact our{" "}
              <a href="#" className="text-[#7A44FF] hover:underline">
                support team
              </a>
            </p>
          </div>
        </div>

        {/* Floating Elements for Visual Appeal */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-[#7A44FF] rounded-full animate-pulse opacity-60"></div>
        <div className="absolute bottom-32 right-24 w-6 h-6 bg-green-400 rounded-full animate-pulse opacity-40"></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-purple-300 rounded-full animate-bounce opacity-50"></div>
      </div>
    </Layout>
  );
};

export default PaymentSuccess;
