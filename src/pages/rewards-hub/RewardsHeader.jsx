import { FaMountain } from "react-icons/fa";
import angelSeedLogo from "../../assets/images/angleseed-logo.png";

const RewardsHeader = () => {
  return (
    <div className="bg-gray-100 p-4 w-full rounded-lg flex gap-4">
      {/* Icon */}
      <div className="p-3 rounded-full w-1/12">
        <img src={angelSeedLogo} alt="AngelSEED Logo" className="w-[40px] h-[40px] object-contain" />
      </div>

      {/* Text Content */}
      <div className="w-11/12">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-3">
          AngelSEED Rewards Hub
        </h1>
        <p className="text-xl text-gray-600 text-center font-semibold">
          Earn free tokens by engaging in polls, surveys, games, spins, quizzes & project <br /> airdrops — all in one place.
        </p>
      </div>
    </div>  
  )
}

export default RewardsHeader