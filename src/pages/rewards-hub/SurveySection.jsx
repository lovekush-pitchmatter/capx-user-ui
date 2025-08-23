import { useState } from "react";
import quiz from "../../assets/images/quiz-r.png";

const SurveySection = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const [congratsModalOpen, setCongratsModalOpen] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(false);

  const options = ["Learning", "Rewards", "Networking", "Prefer not to say"];
  const correctOption = "Learning";

  const handleQuizSubmit = () => {
    if (selectedOption === correctOption) {
      setCorrectAnswer(true);
      setCongratsModalOpen(true);
      setTimeout(() => setCongratsModalOpen(false), 4000); // Auto-close after 4 seconds
    } else {
      setCorrectAnswer(false);
    }
  };

  const handleCloseQuizModal = () => {
    const confirmClose = window.confirm("Are you sure you want to close the quiz?");
    if (confirmClose) {
      setQuizModalOpen(false);
    }
  };

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
        <div className="bg-white shadow-md rounded-lg p-6 w-2/3 flex flex-col justify-between" style={{ boxShadow: "0 2px 2px rgba(0,0,0,0.1), 0 -2px 2px rgba(0,0,0,0.1)" }}>
          <div>
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

          <div className="mt-6">
            <p className="text-sm text-purple-600 font-medium mb-4">
              +10 ANGEL for completing this survey
            </p>
            <div className="flex gap-4">
              <button className="w-1/3 bg-white border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-100 transition">
                Skip
              </button>
              <button className="w-1/3 bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 transition">
                Next
              </button>
              <button
                className="w-1/3 bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white py-2 rounded-lg font-medium hover:opacity-90 transition"
                onClick={() => setQuizModalOpen(true)}
              >
                Submit
              </button>
            </div>
          </div>
        </div>

        {/* Side Card */}
        <div className="bg-gray-100 shadow-md rounded-lg p-6 w-1/3 text-center flex flex-col justify-center">
          <div className="flex justify-center mb-3">
            <div className="flex items-center justify-center">
              <img src={quiz} alt="Quiz Quest" className="w-18" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">Ready to Quiz?</h2>
          <p className="text-sm text-gray-500 mb-4">
            Test your knowledge. Earn ANGEL.
          </p>
          <button
            className="w-full bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white py-2 rounded-lg font-medium hover:opacity-90 transition"
            onClick={() => setQuizModalOpen(true)}
          >
            Participate Now
          </button>
        </div>
      </div>

      {/* Quiz Modal */}
      {quizModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Quiz Challenge</h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={handleCloseQuizModal}
              >
                ✖
              </button>
            </div>
            <p className="text-sm text-gray-500 mb-4">Time Left: 40s</p>
            <h3 className="text-base font-medium mb-3">
              What does a blockchain store?
            </h3>
            <div className="space-y-2">
              {options.map((option) => (
                <label
                  key={option}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="quiz"
                    value={option}
                    checked={selectedOption === option}
                    onChange={() => setSelectedOption(option)}
                    className="accent-purple-600"
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
              ))}
            </div>
            <div className="flex gap-4 mt-6">
              <button
                className="w-1/2 bg-white border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-100 transition"
                onClick={handleCloseQuizModal}
              >
                Skip
              </button>
              <button
                className="w-1/2 bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white py-2 rounded-lg font-medium hover:opacity-90 transition"
                onClick={handleQuizSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Congrats Modal */}
      {congratsModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md text-center">
            <h2 className="text-2xl font-bold mb-4">Correct!</h2>
            <p className="text-sm text-gray-500 mb-4">
              You earned <span className="text-purple-600 font-bold">+10.00 ANGEL</span>
            </p>
            <button
              className="w-full bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white py-2 rounded-lg font-medium hover:opacity-90 transition"
              onClick={() => setCongratsModalOpen(false)}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default SurveySection