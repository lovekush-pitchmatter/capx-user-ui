import { FaBug, FaSpider} from "react-icons/fa"
import ant from "../../assets/images/ant.png";
import bee from "../../assets/images/bee.png";

const RankProgress = ({ hubData }) => {

  const rankPercentage = (hubData?.data?.totalAngelSeedTokens/hubData?.data?.nextRankData?.coins_required_to_level_up) * 100;
  //console.log("rank percentage", rankPercentage, hubData?.data?.totalAngelSeedTokens, hubData?.data?.nextRankData?.coins_required_to_level_up);
  return (
    <div className="flex items-center justify-between bg-gray-100 rounded-lg shadow p-2 md:p-4 border border-gray-200 w-full relative min-h-[70px] sm:min-h-fit sm:scale-100 scale-100">
      {/* Left Side - Current Rank */}
      <div className="flex items-center gap-1 md:gap-2">
        <img src={hubData?.data?.currentRankData?.rank_icon} alt="Ant" className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
        <div className="flex flex-col">
          <span className="text-gray-700 font-semibold text-xs md:text-md">{hubData?.data?.currentRankData?.rank_name}</span>
          <span className="text-black font-semibold text-xs hidden md:block">Current Rank</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="flex flex-col flex-1 mx-2 md:mx-4 bg-[#f2e0ff] border-2 border-purple-800 p-1 md:p-2 rounded-md relative">
        <div className="w-full bg-transparent rounded-full h-4 md:h-6 relative">
          <div
            className="bg-gradient-to-r from-[#B500EF] to-[#37009A] h-4 md:h-6 rounded-full"
            style={{ width: `${rankPercentage}%` }}
          ></div>
          <p className="absolute top-0.5 left-1 sm:left-2 md:left-10 text-[12px] text-white sm:text-xs md:text-sm hidden sm:block font-bold">{(hubData?.data?.totalAngelSeedTokens).toFixed(2)}</p> <p className="absolute top-0.5 left-1 sm:left-2 md:left-10 text-[12px] text-white sm:text-xs md:text-sm block sm:hidden font-bold">{hubData?.data?.totalAngelSeedTokens}</p>
          <span
            className={`absolute inset-0 flex items-center justify-center text-[9px] sm:text-xs md:text-md font-medium text-center px-1 leading-tight ${
              rankPercentage > 50 ? "text-black" : "text-[#000]"
            }`}
          >
            <span className="hidden sm:inline">You need</span>
            <span className="text-purple-800 mx-1">
              <span className={`hidden font-bold sm:inline ${rankPercentage > 50 ? "text-black" : "text-[#F5B027]"}`}>{(hubData?.data?.coinsToLevelUp).toFixed(2)} AngelSEED (ANGEL)</span>
              <span className={`sm:hidden ${rankPercentage > 50 ? "text-black" : "text-[#F5B027]"}`}>{(hubData?.data?.coinsToLevelUp).toFixed(2)} ANGEL</span>
            </span>
            <span className="hidden sm:inline">coins to level up</span>
          </span>
        </div>
        <span className="bg-blue-800 text-white px-1 md:px-2 py-0.5 rounded-md text-xs md:text-sm font-bold absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10">
          {hubData?.data?.currentRankData?.rank_order}
        </span>
      </div>

      {/* Right Side - Next Rank */}
      <div className="flex items-center gap-1 md:gap-2">
        <span className="bg-purple-800 text-white p-1 px-2 md:px-3 rounded-md text-sm md:text-lg font-bold">
          {hubData?.data?.nextRankData?.rank_order}
        </span>
        <div className="flex flex-col items-end">
          <span className="text-gray-700 font-semibold text-xs md:text-md">{hubData?.data?.nextRankData?.rank_name}</span>
          <span className="text-black text-xs hidden md:block font-semibold">Next Rank</span>
        </div>
        <img src={hubData?.data?.nextRankData?.rank_icon} alt="Bee" className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
      </div>
    </div>
  )
}

export default RankProgress