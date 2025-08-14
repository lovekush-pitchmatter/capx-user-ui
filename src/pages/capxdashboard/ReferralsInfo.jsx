import { Wallet, DollarSign, Users } from "lucide-react";
import { FaPerson } from "react-icons/fa6";

const ReferralsInfo = () => {
  const stats = [
    { label: "ANGEL Balance", value: "14300.56789", bg: "bg-red-100", bgIcon: "bg-red-500", icon: <Wallet />},
    { label: "Current Angel Worth", value: "$1.44", bg: "bg-green-100", bgIcon: "bg-green-500", icon: <DollarSign /> },
    { label: "No. of Referrals", value: "182", bg: "bg-purple-100", bgIcon: "bg-purple-500", icon: <Users /> },
    { label: "Active Investors", value: "50", bg: "bg-yellow-100", bgIcon: "bg-yellow-500", icon: <FaPerson /> },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className={`p-4 rounded-lg shadow flex justify-between ${stat.bg}`}>
          <div>
            <h3 className="text-2xl font-bold">{stat.value}</h3>
            <p className="text-sm uppercase">{stat.label}</p>
          </div>
          <div className={`text-white ${stat.bgIcon} w-fit h-fit p-1 rounded-lg ${stat.label === "Active Investors" ? "text-2xl" : ""}`}>
            {stat.icon}
          </div>
        </div>
      ))}
    </div>  
  )
}

export default ReferralsInfo