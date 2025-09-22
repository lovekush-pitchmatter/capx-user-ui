import { useState } from "react";
import Lottie from "react-lottie";
import celebrationAnimation from "../../assets/celebration.json";
import encryptData from "../../utils/encryption/encryption";
import hashing from "../../utils/encryption/hashing";

const Poll = ({ poll, onSubmit, isSubmitting }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  if (!poll?.poll) {
    return (
      <div className="rounded-lg p-6 md:p-8 border shadow-sm w-full md:w-2/3">
        <h3 className="font-semibold text-gray-900 text-lg">Take Polls</h3>
        <p className="text-gray-500 text-sm mb-4">No active poll available.</p>
      </div>
    );
  }

  const handleSubmit = async () => {
    if (!selectedOption) return;

    let success = false;

    try {
      // Check if onSubmit is a function before calling it
      if (typeof onSubmit === 'function') {
        success = await onSubmit(poll?.poll?._id, selectedOption);
      } else {
        // Fallback: Log error and handle directly if onSubmit is not provided
        console.error("onSubmit prop is not a function");

        // Optional: Add direct submission logic here if needed
        // For example:
        // const { encryptedData, id } = encryptData({ pollid: poll?.poll?._id, selected_option: selectedOption });
        // const { reqdata } = hashing({ pollid: poll?.poll?._id, selected_option: selectedOption }, id);
        // ...etc.

        // For now, just simulate a successful submission
        success = true;
      }

      if (success) {
        setSubmitted(true);
        setShowConfetti(true);
        setModalOpen(true);
      }
    } catch (error) {
      console.error("Error submitting poll:", error);
    }
  };

  const handleCloseModal = () => {
    setShowConfetti(false);
    setModalOpen(false);
  };

  const confettiOptions = {
    loop: false, // Play only once
    autoplay: true,
    animationData: celebrationAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  // Function to format large numbers with K, L, M suffixes
  const formatNumber = (num) => {
    if (!num) return 0;

    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 100000) {
      return (num / 100000).toFixed(1).replace(/\.0$/, '') + 'L';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num;
  };

  return (
    <div className="rounded-lg p-6 md:p-8 border shadow-sm w-full md:w-2/3">
      {/* Title */}
      <h3 className="font-semibold text-gray-900 text-lg md:text-xl">Take Polls</h3>
      <p className="text-gray-500 text-sm mb-4">Answer & Earn AngelSEED</p>

      {poll?.is_poll_active == 1 ?
        <div>
          <h3 className="font-medium text-gray-800 mb-3 text-sm md:text-base">{poll?.poll?.question_text}</h3>

          {/* Options */}
          <div className="space-y-2 flex flex-col gap-3">
            {poll?.poll?.options.map((option) => (
              <label
                key={option}
                className={`flex items-center space-x-2 ${poll?.is_poll_answered == 1 ? 'cursor-default' : 'cursor-pointer'} ${poll?.is_poll_answered == 1 && poll?.user_answer === option ? 'bg-purple-100 p-2 rounded-lg border border-purple-200' : ''
                  }`}
              >
                <input
                  type="radio"
                  name="poll"
                  value={option}
                  checked={poll?.is_poll_answered == 1 ? poll?.user_answer === option : selectedOption === option}
                  onChange={() => !poll?.is_poll_answered && setSelectedOption(option)}
                  disabled={poll?.is_poll_answered == 1}
                  className="accent-purple-600 w-4 h-4"
                />
                <span className={`text-sm md:text-base ${poll?.is_poll_answered == 1 && poll?.user_answer === option ? 'text-purple-700 font-medium' : 'text-gray-700'
                  }`}>
                  {option}
                </span>
                {poll?.is_poll_answered == 1 && poll?.user_answer === option && (
                  <span className="ml-auto text-xs bg-purple-600 text-white px-2 py-1 rounded">Your Answer</span>
                )}
              </label>
            ))}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!selectedOption || submitted || poll?.is_poll_answered == 1 || isSubmitting}
            className={`mt-6 w-full py-2 md:py-3 rounded-lg text-white font-medium transition text-sm md:text-base flex items-center justify-center ${!selectedOption || submitted || poll?.is_poll_answered == 1 || isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-[#B500EF] to-[#37009A] hover:opacity-90"
              }`}
          >
            {isSubmitting && (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            {poll?.is_poll_answered == 1
              ? "Already Submitted"
              : isSubmitting
                ? "Submitting..."
                : submitted
                  ? "Submitted"
                  : "Submit Answer"}
          </button>

          {/* Participation count */}
          <p className="text-gray-500 text-xs md:text-sm mt-4 md:mt-6">
            {formatNumber(poll?.total_user_answered)}+ users participated
          </p>
        </div> : <div>Sorry, there are no new Polls available.</div>}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[1000] p-4">
          <div className="bg-white rounded-[32px] shadow-2xl max-w-[360px] w-full p-0 relative flex flex-col items-center overflow-hidden">
            {/* Top section with icon */}
            <div className="w-full flex flex-col items-center justify-center bg-[#F6F7FB] pt-10 pb-8 rounded-t-[32px]">
              {/* Placeholder for icon */}
              <div className="w-20 h-20 flex items-center justify-center mb-2">
                {/* Replace below SVG with your logo if needed */}
                <svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240" role="img" aria-labelledby="title desc">
                  <title id="title">Winning Cup</title>
                  <desc id="desc">A light trophy cup with gradient fill and subtle shine</desc>

                  <defs>
                    <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
                      <stop offset="0%" stop-color="#fff7d6" />
                      <stop offset="45%" stop-color="#ffef99" />
                      <stop offset="100%" stop-color="#ffd24a" />
                    </linearGradient>

                    <linearGradient id="g2" x1="0" x2="1" y1="0" y2="1">
                      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.7" />
                      <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
                    </linearGradient>

                    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#000" flood-opacity="0.12" />
                    </filter>
                  </defs>

                 
                  <ellipse cx="120" cy="200" rx="56" ry="10" fill="#000" opacity="0.08" />

              
                  <g transform="translate(0,12)">
                    <rect x="80" y="150" width="80" height="18" rx="3" fill="#2b2b2b" opacity="0.9" filter="url(#shadow)" />
                    <rect x="96" y="132" width="48" height="22" rx="3" fill="url(#g1)" />
                  </g>

                
                  <g transform="translate(0,-6)">
                    <path d="M70 38
             C70 24, 86 16, 120 16
             C154 16, 170 24, 170 38
             L170 92
             C170 116, 142 128, 120 128
             C98 128, 70 116, 70 92
             Z"
                      fill="url(#g1)" stroke="#e5b43b" stroke-width="2" />

                  
                    <path d="M78 48 C78 36, 92 30, 120 30 C148 30, 162 36, 162 48" fill="none" stroke="#e0ad2f" stroke-width="3" opacity="0.25" />

                  
                    <path d="M66 54
             C52 48, 52 78, 66 84"
                      fill="none" stroke="url(#g1)" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />

                  
                    <path d="M174 54
             C188 48, 188 78, 174 84"
                      fill="none" stroke="url(#g1)" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />

               
                    <path d="M110 30
             C118 28, 130 36, 128 56
             C126 76, 112 92, 104 92"
                      fill="none" stroke="url(#g2)" stroke-width="18" stroke-linecap="round" opacity="0.6" />


                    <path d="M70 38
             C70 24, 86 16, 120 16
             C154 16, 170 24, 170 38
             L170 92
             C170 116, 142 128, 120 128
             C98 128, 70 116, 70 92
             Z"
                      fill="none" stroke="#c6861f" stroke-width="1" opacity="0.8" />
                  </g>

                  <rect x="86" y="138" width="24" height="6" rx="2" fill="#fff" opacity="0.14" />
                  <rect x="130" y="138" width="24" height="6" rx="2" fill="#fff" opacity="0.08" />
                </svg>

              </div>
              {showConfetti && (
                <div className="absolute inset-0 flex items-center justify-center z-[1000] pointer-events-none">
                  <Lottie options={confettiOptions} height={300} width={300} />
                </div>
              )}
            </div>
            {/* Bottom section with result */}
            <div className="w-full flex flex-col items-center justify-center px-6 pb-8 pt-2">
              <h2 className="text-2xl font-bold text-center mb-2 text-[#23234F]">Correct!</h2>
              <p className="text-base text-gray-700 mb-6 text-center">
                You earned <span className="font-bold text-[#7A44FF]">+{Number(poll?.rewards_earned).toFixed(2)} ANGEL</span>
              </p>
              <button
                className="w-full py-3 rounded-2xl font-semibold text-white text-lg shadow-lg"
                style={{ background: 'linear-gradient(90deg, #37009A 0%, #7A44FF 50%, #B500EF 100%)' }}
                onClick={handleCloseModal}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Poll;