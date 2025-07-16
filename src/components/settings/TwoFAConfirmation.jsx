import React from "react";

const TwoFAConfirmation = ({ cancel, enable }) => {
  return (
    <div className="fixed p-2 h-screen w-full inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 w-full max-w-md shadow-lg text-center">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
          Are you sure?
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
          To disable 2-step verification for your user account?
        </p>
        <div className="flex w-full justify-center text-sm font-semibold gap-4">
          <button
            onClick={cancel}
            className="px-6 py-2 border border-[#7A44FF] text-[#7A44FF] rounded-md hover:bg-purple-50"
          >
            Cancel
          </button>
          <button
            onClick={enable}
            className="px-6 py-2 bg-[#7A44FF] text-white rounded-md hover:bg-[#7A44FF]"
          >
            Yes, Enable it
          </button>
        </div>
      </div>
    </div>
  );
};

export default TwoFAConfirmation;
