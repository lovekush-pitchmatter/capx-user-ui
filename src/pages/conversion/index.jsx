import React, { useState } from "react";
import Layout from "../../components/layout/Layout";

const Conversion = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    currency: "",
    amount: "",
    otp: "",
    pin: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center p-6 font-sans">
        {step === 1 && (
          <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md text-center">
            <h2 className="text-2xl mb-6 text-gray-800">Transfer Funds to</h2>
            <div className="mb-4">
              <label className="block text-sm mb-2 text-gray-600">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Enter username"
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              />
              <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-md px-4 py-2 mt-2 hover:from-blue-500 hover:to-purple-500">Verify</button>
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-2 text-gray-600">Currency</label>
              <input
                type="text"
                name="currency"
                value={formData.currency}
                onChange={handleInputChange}
                placeholder="Enter Currency"
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-2 text-gray-600">Amount</label>
              <input
                type="text"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="Enter Amount"
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-md px-4 py-2 mt-4 hover:from-blue-500 hover:to-purple-500" onClick={handleNextStep}>Next</button>
          </div>
        )}

        {step === 2 && (
          <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md text-center">
            <h2 className="text-2xl mb-6 text-gray-800">P2P transfer confirm</h2>
            <p className="text-gray-600">Transferring to: {formData.username}</p>
            <p className="text-gray-600">Currency: {formData.currency}</p>
            <p className="text-gray-600">Amount: {formData.amount}</p>
            <div className="mb-4">
              <label className="block text-sm mb-2 text-gray-600">Email Verification</label>
              <input
                type="text"
                name="otp"
                value={formData.otp}
                onChange={handleInputChange}
                placeholder="Enter OTP"
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              />
              <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-md px-4 py-2 mt-2 hover:from-blue-500 hover:to-purple-500">Send OTP</button>
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-2 text-gray-600">Security PIN</label>
              <input
                type="password"
                name="pin"
                value={formData.pin}
                onChange={handleInputChange}
                placeholder="Enter Security PIN"
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <button className="bg-gray-300 text-gray-800 rounded-md px-4 py-2 mt-4 mr-2 hover:bg-gray-400" onClick={handlePreviousStep}>Back</button>
            <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-md px-4 py-2 mt-4 hover:from-blue-500 hover:to-purple-500" onClick={handleNextStep}>Next</button>
          </div>
        )}

        {step === 3 && (
          <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md text-center">
            <h2 className="text-2xl mb-6 text-gray-800">Congratulations!</h2>
            <p className="text-gray-600">Your transfer has been successfully completed</p>
            <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-md px-4 py-2 mt-4 hover:from-blue-500 hover:to-purple-500" onClick={() => setStep(1)}>Done</button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Conversion;
