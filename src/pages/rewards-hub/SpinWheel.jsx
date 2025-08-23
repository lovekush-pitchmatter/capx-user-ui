import { useState } from "react";
import { Wheel } from "react-custom-roulette";

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

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
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
        onStopSpinning={() => {
          setMustSpin(false);
          alert(`You won: ${data[prizeNumber].option}`);
        }}
      />
      <button
        onClick={handleSpinClick}
        className="w-16 text-sm p-2 px-5 text-center bg-pink-500 text-white rounded-full shadow-lg hover:bg-pink-600 transition-all absolute z-20"
      >
        SPIN NOW
      </button>
    </div>
    )
}

export default SpinWheel