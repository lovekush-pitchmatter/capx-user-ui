import { FaBug, FaSpider} from "react-icons/fa"
import ant from "../../assets/images/ant.png";
import bee from "../../assets/images/bee.png";

const RankProgress = () => {

  return (
<div className="flex items-center justify-between bg-gray-100 rounded-lg shadow p-4 border border-gray-200 w-full relative">
      {/* Left Side - Current Rank */}
      <div className="flex items-center gap-2">
        <img src={ant} alt="Ant" className="w-8 h-8" />
        <div className="flex flex-col">
          <span className="text-gray-700 font-semibold text-md">Ant</span>
          <span className="text-gray-500 text-xs">Current Rank</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="flex flex-col flex-1 mx-4 bg-transparent border-2 border-purple-800 p-2 rounded-md relative">
        <div className="w-full bg-transparent rounded-full h-6 relative">
          <div
            className="bg-purple-700 h-6 rounded-full"
            style={{ width: "0%"}}
          ></div>
          <p className="absolute top-0 left-10">0.00</p>
          <span className="absolute inset-0 flex items-center justify-center text-md font-medium text-gray-700">
            You need  <span className="text-purple-800 mx-1"> 1,000 AngelSEED (ANGEL)</span>  coins to level up
          </span>
        </div>
        <span className="bg-blue-800 text-white px-2 py-0.5 rounded-md text-sm font-bold w-fit absolute left-4">
          1 
        </span>
      </div>

      {/* Right Side - Next Rank */}
      <div className="flex items-center gap-2">
        <span className="bg-purple-800 text-white p-1 px-3 rounded-md text-lg font-bold">
          2
        </span>
        <div className="flex flex-col items-end">
          <span className="text-gray-700 font-semibold text-md">Bee</span>
          <span className="text-gray-500 text-xs">Next Rank</span>
        </div>
        <img src={bee} alt="Bee" className="w-8 h-8" />
      </div>
    </div>    )
}

export default RankProgress