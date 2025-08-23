import { useState } from "react";

const Poll = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const options = ["AI", "Web3", "Clean Energy", "Robotics"];

  const handleSubmit = () => {
    if (!selectedOption) return;
    setSubmitted(true);
    console.log("Submitted Answer:", selectedOption);
  };

  return (
    <div className="rounded-lg p-8 border shadow-sm w-2/3">
      {/* Title */}
      <h3 className="font-semibold text-gray-900 text-lg">Take Polls</h3>
      <p className="text-gray-500 text-sm mb-4">
        Answer & Earn AngelSEED
      </p>

      {/* Question */}
      <div>
        <h3 className="font-medium text-gray-800 mb-3">
          What’s fueling the future?
        </h3>

        {/* Options */}
        <div className="space-y-2 flex flex-col gap-3">
          {options.map((option) => (
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
              ? "bg-gradient-to-r from-purple-600 to-fuchsia-500 hover:opacity-90 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-600 to-fuchsia-500 hover:opacity-90"
          }`}
        >
          {submitted ? "Submitted" : "Submit Answer"}
        </button>

        {/* Participation count */}
        <p className="text-gray-500 text-sm mt-6">
          12,000+ users participated
        </p>
      </div>
    </div>  
  )
}

export default Poll