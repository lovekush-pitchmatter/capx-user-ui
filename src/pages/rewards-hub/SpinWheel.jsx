import { useState } from "react";
import { Wheel } from "react-custom-roulette";
import Lottie from "react-lottie";
import celebrationAnimation from "../../assets/celebration.json";
import confettiPopBanner from "../../assets/confetti-pop-banner.jpg";

const data = [
  { option: "+5 ANGEL", style: { backgroundColor: "#FF4B4B", textColor: "white" } },
  { option: "+10 ANGEL", style: { backgroundColor: "#4B70FF", textColor: "white" } },
  { option: "MYSTERY BONUS", style: { backgroundColor: "#6F5BFF", textColor: "white" } },
  { option: "+50 ANGEL", style: { backgroundColor: "#4B70FF", textColor: "white" } },
  { option: "TRY AGAIN", style: { backgroundColor: "#6F5BFF", textColor: "white" } },
  { option: "NEXT TIME", style: { backgroundColor: "#FFA94B", textColor: "white" } },
  { option: "+100 ANGEL", style: { backgroundColor: "#FFA94B", textColor: "white" } },
];

const SpinWheel = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [earnedTokens, setEarnedTokens] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false); // New state for confetti visibility

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  const handleSpinEnd = () => {
    setMustSpin(false);
    const prize = data[prizeNumber].option;
    const earned = !["NEXT TIME", "TRY AGAIN"].includes(prize);
    setEarnedTokens(earned);
    setShowConfetti(earned); // Show confetti only if tokens are earned
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setShowConfetti(false); // Hide confetti after modal is closed
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

  return (
    <div className="flex flex-col items-center justify-center h-fit relative w-1/3">
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        outerBorderColor={["#ccc"]}
        outerBorderWidth={4}
        innerBorderColor={["#ccc"]}
        radiusLineColor={["#fff"]}
        radiusLineWidth={2}
        textDistance={60}
        fontSize={14}
        spinDuration={0.5}
        startingOptionIndex={0}
        width={250}
        onStopSpinning={handleSpinEnd}
      />
      <button
        onClick={handleSpinClick}
        className="w-16 text-sm p-2 px-5 text-center bg-pink-500 text-white rounded-full shadow-lg hover:bg-pink-600 transition-all absolute z-20"
      >
        SPIN NOW
      </button>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
          <div className="bg-white rounded-lg p-6 w-full max-w-md text-center relative z-[1010]">
            {earnedTokens && showConfetti && ( // Show confetti only once
              <div className="absolute inset-0 flex items-center justify-center z-[1000] pointer-events-none">
                <Lottie options={confettiOptions} height={300} width={300} />
              </div>
            )}
            <div className="z-[1010]">
              <img src={confettiPopBanner} alt="Confetti Pop Banner" />
            </div>
            <h2 className="text-2xl font-bold mb-4 z-[1010]">
              {earnedTokens ? "Congratulations!" : "Better Luck Next Time!"}
            </h2>
            <p className="text-sm text-gray-500 mb-4 z-[1010]">
              {earnedTokens
                ? `You earned ${data[prizeNumber].option}!`
                : "Keep trying for a chance to win amazing rewards!"}
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

export default SpinWheel;