import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboard } from "../../store/slices/rewardsHubSlice";
import { getUser } from "../../store/slices/authSlice";
import ActionButtons from "../../components/dashboard/ActionButtons";
import Box from "../../components/dashboard/Box";
import StatusTable from "../../components/dashboard/StatusTable";
import SummaryGraph from "../../components/dashboard/SummaryGraph";
import UserProfile from "../../components/dashboard/UserProfile";
import Layout from "../../components/layout/Layout";
import Loader from "../loader"
import { getTokenPlanThunk } from "../../store/slices/transactionSlice";
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
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDashboard());
    dispatch(getTokenPlanThunk());
    dispatch(getUser());
  }, [dispatch]);

  const rewardsHubState = useSelector((state) => state.rewardsHub || {});
  const { userDashboard, error, loading } = rewardsHubState;
  const user = useSelector((state) => state.auth.user);

  // console.log("Dashboard Data:", dashboard?.transactions);

  if (loading) return <Loader />;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  // if (!userDashboard) return null;

  console.log("Dashboard Data:", userDashboard);

  return (
    <Layout>
      {/* Email update warning */}
      {!user?.is_email_updated && (
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
        <div className="space-y-4">
          <UserProfile user={user} dashboard={userDashboard} />
        </div>

        {/* Boxes with current data */}
        <div className="space-y-6 mt-6">
          <Box user={user} dashboard={userDashboard} />
        </div>
        
        {/* Rank Progression */}
        {/* <div className="space-y-6 mt-6">
          <SummaryGraph monthlyData={userDashboard} />
        </div> */}

        {/* colorful-boxes */}
        <div className="space-y-6 mt-6">
          <StatusTable transactions={userDashboard?.transactions || []} />
        </div>

        {/* Buy Capx + Profit */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <BuyCapx />
          <CalculateProfit />
        </div>

        {/* Capx Value + Activity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <CapxValue />
          <MyActivity />
        </div>

        {/* Referral + Leaderboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <ReferralProgram />
          <Leaderboard />
        </div>

        {/* Login Activity + Portfolio */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <LoginActivity />
          <Portfolio />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
