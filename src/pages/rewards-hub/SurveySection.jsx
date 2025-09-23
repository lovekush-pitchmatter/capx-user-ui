import { useState, useEffect, useRef } from "react";
import quiz from "../../assets/images/quiz-r.png";
import encryptData from "../../utils/encryption/encryption";
import hashing from "../../utils/encryption/hashing";
import { submitSurvey, submitQuizAnswer } from "../../store/slices/rewardsHubSlice";
import { useDispatch } from "react-redux";
import Lottie from "react-lottie";
import celebrationAnimation from "../../assets/celebration.json";
import { is } from "date-fns/locale";

const SurveySection = ({ quizQuestions, surveys, onSurveyComplete, onQuizComplete }) => {

  console.log("hello 1", quizQuestions)
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState("");
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const [congratsModalOpen, setCongratsModalOpen] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Quiz timer state
  const [quizTimer, setQuizTimer] = useState(40);
  const timerRef = useRef(null);

  // Survey state management
  const [currentSurveyIndex, setCurrentSurveyIndex] = useState(0);
  const [surveyResponses, setSurveyResponses] = useState([]);
  const [surveyCompleted, setSurveyCompleted] = useState(false);
  const [disable, setDisableButton] = useState(false);

  // Confirm modal state
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  // Add loading states
  const [skipLoading, setSkipLoading] = useState(false);
  const [nextLoading, setNextLoading] = useState(false);
  const [quizSubmitLoading, setQuizSubmitLoading] = useState(false);
  const [quizParticipateLoading, setQuizParticipateLoading] = useState(false);
  const [congratsQuizModalOpen, setCongratsQuizModalOpen] = useState(false);
  const [ifcorrect, setIfCorrect] = useState(false);
  const [skipped, setSkipped] = useState(false);

  // Add error state for survey
  const [surveyError, setSurveyError] = useState("");

  // Check if quiz and survey are available
  const isQuizAvailable = quizQuestions?.quiz_available === 1;
  const isQuizAnswered = quizQuestions?.is_quiz_answered === 1;
  const isSurveyAvailable = surveys?.survey_available === 1;
  //  console.log("isQuizAvailable:", isQuizAvailable);
  // console.log("isSurveyAvailable:", isSurveyAvailable);
    const confettiOptions = {
      loop: false, // Play only once
      autoplay: true,
      animationData: celebrationAnimation,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };

  // Reset timer when quiz modal opens
  useEffect(() => {
    if (quizModalOpen) {
      setQuizTimer(40);
      timerRef.current = setInterval(() => {
        setQuizTimer(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleQuizAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [quizModalOpen]);

  // Initialize survey responses
  useEffect(() => {
    if (isSurveyAvailable && surveys?.survey?.length > 0) {
      setSurveyResponses(
        surveys.survey.map(survey => ({
          survey_id: survey._id,
          is_skiped: false,
          response: ""
        }))
      );
      setCurrentSurveyIndex(0);
      setSelectedOption("");
      setSurveyCompleted(false);
    }
  }, [isSurveyAvailable, surveys]);


  const closeSurveyModal = () => {
    setShowConfetti(false);
    setCongratsModalOpen(false);
  };

  const handleQuizAutoSubmit = () => {
    // Get a random answer when timer expires
    const options = quizQuestions?.options || [];
    const randomIndex = Math.floor(Math.random() * options.length);
    const randomAnswer = options[randomIndex];
    setQuizSubmitLoading(true);
    setSkipped(true);
    submitQuizAnswers(randomAnswer, false);
  };

  const handleQuizSubmit = () => {
    setQuizSubmitLoading(true);
    submitQuizAnswers(selectedOption, true);
  };

  const submitQuizAnswers = async (answer, isUserInitiated) => {
    // Encrypt quiz data before sending

      const surveyData = {
        quizid: quizQuestions?.quiz?._id,
        quiz_answer: answer,
        is_user_initiated: isUserInitiated ? true : false
      };

      const { encryptedData, id } = encryptData(surveyData);
      const { reqdata } = hashing(surveyData, id);
      const payload = {
        data: encryptedData,
        reqid: id,
        reqdata: reqdata
      };

      const result = await dispatch(submitQuizAnswer(payload));
      if (result?.payload?.status === "ok") {

        setQuizSubmitLoading(false);
        setQuizModalOpen(false);
        if(result?.payload?.correct){

          onQuizComplete();
          setCongratsQuizModalOpen(true);
          setIfCorrect(true);
          setShowConfetti(true);

        }else{

          onQuizComplete();
          setCongratsQuizModalOpen(true);
          setIfCorrect(false);

        }

      }else{

        onQuizComplete();
        setQuizSubmitLoading(false);
        setQuizModalOpen(false);

      }


  };

  const handleCloseQuizModal = () => {
    // Open confirmation modal instead of using window.confirm
    setConfirmAction(() => () => {
      setQuizModalOpen(false);
      clearInterval(timerRef.current);
    });
    setConfirmModalOpen(true);
  };

  const handleSurveyOptionSelect = (option) => {
    setSelectedOption(option);

    // Clear any error when user selects an option
    if (surveyError) {
      setSurveyError("");
    }

    // Update the current survey response
    setSurveyResponses(prev =>
      prev.map((resp, idx) =>
        idx === currentSurveyIndex
          ? { ...resp, response: option, is_skiped: false }
          : resp
      )
    );
  };

  const handleSurveyNext = () => {
    // If no option is selected, show error message instead of alert
    if (!selectedOption && currentSurvey) {
      setSurveyError("Please select an option to continue");
      return;
    }

    setNextLoading(true);

    // Check if we're on the last question
    if (currentSurveyIndex < surveys.survey.length - 1) {
      // Simulate API call with a timeout
      setTimeout(() => {
        // Move to next question
        setCurrentSurveyIndex(prev => prev + 1);
        setSelectedOption("");
        setNextLoading(false);
      }, 800);
    } else {
      // This is the last question, submit the survey
      handleSurveySubmit();
      // Loading state will be reset in the handleSurveySubmit function
    }
  };

  const handleSurveySkip = () => {
    setSkipLoading(true);

    // Mark current question as skipped
    setSurveyResponses(prev =>
      prev.map((resp, idx) =>
        idx === currentSurveyIndex
          ? { ...resp, is_skiped: true, response: "" }
          : resp
      )
    );

    // Check if we're on the last question
    if (currentSurveyIndex < surveys.survey.length - 1) {
      // Simulate API call with a timeout
      setTimeout(() => {
        // Move to next question
        setCurrentSurveyIndex(prev => prev + 1);
        setSelectedOption("");
        setSkipLoading(false);
      }, 800);
    } else {
      // This is the last question, submit the survey
      handleSurveySubmit();
      // Loading state will be reset in the handleSurveySubmit function
    }
  };

  const handleSurveySubmit = async () => {
    try {
      setNextLoading(true);
      setSkipLoading(true);
      const surveyData = {
        survey_response: surveyResponses,
        main_survey_id: surveys?.survey[0]?.main_survey_id,
      };

      const { encryptedData, id } = encryptData(surveyData);
      const { reqdata } = hashing(surveyData, id);
      const payload = {
        data: encryptedData,
        reqid: id,
        reqdata: reqdata
      };

      // Submit survey (simulate or use API)
      const result = await dispatch(submitSurvey(payload));
      // console.log("survey submission result:", result);
      // Refresh poll data
      if (result?.payload?.status === "ok") {

        setDisableButton(true);
        setNextLoading(false);
        setSkipLoading(false);
        setShowConfetti(true);
        setCongratsModalOpen(true);
        // Call parent callback to refetch survey data
        if (typeof onSurveyComplete === "function") {
          onSurveyComplete();
        }

      } else {
        setNextLoading(false);
        setSkipLoading(false);
      }
    } catch (error) {
      console.error("Error submitting spin result:", error);
    }



  };

  // Get current survey question and options
  const currentSurvey = isSurveyAvailable && surveys?.survey ? surveys.survey[currentSurveyIndex] : null;
  const surveyOptions = currentSurvey?.options || [];
  const surveyQuestion = currentSurvey?.question_text || "No survey question available";
  const isLastQuestion = currentSurveyIndex === (surveys?.survey?.length - 1);

  return (
    <div className="w-full h-fit">
      <h2 className="text-center text-2xl font-bold mb-2">
        Answer & Earn
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Engage your mind, Earn with ease.
      </p>

      <div className="flex flex-col md:flex-row gap-6 h-fit items-stretch">
        {/* Survey Card */}
        <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-2/3 flex flex-col justify-between" style={{ boxShadow: "0 2px 2px rgba(0,0,0,0.1), 0 -2px 2px rgba(0,0,0,0.1)" }}>
          <div>
            <h2 className="text-lg font-semibold mb-1">Survey for Deal Flow</h2>
            <p className="text-sm text-gray-500 mb-4">
              Help us bring you better deals.
            </p>

            {isSurveyAvailable && currentSurvey && !surveyCompleted ? (
              <>
                <h3 className="text-base font-medium mb-3">
                  Question {currentSurveyIndex + 1}/{surveys.survey.length}: {surveyQuestion}
                </h3>

                {/* Error message box */}
                {surveyError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 text-sm">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {surveyError}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  {/* If already_answered, show user's answers and skipped status */}
                  {surveys?.already_answered == 1
                    ? (
                      surveys?.answer?.[currentSurveyIndex]?.is_skiped ? (
                        <label className="flex items-center space-x-2 cursor-default">
                          <input
                            type="radio"
                            name="survey-option"
                            value="skipped"
                            checked={true}
                            disabled
                            className="accent-purple-600"
                          />
                          <span className="text-gray-700 font-bold text-purple-700">Skipped</span>
                          <span className="ml-2 text-xs bg-purple-600 text-white px-2 py-1 rounded">You skipped</span>
                        </label>
                      ) : (
                        surveyOptions.map((option) => {
                          const checked = surveys?.answer?.[currentSurveyIndex]?.selected_option === option;
                          return (
                            <label
                              key={option}
                              className="flex items-center space-x-2 cursor-default"
                            >
                              <input
                                type="radio"
                                name="survey-option"
                                value={option}
                                checked={checked}
                                disabled
                                className="accent-purple-600"
                              />
                              <span className={`text-gray-700 ${checked ? "font-bold text-purple-700" : ""}`}>
                                {option}
                              </span>
                              {checked && (
                                <span className="ml-2 text-xs bg-purple-600 text-white px-2 py-1 rounded">Your Answer</span>
                              )}
                            </label>
                          );
                        })
                      )
                    )
                    : (
                      surveyOptions.map((option) => (
                        <label
                          key={option}
                          className="flex items-center space-x-2 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="survey-option"
                            value={option}
                            checked={selectedOption === option}
                            onChange={() => handleSurveyOptionSelect(option)}
                            className="accent-purple-600"
                          />
                          <span className="text-gray-700">{option}</span>
                        </label>
                      ))
                    )
                  }
                </div>
              </>
            ) : surveyCompleted ? (
              <p className="text-sm text-green-600 font-medium mb-4">
                Thank you for completing the survey! Your feedback is valuable.
              </p>
            ) : (
              <p className="text-sm text-yellow-600 font-medium mb-4">
                No surveys available at the moment. Check back later!
              </p>
            )}
          </div>

          <div className="mt-6">
            <p className="text-sm text-purple-600 font-medium mb-4">
              +{surveys?.survey_rewards} AngelSEED tokens for completing this survey
            </p>
            <div className="flex gap-4">
              {/* Hide skip button if already_answered */}
              {!(surveys?.already_answered == 1) && (
                <button
                  className="w-1/3 bg-white border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-100 transition flex justify-center items-center"
                  onClick={handleSurveySkip}
                  disabled={!isSurveyAvailable || surveyCompleted || skipLoading || disable}
                >
                  {skipLoading ? (
                    <svg className="animate-spin h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    isLastQuestion ? "Skip & Submit" : "Skip"
                  )}
                </button>
              )}
              <button
                className={`${surveys?.already_answered == 1
                    ? "bg-gray-400 cursor-not-allowed w-[100%]"
                    : selectedOption || isLastQuestion ? "w-1/3 bg-green-500 hover:bg-green-600" : " w-1/3 bg-gray-400"
                  } text-white py-2 rounded-lg font-medium transition flex justify-center items-center`}
                onClick={handleSurveyNext}
                disabled={
                  surveys?.already_answered == 1 ||
                  ((!selectedOption && !isLastQuestion) || !isSurveyAvailable || surveyCompleted || disable)
                }
              >
                {surveys?.already_answered == 1
                  ? "Survey already answered"
                  : nextLoading
                    ? (
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    )
                    : isLastQuestion ? "Submit" : "Next"
                }
              </button>
            </div>
          </div>
        </div>

        {/* Side Card */}
        <div className="bg-gray-100 shadow-md rounded-lg p-6 w-full md:w-1/3 text-center flex flex-col justify-center">
          <div className="flex justify-center mb-3">
            <div className="flex items-center justify-center">
              <img src={quiz} alt="Quiz Quest" className="w-18" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">Ready to Quiz?</h2>
          <p className="text-lg text-gray-800 mb-4">
            Test your knowledge. Earn ANGEL.
          </p>
          {isQuizAvailable && !isQuizAnswered ? (
            <button
              className="w-full bg-gradient-to-r from-[#B500EF] to-[#37009A] text-white py-2 rounded-lg font-medium hover:opacity-90 transition flex justify-center items-center"
              onClick={() => {
                setQuizParticipateLoading(true);
                setTimeout(() => {
                  setQuizModalOpen(true);
                  setQuizParticipateLoading(false);
                }, 500);
              }}
              disabled={quizParticipateLoading}
            >
              {quizParticipateLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                "Participate Now"
              )}
            </button>
          ) : (
            <div>
              <button
                className="w-full bg-gray-400 text-white py-2 rounded-lg font-medium transition"
                disabled
              >
                Quiz already answered
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Quiz Modal */}
      {quizModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-0 w-full max-w-sm shadow-lg flex flex-col items-center overflow-hidden">
            <div className="w-full px-6 pt-6 pb-2">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-bold text-[#23234F]">Quiz Challenge</h2>
                <div className="flex items-center gap-2">
                  <div className="bg-[#F6F3FF] px-3 py-1 rounded-full flex items-center gap-2">
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                      <path d="M12 7v5l3 3" stroke="#7A44FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="12" r="9" stroke="#7A44FF" strokeWidth="2"/>
                    </svg>
                    <span className="text-xs font-semibold text-[#7A44FF]">Time Left: {quizTimer}s</span>
                  </div>
                </div>
                <button
                  className="ml-2 text-gray-400 hover:text-gray-700 text-xl"
                  onClick={handleCloseQuizModal}
                  style={{ lineHeight: 1 }}
                >
                  &times;
                </button>
              </div>
              <hr className="my-2 border-gray-200" />
              <h3 className="text-base font-medium mb-3 mt-2 text-[#23234F]">
                {quizQuestions?.quiz?.question_text}
              </h3>
              <div className="space-y-2 mb-6">
                {(quizQuestions?.quiz?.options).map((option) => (
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
                      className="accent-[#7A44FF] w-5 h-5"
                    />
                    <span className="text-gray-700 text-base">{option}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="w-full flex gap-4 px-6 pb-6">
              <button
                className="flex-1 bg-white border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-100 transition flex justify-center items-center"
                onClick={handleCloseQuizModal}
                disabled={quizSubmitLoading}
              >
                Close
              </button>
              <button
                className={`flex-1 py-2 rounded-lg font-medium transition flex justify-center items-center ${
                  selectedOption
                    ? "bg-gradient-to-r from-[#B500EF] to-[#37009A] text-white hover:opacity-90"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
                onClick={handleQuizSubmit}
                disabled={quizSubmitLoading || !selectedOption}
              >
                {quizSubmitLoading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Congrats Modal */}
      {congratsModalOpen && (
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
              <h2 className="text-2xl font-bold text-center mb-2 text-[#23234F]">Survey Completed!</h2>
              <p className="text-base text-gray-700 mb-6 text-center">
                You earned <span className="font-bold text-[#7A44FF]">+{Number(10).toFixed(2)} ANGEL</span>
              </p>
              <button
                className="w-full py-3 rounded-2xl font-semibold text-white text-lg shadow-lg"
                style={{ background: 'linear-gradient(90deg, #37009A 0%, #7A44FF 50%, #B500EF 100%)' }}
                onClick={() => closeSurveyModal()}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}


      {congratsQuizModalOpen && (
         <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[1000] p-4">
          <div className="bg-white rounded-[32px] shadow-2xl max-w-[360px] w-full p-0 relative flex flex-col items-center overflow-hidden">
            {/* Top section with icon */}
            <div className="w-full flex flex-col items-center justify-center bg-[#F6F7FB] pt-10 pb-8 rounded-t-[32px]">
              {/* Placeholder for icon */}
              <div className="w-20 h-20 flex items-center justify-center mb-2">
                {/* Replace below SVG with your logo if needed */}
                {ifcorrect ? (                
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
                </svg>) : (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
  <circle cx="24" cy="24" r="24" fill="#FFD6D6"/>
  <line x1="16" y1="16" x2="32" y2="32" stroke="red" stroke-width="3" stroke-linecap="round"/>
  <line x1="32" y1="16" x2="16" y2="32" stroke="red" stroke-width="3" stroke-linecap="round"/>
</svg>
)}
              </div>
              {ifcorrect && showConfetti && (
                <div className="absolute inset-0 flex items-center justify-center z-[1000] pointer-events-none">
                  <Lottie options={confettiOptions} height={300} width={300} />
                </div>
              )}
            </div>
            {/* Bottom section with result */}
            {ifcorrect ? <div className="w-full flex flex-col items-center justify-center px-6 pb-8 pt-2">
              <h2 className="text-2xl font-bold text-center mb-2 text-[#23234F]">Quiz answered Correctly!</h2>
              <p className="text-base text-gray-700 mb-6 text-center">
                You earned <span className="font-bold text-[#7A44FF]">+{Number(10).toFixed(2)} ANGEL</span>
              </p>
              <button
                className="w-full py-3 rounded-2xl font-semibold text-white text-lg shadow-lg"
                style={{ background: 'linear-gradient(90deg, #37009A 0%, #7A44FF 50%, #B500EF 100%)' }}
                onClick={() => setCongratsQuizModalOpen(false)}
              >
                Done
              </button>
            </div> : <div className="w-full flex flex-col items-center justify-center px-6 pb-8 pt-2">
              <h2 className="text-2xl font-bold text-center mb-2 text-[#23234F]">{skipped ? "Oops!! You skipped the quiz." : "Oops!! You answered incorrectly."}</h2>
              <p className="text-base text-gray-700 mb-6 text-center">
                <span className="font-bold text-[#7A44FF]">Better luck next time.</span>
              </p>
              <button
                className="w-full py-3 rounded-2xl font-semibold text-white text-lg shadow-lg"
                style={{ background: 'linear-gradient(90deg, #37009A 0%, #7A44FF 50%, #B500EF 100%)' }}
                onClick={() => setCongratsQuizModalOpen(false)}
              >
                Done
              </button>
            </div>}
          </div>
        </div>
      )}

      {/* Confirm Modal */}
      {confirmModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Confirm Action</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to close the quiz? You will not be credited ANGEL for this.</p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
                onClick={() => setConfirmModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                onClick={() => {
                  if (confirmAction) confirmAction();
                  setConfirmModalOpen(false);
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      <div style={{ marginBottom: "80px" }}></div>
    </div>
  )
}

export default SurveySection