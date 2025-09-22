import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserPoll, fetchRewardsHubData, fetchAngelLeaderBoard, fetchSpinWheelData, submitPoll, spinWheelUpdate, fetchQuizQuestions, fetchSurveys } from "../../store/slices/rewardsHubSlice";
import RankProgress from "../capxdashboard/RankProgress";
import EarnAngelSection from "./EarnAngelSection";
import Poll from "./Poll";
import PollResults from "./PollResults";
import ProgressSection from "./ProgressSection";
import RewardsHeader from "./RewardsHeader";
import SpinWheel from "./SpinWheel";
import SurveySection from "./SurveySection";
import Layout from "../../components/layout/Layout";
import encryptData from "../../utils/encryption/encryption";
import hashing from "../../utils/encryption/hashing";
 
const AngelSeedReward = () => {
  const dispatch = useDispatch();

  const [pollAnswers, setPollAnswers] = useState(null);
  const [isSubmittingPoll, setIsSubmittingPoll] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const angelLeaderBoard = useSelector((state) => state.rewards?.angelLeaderboard);
  const rewardsHubData = useSelector((state) => state.rewards?.rewardsHubData);
  const spinWheelData = useSelector((state) => state.rewards?.spinWheelData);
  const pollData = useSelector((state) => state.rewards?.userPoll);
  const spinWheelRewards = useSelector((state) => state.rewards?.spinWheelRewards);
  const quizQuestions = useSelector((state) => state.rewards?.quizQuestions);
  const surveys = useSelector((state) => state.rewards?.surveys);

  // Function to fetch all data
  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      await Promise.all([
        dispatch(fetchRewardsHubData()),
        dispatch(fetchAngelLeaderBoard()),
        dispatch(fetchSpinWheelData()),
        dispatch(fetchUserPoll()),
        dispatch(fetchQuizQuestions()),
        dispatch(fetchSurveys()),
        dispatch(spinWheelUpdate("spinwheel"))
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);
  
  // Handle poll submission
  const handlePollSubmit = async (pollId, selectedOption) => {
    if (!pollId || !selectedOption || isSubmittingPoll) return false;

    setIsSubmittingPoll(true);

    try {
      const pollData = {
        pollid: pollId,
        selected_options: selectedOption,
      };

      const { encryptedData, id } = encryptData(pollData);
      const { reqdata } = hashing(pollData, id);
      
      const payload = {
        data: encryptedData,
        reqid: id,
        reqdata: reqdata,
      };
      
      // Submit poll and get result
      const result = await dispatch(submitPoll(payload)).unwrap();
      // Refresh poll data
      if (result.status === "ok") {
        await dispatch(fetchUserPoll());
        setIsSubmittingPoll(false);
        return true;
      }
      
      setIsSubmittingPoll(false);
      return false;
    } catch (error) {
      console.error("Failed to submit poll:", error);
      setIsSubmittingPoll(false);
      return false;
    }
  };

  const refreshSpinWheelData = () => {
    dispatch(fetchSpinWheelData());
    dispatch(spinWheelUpdate("spinwheel"));
    dispatch(fetchRewardsHubData());
    dispatch(fetchAngelLeaderBoard());
  };
  

  // console.log("survey", surveys, quizQuestions)
  // Render loading state
  if (isLoading) {
    return (
      <Layout>
        <div className="bg-white h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500 mb-4"></div>
            <p className="text-gray-600">Loading rewards data...</p>
          </div>
        </div>
      </Layout>
    );
  }

  // console.log("spin data", spinWheelData, spinWheelRewards);
  
  return (
    <Layout menu_one="Rewards" menu_two="Rewards Hub">
      <div className="bg-white h-fit overflow-hidden px-5 flex flex-col gap-5">
        <RewardsHeader />
        
        {rewardsHubData ? (
          <RankProgress hubData={rewardsHubData} />
        ) : (
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-500">Rank progress data is loading...</p>
          </div>
        )}
        
        {rewardsHubData && angelLeaderBoard ? (
          <ProgressSection hubData={rewardsHubData} leaderBoard={angelLeaderBoard} />
        ) : (
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-500">Progress and leaderboard data is loading...</p>
          </div>
        )}
        
        <EarnAngelSection />
        
        <div className="w-full">
          <h2 className="font-bold text-2xl text-center mb-2">Luck & Logic</h2>
          <p className="text-gray-500 text-sm mb-4 text-center">
            Both lead to earning AngelSEED rewards... {spinWheelRewards?.is_spin_wheel_available}
          </p>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-center gap-6 p-4">
            {/* Fix: Check for spinWheelData?.spin and spinWheelRewards?.spin instead of pollData */}

            {spinWheelData && spinWheelData?.is_spin_wheel_available ? (
              <SpinWheel spin={spinWheelData.spin} rewards={spinWheelRewards.data} id={spinWheelRewards.spin} disable={false}/>
            ) : (
              <div className="text-center p-4 bg-gray-50 rounded-lg w-full md:w-1/2">
                <SpinWheel spin={spinWheelData.spin} rewards={spinWheelRewards.data} id={spinWheelRewards.spin} disable={true}/>
              </div>
            )}
            
            {pollData ? (
              <Poll 
                poll={pollData} 
                onSubmit={handlePollSubmit} 
                isSubmitting={isSubmittingPoll} 
              />
            ) : (
              <div className="text-center p-4 bg-gray-50 rounded-lg w-full md:w-1/2">
                <p className="text-gray-500">Poll data is loading...</p>
              </div>
            )}
          </div>
        </div>
        
        {pollData?.answers && (
          <PollResults answers={pollData.answers} />
        )}
        
        {quizQuestions && surveys ? (
          <SurveySection
            quizQuestions={quizQuestions}
            surveys={surveys}
            onSurveyComplete={() => dispatch(fetchSurveys())}
            onSpinComplete={refreshSpinWheelData}
          />
        ) : (
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-500">Quiz and survey data is loading...</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AngelSeedReward;