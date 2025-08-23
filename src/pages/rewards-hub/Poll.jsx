import { useState } from "react";
import { useDispatch } from "react-redux";
import { submitPoll } from "../../store/slices/rewardsHubSlice";
import encryptData from "../../utils/encryption/encryption";
import hashing from "../../utils/encryption/hashing";
import Lottie from "react-lottie";
import celebrationAnimation from "../../assets/celebration.json";

const Poll = ({ poll }) => {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  if (!poll) {
    return (
      <div className="rounded-lg p-8 border shadow-sm w-2/3">
        <h3 className="font-semibold text-gray-900 text-lg">Take Polls</h3>
        <p className="text-gray-500 text-sm mb-4">No active poll available.</p>
      </div>
    );
  }

  const handleSubmit = async () => {
    if (!selectedOption) return;

    const pollData = {
      pollid: poll._id,
      selected_option: selectedOption,
    };

    const { encryptedData, id } = encryptData(pollData);
    const { reqdata } = hashing(pollData, id);
    const payload = {
      data: encryptedData,
      reqid: id,
      reqdata: reqdata,
    };

    try {
      const result = await dispatch(submitPoll(payload)).unwrap();
      if (result.status === "ok") {
        setSubmitted(true);
        setShowConfetti(true); // Show confetti
        setModalOpen(true); // Open modal
      } else {
        console.error("Poll submission failed:", result.message || "Unknown error");
      }
    } catch (error) {
      console.error("Failed to submit poll:", error);
    }
  };

  const handleCloseModal = () => {
    setShowConfetti(false); // Hide confetti
    setModalOpen(false); // Close modal
  };

  const confettiOptions = {
    loop: false, // Play only once
    autoplay: true,
    animationData: celebrationAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="rounded-lg p-8 border shadow-sm w-2/3">
      {/* Title */}
      <h3 className="font-semibold text-gray-900 text-lg">Take Polls</h3>
      <p className="text-gray-500 text-sm mb-4">Answer & Earn AngelSEED</p>

      {/* Question */}
      <div>
        <h3 className="font-medium text-gray-800 mb-3">{poll.question_text}</h3>

        {/* Options */}
        <div className="space-y-2 flex flex-col gap-3">
          {poll.options.map((option) => (
            <label
              key={option}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="radio"
                name="poll"
                value={option}
                checked={selectedOption === option}
                onChange={() => setSelectedOption(option)}
                className="accent-purple-600 w-4 h-4"
              />
              <span className="text-gray-700">{option}</span>
            </label>
          ))}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!selectedOption || submitted}
          className={`mt-6 w-full py-2 rounded-lg text-white font-medium transition ${
            !selectedOption || submitted
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-[#B500EF] to-[#37009A] hover:opacity-90"
          }`}
        >
          {submitted ? "Submitted" : "Submit Answer"}
        </button>

        {/* Participation count */}
        <p className="text-gray-500 text-sm mt-6">
          {poll.participation_count || 0}+ users participated
        </p>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
          <div className="bg-white rounded-lg p-6 w-full max-w-md text-center relative z-[1010]">
            {showConfetti && (
              <div className="absolute inset-0 flex items-center justify-center z-[1000] pointer-events-none">
                <Lottie options={confettiOptions} height={300} width={300} />
              </div>
            )}
            <h2 className="text-2xl font-bold mb-4 z-[1010]">
              Congratulations!
            </h2>
            <p className="text-sm text-gray-500 mb-4 z-[1010]">
              You successfully submitted your answer!
            </p>
            <button
              className="w-full bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white py-2 rounded-lg font-medium hover:opacity-90 transition z-[1010]"
              onClick={handleCloseModal}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Poll;