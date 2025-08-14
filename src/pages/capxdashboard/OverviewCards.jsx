import { LuCoins, LuFile, LuTrendingUp, LuUsers } from "react-icons/lu";

const OverviewCards = () => {
  const cards = [
    { label: "Invested", value: "$10000.00", icon: <LuCoins/>},
    { label: "CAPX Owned", value: "10000.00", icon: <LuFile/>},
    { label: "Current CAPX Worth", value: "$25000.00", icon: <LuTrendingUp/> },
    { label: "Referral Earnings", value: "$1200.00", icon: <LuUsers/> },
  ];
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card) => (
        <div key={card.label} className={`p-4 rounded-lg flex items-center gap-3`} style={{ boxShadow: "0 0 3px rgba(0, 0, 0, 0.15)" }}>
          <div className="bg-gray-200 w-fit p-2 rounded-full text-2xl text-blue-800">
            {card.icon}
          </div>
          <div>
            <p className="text-sm text-gray-500">{card.label}</p>
            <h3 className="text-lg font-bold">{card.value}</h3>
          </div>
        </div>
      ))}
    </div>  
  )
}

export default OverviewCards