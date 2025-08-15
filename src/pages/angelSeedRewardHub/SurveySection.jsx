import { useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";

const SurveySection = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const options = ["Learning", "Rewards", "Networking"];

  return (
    <div className="w-full h-fit">
      <h2 className="text-center text-2xl font-bold mb-2">
        Answer & Earn
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Engage your mind, Earn with ease.
      </p>

      <div className="flex gap-6 h-fit items-stretch">
        {/* Survey Card */}
        <div className="bg-white shadow-md rounded-lg p-6 w-2/3" style={{ boxShadow: "0 2px 2px rgba(0,0,0,0.1), 0 -2px 2px rgba(0,0,0,0.1)" }}>
          <h2 className="text-lg font-semibold mb-1">Survey for Deal Flow</h2>
          <p className="text-sm text-gray-500 mb-4">
            Help us bring you better deals.
          </p>

          <h3 className="text-base font-medium mb-3">
            What motivates you most on a platform?
          </h3>

          <div className="space-y-2">
            {options.map((option) => (
              <label
                key={option}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="motivation"
                  value={option}
                  checked={selectedOption === option}
                  onChange={() => setSelectedOption(option)}
                  className="accent-purple-600"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Side Card */}
        <div className="bg-gray-100 shadow-md rounded-lg p-6 w-1/3 text-center flex flex-col justify-center">
          <div className="flex justify-center mb-3">
            <div className="bg-yellow-300 rounded-full p-3 w-16 h-16 flex items-center justify-center">
              <FaQuestionCircle className="text-9xl"/>
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">Ready to Quiz?</h2>
          <p className="text-sm text-gray-500">Test your knowledge today!</p>
        </div>
      </div>
    </div>
  )
}

export default SurveySection