import RankProgress from "../capxdashboard/RankProgress";
import EarnAngelSection from "./EarnAngelSection";
import Poll from "./Poll";
import PollResults from "./PollResults";
import ProgressSection from "./ProgressSection";
import RewardsHeader from "./RewardsHeader";
import SpinWheel from "./SpinWheel";
import SurveySection from "./SurveySection";

const AngelSeedReward = () => {
  return (
    <div className="bg-white h-fit overflow-hidden px-5 flex flex-col gap-5">
      <RewardsHeader/>
      <RankProgress/>
      <ProgressSection/>
      <EarnAngelSection/>
      <div className="w-full">
        <h2 className="font-bold text-2xl text-center mb-2">Luck & Logic</h2>
        <p className="text-gray-500 text-sm mb-4 text-center">
          Both lead to earning AngelSEED rewards...
        </p>
        <div className="flex  gap-5">
          <SpinWheel/>
          <Poll/>
        </div>
      </div>
      <PollResults/>
      <SurveySection/>
    </div>
  )
}

export default AngelSeedReward;