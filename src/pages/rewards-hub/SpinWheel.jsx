import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Wheel } from "react-custom-roulette";
import Lottie from "react-lottie";
import celebrationAnimation from "../../assets/celebration.json";
import confettiPopBanner from "../../assets/confetti-pop-banner.jpg";
import { decrypt } from "../../utils/crypto";
import { submitSpinWheel, fetchRewardsHubData } from "../../store/slices/rewardsHubSlice";
import encryptData from "../../utils/encryption/encryption";
import hashing from "../../utils/encryption/hashing";
// Import sound assets
import spinningSound from "../../assets/sounds/spining_sound.mp3";
import applaudSound from "../../assets/sounds/applaud.mp3";

// Fallback data in case decryption fails
const fallbackData = [
  { option: "+5 ANGEL", style: { backgroundColor: "#FF4B4B", textColor: "white" } },
  { option: "+10 ANGEL", style: { backgroundColor: "#4B70FF", textColor: "white" } },
  { option: "MYSTERY BONUS", style: { backgroundColor: "#6F5BFF", textColor: "white" } },
  { option: "+50 ANGEL", style: { backgroundColor: "#4B70FF", textColor: "white" } },
  { option: "TRY AGAIN", style: { backgroundColor: "#6F5BFF", textColor: "white" } },
  { option: "NEXT TIME", style: { backgroundColor: "#FFA94B", textColor: "white" } },
  { option: "+100 ANGEL", style: { backgroundColor: "#FFA94B", textColor: "white" } },
];
 
