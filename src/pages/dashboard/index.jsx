import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboard, fetchActivity, fetchAngelLeaderBoard, fetchCapxLeaderBoard, fetchLoginActivity } from "../../store/slices/rewardsHubSlice";
import { getUser } from "../../store/slices/authSlice";
import ActionButtons from "../../components/dashboard/ActionButtons";
import Box from "../../components/dashboard/Box";
import StatusTable from "../../components/dashboard/StatusTable";
import SummaryGraph from "../../components/dashboard/SummaryGraph";
import UserProfile from "../../components/dashboard/UserProfile";
import Layout from "../../components/layout/Layout";
import Loader from "../loader"
import { Link } from "react-router-dom";
import AssetAllocation from "../../components/dashboard/AssetAllocation";

//new
import BuyCapx from "../../components/dashboard/BuyCapx";
import CalculateProfit from "../../components/dashboard/CalculateProfit";
import CapxValue from "../../components/dashboard/CapxValue";
import MyActivity from "../../components/dashboard/MyActivity";
import Leaderboard from "../../components/dashboard/Leaderboard";
import ReferralProgram from "../../components/dashboard/ReferralProgram";
import LoginActivity from "../../components/dashboard/LoginActivity";
import Portfolio from "../../components/dashboard/Portfolio";

const Dashboard = () => {
  // Simplify selectors to avoid recursion
  const userDashboard = useSelector((state) => state.rewards?.userDashboard);
  const user = useSelector((state) => state.auth?.user);
  const isLoading = useSelector((state) => state.rewards?.loading);
  const userActivity = useSelector((state) => state.rewards?.userActivity);
  const loginActivity = useSelector((state) => state.rewards?.loginActivity);
  const angelLeaderBoard = useSelector((state) => state.rewards?.angelLeaderboard);
  const capxLeaderBoard = useSelector((state) => state.rewards?.capxLeaderboard);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchDashboard());
    dispatch(getUser());
    dispatch(fetchActivity());
    dispatch(fetchCapxLeaderBoard());
    dispatch(fetchLoginActivity());
  }, [dispatch]);
 
  // Use useRef to prevent continuous logging
  const dashboardRef = React.useRef(userDashboard);
  
  useEffect(() => {
    if (userDashboard && userDashboard !== dashboardRef.current) {
      // console.log("user dashboard:", userDashboard);
      dashboardRef.current = userDashboard;
    }
  }, [userDashboard]);

  // Render loading state if data is still loading
  if (isLoading) return <Loader />;

  // console.log("user activity in dashboard 1:", user);
  // console.log("user activity in dashboard:", loginActivity);

  return (
    <Layout>      
      {/* Email update warning */}
      {user && !user.is_email_updated && (
        <div className="flex items-center justify-between mb-4 p-3 bg-red-100 border border-red-400 rounded" style={{ borderRadius: 5 }}>
          <span className="text-red-700 font-medium">Please update your Email Id</span>
          <Link
            className="ml-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition text-sm font-semibold"
            to="/settings?tab=Overview"
          >
            Update Now
          </Link>
        </div> 
      )}
      <div className="w-full max-w-full overflow-x-hidden px-2 md:px-4">
        
        {/* User Profile */}
        {userDashboard && user && (
          <div className="space-y-4">
            <UserProfile user={user} dashboard={userDashboard} />
          </div>
        )}
        
        {/* Boxes with current data */}
        {userDashboard && user && (
          <div className="space-y-6 mt-6">
            <Box user={user} dashboard={userDashboard} />
          </div>
        )}
        
        {/* colorful-boxes */}
        {userDashboard && (
          <div className="space-y-6 mt-6">
            <StatusTable dashboard={userDashboard} />
          </div> 
        )}

        {/* Buy Capx + Profit */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 dashboard-section-buy-capx" style={{ zIndex: 10 }}>
          
          {userDashboard && userDashboard.presalePrices && (
            <>
              <BuyCapx presaleData={userDashboard.presalePrices} currentPresaleStage={userDashboard.currentPresaleStage}/>
              <CalculateProfit presalePriceData={userDashboard.presalePrices} />
            </>
          )}
        </div>

        {/* Capx Value + Activity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {userDashboard && (
            <CapxValue 
              currentPresaleStage={userDashboard.currentPresaleStage} 
              minPresaleAmount={userDashboard.presaleStagePriceMin} 
              maxPresaleAmount={userDashboard.presaleStagePriceMax} 
              totalCapxTokenMarket={userDashboard.totalCapxTokenMarket} 
              totalRaised={userDashboard.totalRaised} 
              totalCapxTokenSold={userDashboard.totalCapxTokenSold} 
            />
          )}
          {userActivity && (
            <MyActivity key="dashboard-activity" userActivity={userActivity} />
          )}
        </div>

        {/* Referral + Leaderboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {user && (
            <ReferralProgram user={user} />
          )}
          {capxLeaderBoard && (
            <Leaderboard capxLeaderBoard={capxLeaderBoard} />
          )}
        </div>

        {/* Login Activity + Portfolio */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {loginActivity && (
            <LoginActivity loginActivity={loginActivity}/>
          )}
          {user && (
            <Portfolio user={user} />
          )}
        </div>
      </div>
    </Layout>
  );
};

// Remove the custom comparison function from React.memo
export default React.memo(Dashboard);