import { IoClose } from "react-icons/io5";
import success from '../../assets/success.png';
import { useEffect, useState } from "react";

const SuccessModal = ({ onClose, token }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Small delay to trigger animation
    const timer = setTimeout(() => setShow(true), 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div
        className={`bg-white dark:bg-zinc-800 rounded-2xl flex flex-col items-center justify-center shadow-xl py-10 px-6 max-w-xs w-full relative text-center transform transition-all duration-300 ${
          show ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <IoClose size={20} />
        </button>
        <div className="mb-4">
          <img
            src={success}
            alt="payment success"
            className="w-48 h-48 object-cover"
          />
        </div>
        <h2 className="text-2xl dark:text-white font-bold mb-2">Purchase Successful!</h2>
        <p className="text-sm text-gray-600 dark:text-gray-200 mb-6">
          You have successfully purchased <strong>{token} CAPX</strong> tokens.
        </p>
        <button
          onClick={onClose}
          className="bg-[#7A44FF] w-full text-white text-sm font-medium px-6 py-3 rounded-xl shadow-md"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
