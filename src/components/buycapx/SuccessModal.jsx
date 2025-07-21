import { IoClose } from "react-icons/io5";
import { IoCheckmarkCircle } from "react-icons/io5";
import { useEffect, useState } from "react";

const SuccessModal = ({ onClose, purchaseData }) => {
  const [show, setShow] = useState(false);

  // Mock data - replace with actual purchaseData when available
  const data = purchaseData || {
    total: 10500.00
  };

  useEffect(() => {
    // Small delay to trigger animation
    const timer = setTimeout(() => setShow(true), 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={`bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 relative transform transition-all duration-300 ${
          show ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
      >
        {/* Content */}
        <div className="p-8 text-center">
          {/* Success Icon */}
          <div className="mb-6">
            <IoCheckmarkCircle size={80} className="text-green-500 mx-auto" />
          </div>

          {/* Success Title */}
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Purchase Successful!
          </h2>

          {/* Success Message */}
          <p className="text-gray-600 mb-2">
            You've successfully acquired <span className="font-semibold text-gray-900">{data.total.toFixed(0)} CAPX</span> tokens.
          </p>

          <p className="text-gray-600 mb-8">
            Your tokens will be processed as per the sale terms.
          </p>

          {/* Done Button */}
          <button
            onClick={onClose}
            className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-purple-900 transition-all text-lg"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
