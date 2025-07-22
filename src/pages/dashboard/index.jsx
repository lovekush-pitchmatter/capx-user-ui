import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboard } from "../../store/slices/generalSlice";
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

const Dashboard = () => {
  const dispatch = useDispatch();
  const { dashboard, error, loading } = useSelector((state) => state.general);
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    dispatch(fetchDashboard());
    dispatch(getTokenPlanThunk());
    dispatch(getUser());
  }, [dispatch]);

  // console.log("Dashboard Data:", dashboard?.transactions);

  if (loading) return <Loader />;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!dashboard) return null;
 
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
      <div className="flex flex-col-reverse md:grid md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="  md:col-span-2 lg:col-span-3 space-y-4 bg-gray-100 dark:bg-zinc-200 rounded-xl p-2 md:p-4">
           <div className=" grid grid-cols-1 xl:grid-cols-[100%] justify-between gap-4">
            <Box user={user} dashboard={dashboard} />
          </div>
          <SummaryGraph monthlyData={dashboard?.monthlyData} />
          <StatusTable transactions={dashboard?.transactions || []} />
        </div>
        <div className="md:space-y-4 md:sticky max-md:flex flex-col w-full gap-2 top-4 self-start">
          <UserProfile user={user} dashboard={dashboard} />
          <ActionButtons />
          <AssetAllocation dashboard={dashboard} user={user} />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
