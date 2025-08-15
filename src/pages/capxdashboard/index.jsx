import Layout from "../../components/layout/Layout";
import OverviewCards from "./OverviewCards";
import RankProgress from "./RankProgress";
import ReferralsInfo from "./ReferralsInfo";
import UserStats from "./UserStats";

const CapxDashboard  = () => {
  return (
    <Layout className="p-6 bg-gray-50 min-h-screen">
      <UserStats/>
      <OverviewCards/>
      <RankProgress/>
      <ReferralsInfo/>
    </Layout>
  )
}

export default CapxDashboard;