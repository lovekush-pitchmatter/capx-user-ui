import { FaBug, FaSpider} from "react-icons/fa"
import ant from "../../assets/images/ant.png";
import bee from "../../assets/images/bee.png";

const RankProgress = () => {

  return (
    <div className="flex items-center justify-between bg-gray-100 rounded-lg shadow p-2 md:p-4 border border-gray-200 w-full relative min-h-[70px] sm:min-h-fit sm:scale-100 scale-100">
      {/* Left Side - Current Rank */}
      <div className="flex items-center gap-1 md:gap-2">
        <img src={ant} alt="Ant" className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
        <div className="flex flex-col">
          <span className="text-gray-700 font-semibold text-xs md:text-md">Ant</span>
          <span className="text-gray-500 text-xs hidden md:block">Current Rank</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="flex flex-col flex-1 mx-2 md:mx-4 bg-transparent border-2 border-purple-800 p-1 md:p-2 rounded-md relative">
        <div className="w-full bg-transparent rounded-full h-4 md:h-6 relative">
          <div
            className="bg-gradient-to-r from-[#B500EF] to-[#37009A] h-4 md:h-6 rounded-full"
            style={{ width: "0%"}}
          ></div>
          <p className="absolute top-0 left-1 sm:left-2 md:left-10 text-[9px] sm:text-xs md:text-sm hidden sm:block">0.00</p>
          <span className="absolute inset-0 flex items-center justify-center text-[9px] sm:text-xs md:text-md font-medium text-gray-700 text-center px-1 leading-tight">
            <span className="hidden sm:inline">You need</span>
            <span className="text-purple-800 mx-1">
              <span className="hidden sm:inline">1,000 AngelSEED (ANGEL)</span>
              <span className="sm:hidden">1,000 ANGEL</span>
            </span>
            <span className="hidden sm:inline">coins to level up</span>
          </span>
        </div>
        <span className="bg-blue-800 text-white px-1 md:px-2 py-0.5 rounded-md text-xs md:text-sm font-bold absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10">
          1
        </span>
      </div>

      {/* Right Side - Next Rank */}
      <div className="flex items-center gap-1 md:gap-2">
        <span className="bg-purple-800 text-white p-1 px-2 md:px-3 rounded-md text-sm md:text-lg font-bold">
          2
        </span>
        <div className="flex flex-col items-end">
          <span className="text-gray-700 font-semibold text-xs md:text-md">Bee</span>
          <span className="text-gray-500 text-xs hidden md:block">Next Rank</span>
        </div>
        <img src={bee} alt="Bee" className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
      </div>
    </div>
  )
}

export default RankProgress