import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboard } from "../../store/slices/generalSlice";
import { getUser } from "../../store/slices/authSlice";
import Layout from "../../components/layout/Layout";
import Loader from "../loader";
import { getTokenPlanThunk } from "../../store/slices/transactionSlice";
import { Link } from "react-router-dom";

// Import new and modified components
import UserProfileSection from "./UserProfileSection";
import EarnAngelCoinsActions from "./EarnAngelCoinsActions";
import InvestmentSummaryBoxes from "./InvestmentSummaryBoxes";
import RankingProgress from "./RankingProgress";
import BalanceSummaryBoxes from "./BalanceSummaryBoxes";
import BuyCapXSection from "./BuyCapXSection";
import ProfitCalculator from "./ProfitCalculator";
import CapxValueGraph from "./CapxValueGraph";
import MyActivityTable from "./MyActivityTable";


const Dashboard = () => {
  const dispatch = useDispatch();
  const { dashboard, error, loading } = useSelector((state) => state.general);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchDashboard());
    dispatch(getTokenPlanThunk());
    dispatch(getUser());
  }, [dispatch]);

  if (loading) return <Loader />;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!dashboard || !user) return null; // Ensure user data is also available

  return (
    <Layout>
      {/* Email update warning */}
      {!user?.is_email_updated && (
        <div className="flex items-center justify-between mb-4 p-3 bg-red-100 border border-red-400 rounded-lg">
          <span className="text-red-700 font-medium">Please update your Email Id</span>
          <Link
            className="ml-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition text-sm font-semibold"
            to="/settings?tab=Overview"
          >
            Update Now
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4">
        {/* Left Column (Main Content Area) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Top Row: User Profile and Earn Angel Coins */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <UserProfileSection user={user} />
            </div>
            <div className="md:col-span-2">
              <EarnAngelCoinsActions />
            </div>
          </div>

          {/* Investment Summary Boxes */}
          <InvestmentSummaryBoxes user={user} dashboard={dashboard} />

          {/* Ranking Progress */}
          <RankingProgress />

          {/* Balance Summary Boxes */}
          <BalanceSummaryBoxes />

          {/* Buy CAPX and Profit Calculator */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BuyCapXSection />
            <ProfitCalculator />
          </div>

          {/* CAPX Value Graph and My Activity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CapxValueGraph />
            <MyActivityTable transactions={dashboard?.transactions || []} />
          </div>
        </div>

        {/* Right Column (Side Content Area) */}
        <div className="lg:col-span-1 space-y-6">
          {/* Referral Program */}
          {/* <ReferralProgramSection user={user} />

          {/* Leaderboard */}
          {/* <Leaderboard />

          {/* Login Activity */}
          {/* <LoginActivity />

          {/* Portfolio Chart */}
          {/* //<PortfolioChart dashboard={dashboard} user={user} /> */} */} */} */}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
