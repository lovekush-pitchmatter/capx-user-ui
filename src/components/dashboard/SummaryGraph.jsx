import antImage from "../../assets/dashboard/ant.png";
import beeImage from "../../assets/dashboard/bee.png";
import Rankone from "../../assets/dashboard/rank1.png";
import Ranktwo from "../../assets/dashboard/rank2.png";

const RankProgression = () => {
  return (
    <div className="bg-gray-50 rounded-lg p-2 mb-6">
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4">
        {/* Left Side - Current Rank (Ant) */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-center md:justify-start">
          {/* Ant Icon */}
          <div className="w-16 h-16 flex items-center justify-center">
            <img src={antImage} alt="Ant" className="w-12 h-12 object-contain" />
          </div>
          
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-gray-800">Ant</span>
            <span className="text-sm text-gray-500">Current Rank</span>
          </div>
        </div>

        {/* Center - Progress Section */}
        <div className="w-full md:flex-1 md:mx-8">
          <div className="flex items-center gap-4">
            {/* Progress Bar */}
            <div className="flex-1 bg-white rounded-lg border-2 border-purple-200 p-2 text-xs sm:text-sm">
              <div className="flex items-center justify-between">
                {/* Left side of progress bar */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center">
                    <img src={Rankone} alt="Rank 1" className="w-full h-full object-contain" />
                  </div>
                  <span className="text-lg font-semibold text-gray-700">0.00</span>
                </div>
                
                {/* Center text */}
                <div className="text-center flex-1 px-4">
                  <span className="text-gray-600">You need </span>
                  <span className="text-purple-600 font-semibold">1,000 AngelSEED (ANGEL)</span>
                  <span className="text-gray-600"> coins to level up</span>
                </div>
              </div>
            </div>
            
            {/* Rank 2 Badge */}
            <div className="w-8 h-8 flex items-center justify-center">
              <img src={Ranktwo} alt="Rank 2" className="w-full h-full object-contain" />
            </div>
          </div>
        </div>

        {/* Right Side - Next Rank (Bee) */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-center md:justify-end">
          <div className="flex flex-col text-right">
            <span className="text-lg font-semibold text-gray-800">Bee</span>
            <span className="text-sm text-gray-500">Next Rank</span>
          </div>
          
          {/* Bee Icon */}
          <div className="w-16 h-16 flex items-center justify-center">
            <img src={beeImage} alt="Bee" className="w-12 h-12 object-contain" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankProgression;