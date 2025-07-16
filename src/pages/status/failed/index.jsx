import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../../components/layout/Layout";

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="w-full min-h-[80vh] bg-gradient-to-br from-[#FFE6E6] to-[#FFF5F5] flex flex-col items-center justify-center p-10 rounded-3xl">
        <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-lg w-full text-center">
          {/* Error Icon */}
          <div className="mb-6">
            <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center animate-pulse">
              <svg
                className="w-12 h-12 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>

          {/* Error Message */}
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Payment Failed
          </h1>
          
          <p className="text-gray-600 mb-6 text-lg">
            Unfortunately, your payment could not be processed. Please try again or use a different payment method.
          </p>

          {/* Error Details */}
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-center mb-3">
              <svg
                className="w-6 h-6 text-red-600 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-red-700 font-semibold">Transaction Failed</span>
            </div>
            <p className="text-red-600 text-sm">
              No charges have been made to your account. You can safely retry the payment.
            </p>
          </div>

          {/* Common Reasons */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-6 text-left">
            <h3 className="font-semibold text-gray-800 mb-3 text-center">Common Reasons for Payment Failure:</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                Insufficient funds in your account
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                Incorrect payment details
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                Network connection issues
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                Bank or payment provider restrictions
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={() => navigate("/deposit-funds")}
              className="w-full py-3 px-6 bg-[#7A44FF] text-white rounded-xl font-semibold hover:bg-[#6A3AEF] transition-colors duration-200 shadow-lg"
            >
              Try Again
            </button>
            
            <button
              onClick={() => navigate("/dashboard")}
              className="w-full py-3 px-6 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors duration-200"
            >
              Back to Dashboard
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Still having issues? Contact our{" "}
              <a href="#" className="text-[#7A44FF] hover:underline">
                support team
              </a>{" "}
              for assistance
            </p>
          </div>
        </div>

        {/* Floating Elements for Visual Appeal */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-red-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute bottom-32 right-24 w-6 h-6 bg-red-300 rounded-full animate-pulse opacity-40"></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-orange-300 rounded-full animate-bounce opacity-50"></div>
      </div>
    </Layout>
  );
};

export default PaymentFailed;
