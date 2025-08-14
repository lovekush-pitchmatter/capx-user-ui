import RankProgress from "../capxdashboard/RankProgress";
import EarnAngelSection from "./EarnAngelSection";
import ProgressSection from "./ProgressSection";
import RewardsHeader from "./RewardsHeader";

const AngelSeedReward = () => {
  return (
    <div className="bg-white h-fit px-5 flex flex-col gap-5">
      <RewardsHeader/>
      <RankProgress/>
      <ProgressSection/>
      <EarnAngelSection/>
    </div>
  )
}

export default AngelSeedReward;