const SpinWheel = ({ spin, rewards, id, onSpinComplete, disable }) => {
  const dispatch = useDispatch();
  const decryptedData = decrypt(spin);
  const decryptedRewards = decrypt(rewards);
  const decryptedRewardsId = decrypt(id);
  const [wheelData, setWheelData] = useState([]);
  const [spinWheelAvailable, setSpinWheelAvailable] = useState(false);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [earnedTokens, setEarnedTokens] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [winningId, setWinningId] = useState(null);
  const [tooltip, setTooltip] = useState(false);
  const [used, setUsed] = useState(disable);
  
  // Sound effect refs
  const spinningAudioRef = useRef(new Audio(spinningSound));
  const applaudAudioRef = useRef(new Audio(applaudSound));

  // console.log("decrypted reward 1-2", decryptedData)
  // console.log("decrypted reward 1-3", decryptedRewards)
  
  // Process wheel data when component mounts
  useEffect(() => {
    if (decryptedData) {
      try {
        const parsedData = JSON.parse(decryptedData);
        
        if (parsedData.spin_wheel && Array.isArray(parsedData.spin_wheel)) {
          // Transform data to format expected by react-custom-roulette
          const formattedWheelData = parsedData.spin_wheel.map(item => ({
            option: item.label,
            style: {
              backgroundColor: getColorForIndex(parsedData.spin_wheel.indexOf(item)),
              textColor: "white"
            },
            id: item._id // Store the original ID for later reference
          }));
          
          setWheelData(formattedWheelData);
          setSpinWheelAvailable(parsedData.spin_wheel_available);
        }
      } catch (error) {
        console.error("Error processing wheel data:", error);
      }
    }
  }, [decryptedData]);
  
  // Assign alternating colors to wheel segments
  const getColorForIndex = (index) => {
    const colors = ["#FF4B4B", "#4B70FF", "#6F5BFF", "#FFA94B"];
    return colors[index % colors.length];
  };
  
  // Find the predetermined winning prize based on decryptedRewards
  useEffect(() => {
  if (decryptedRewards && wheelData.length > 0) {
    // decryptedRewards is already the winning ID
    const winningIndex = wheelData.findIndex(item => item.id === decryptedRewards);

    if (winningIndex >= 0) {
      setWinningId(decryptedRewards);
      setPrizeNumber(winningIndex);
      // console.log("Stopping at prize index:", winningIndex, "with ID:", decryptedRewards);
    } else {
      // console.warn("Winning ID not found in wheel data, falling back random");
      setPrizeNumber(Math.floor(Math.random() * wheelData.length));
    }
  }
}, [decryptedRewards, wheelData]);
  
  const handleSpinClick = () => {
    if (!spinWheelAvailable || isSubmitting) return;

    // if (disable) {
    //   // show tooltip for 2 seconds
    //   setTooltip(true);
    //   setTimeout(() => setTooltip(false), 2000);
    //   return;
    // }
    
    // Play spinning sound
    spinningAudioRef.current.currentTime = 0;
    spinningAudioRef.current.play().catch(error => {
      console.warn("Error playing spinning sound:", error);
    });
    
    // Use the predetermined prize number from the server
    if (wheelData.length > 0) {
      setMustSpin(true);
    }
  };

  const handleSpinEnd = async () => {
    setMustSpin(false);
    setTooltip(true);
    setUsed(true)

    
    // Stop spinning sound
    spinningAudioRef.current.pause();
    spinningAudioRef.current.currentTime = 0;
    
    if (wheelData[prizeNumber]) {
      const winningPrize = wheelData[prizeNumber];
      const hasReward = !winningPrize.option.includes("NEXT TIME") && 
                        !winningPrize.option.includes("TRY AGAIN") && 
                        !winningPrize.option.includes("BETTER LUCK");
      
      setEarnedTokens(hasReward);
      setShowConfetti(hasReward);
      
      // Play applause sound if the user won a prize
      if (hasReward) {
        applaudAudioRef.current.currentTime = 0;
        applaudAudioRef.current.play().catch(error => {
          console.warn("Error playing applause sound:", error);
        });
      }
      
      // Submit the result to the server
      try {
        setIsSubmitting(true);
        
        const spinData = {
          spin_wheel_id: decryptedRewardsId
        };
        
        const { encryptedData, id } = encryptData(spinData);
        const { reqdata } = hashing(spinData, id);
        
        const payload = {
          data: encryptedData,
          reqid: id,
          reqdata: reqdata
        };
        
        const result = await dispatch(submitSpinWheel(payload)).unwrap();

        if (result.status === "ok") {
          console.log("Spin result submitted successfully");
          // Refresh rewardsHubData
          dispatch(fetchRewardsHubData());
          // Call the callback to refresh spin and rewards data
          if (typeof onSpinComplete === 'function') {
            onSpinComplete();
          }
        } else {
          console.error("Failed to submit spin result:", result.message);
        }
      } catch (error) {
        console.error("Error submitting spin result:", error);
      } finally {
        setIsSubmitting(false);
        setModalOpen(true);
      }
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

  // Set up audio once when component mounts
  useEffect(() => {
    // Preload the audio files
    spinningAudioRef.current.load();
    applaudAudioRef.current.load();
    
    // Clean up audio when component unmounts
    return () => {
      spinningAudioRef.current.pause();
      applaudAudioRef.current.pause();
      spinningAudioRef.current.currentTime = 0;
      applaudAudioRef.current.currentTime = 0;
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-fit relative w-full">
      {/* Red message overlay if disabled */}
      {used && (
        <div
          className="absolute w-full flex justify-center items-center z-30"
          style={{
            top: 0,
            left: 0,
            height: '100%',
            background: 'rgba(255, 0, 0, 0.32)',
            pointerEvents: 'none'
          }}
        >
          <div className="border border-red-500 bg-red-50 text-red-600 px-4 py-2 rounded shadow-md mt-2">
            Spin wheel already used for today
          </div>
        </div>
      )}
      {wheelData.length > 0 ? (
        <>
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={wheelData}
            outerBorderColor={["#ccc"]}
            outerBorderWidth={4}
            innerBorderColor={["#ccc"]}
            radiusLineColor={["#fff"]}
            radiusLineWidth={2}
            textDistance={60}
            fontSize={window.innerWidth < 768 ? 12 : 14}
            spinDuration={0.5}
            startingOptionIndex={0}
            width={window.innerWidth < 768 ? 200 : 250}
            onStopSpinning={handleSpinEnd}
          />
          <button
            onClick={() => {
              if (disable) {
                setTooltip(true);
                setTimeout(() => setTooltip(false), 2000);
                return;
              }
              handleSpinClick();
            }}
            disabled={!spinWheelAvailable || isSubmitting || mustSpin || tooltip || disable}
            className={`w-12 h-12 md:w-14 md:h-14 text-xs md:text-sm p-2 px-0 text-center 
              ${spinWheelAvailable && !isSubmitting && !mustSpin && !tooltip && !disable
                ? "bg-[#FF8974] hover:bg-pink-600"
                : "bg-gray-400"}
              text-white font-bold rounded-full shadow-lg transition-all absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
          >
            {isSubmitting ? "..." : "SPIN NOW"}
          </button>

          {/* {used && <p className="text-red-500">Spin wheel already used for today</p>} */}
        </>
      ) : (
        <div className="flex items-center justify-center h-[250px]">
          <p className="text-gray-500">Loading wheel...</p>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000] p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md text-center relative z-[1010]">
            {earnedTokens && showConfetti && (
              <div className="absolute inset-0 flex items-center justify-center z-[1000] pointer-events-none">
                <Lottie options={confettiOptions} height={300} width={300} />
              </div>
            )}
            <div className="z-[1010]">
              <img src={confettiPopBanner} alt="Confetti Pop Banner" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold mb-4 z-[1010]">
              {earnedTokens ? "Congratulations!" : "Better Luck Next Time!"}
            </h2>
            <p className="text-sm text-gray-500 mb-4 z-[1010]">
              {earnedTokens
                ? `You earned ${wheelData[prizeNumber]?.option || "a reward"}!`
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