import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserPoll } from "../../store/slices/rewardsHubSlice";
import RankProgress from "../capxdashboard/RankProgress";
import EarnAngelSection from "./EarnAngelSection";
import Poll from "./Poll";
import PollResults from "./PollResults";
import ProgressSection from "./ProgressSection";
import RewardsHeader from "./RewardsHeader";
import SpinWheel from "./SpinWheel";
import SurveySection from "./SurveySection";
import Layout from "../../components/layout/Layout";
 
const AngelSeedReward = () => {
  const dispatch = useDispatch();

  const [pollData, setPollData] = useState(null);
  const [pollAnswers, setPollAnswers] = useState(null);

  useEffect(() => {
    dispatch(fetchUserPoll())
      .unwrap()
      .then((response) => {
        if (response.status === "ok") {
          setPollData(response.poll);
          setPollAnswers(response.answers);
        }
      })
      .catch((err) => console.error("Failed to fetch poll:", err));
  }, [dispatch]);

  return (
    <Layout>
      <div className="bg-white h-fit overflow-hidden px-5 flex flex-col gap-5">
        <RewardsHeader />
        <RankProgress />
        <ProgressSection />
        <EarnAngelSection />
        <div className="w-full">
          <h2 className="font-bold text-2xl text-center mb-2">Luck & Logic</h2>
          <p className="text-gray-500 text-sm mb-4 text-center">
            Both lead to earning AngelSEED rewards...
          </p>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-center gap-6 p-4">
            <SpinWheel />
            <Poll poll={pollData} />
          </div>
        </div>
        <PollResults answers={pollAnswers} />
        <SurveySection />
      </div>
    </Layout>
  );
};

export default AngelSeedReward;