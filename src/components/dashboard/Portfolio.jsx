import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import noRecords from "../../assets/no-records.jpg";

const Portfolio = ({ user }) => {

  const capx = user?.user_vested_tokens ?? 0;
  const angelSeedToken = user?.userWallet?.cryptoAmount?.find(
    (token) => token.coin_type === "AngelSEED"
  );
  const angelSeed = angelSeedToken?.amount ?? 0;
  const usdt = user?.userWallet?.usdAmount ?? 0;
  const data = [
    { name: "USDT", value: usdt, color: "#00C49F" },
    { name: "CAPX", value: capx, color: "#0088FE" },
    { name: "AngelSEED", value: angelSeed, color: "#FFBB28" },
    { name: "Other", value: 0, color: "#FF6384" },
  ]; 

  const hasPortfolioData = data.some(item => item.value > 0);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 w-full h-full">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Portfolio</h3>

      {!hasPortfolioData ? (
        <div className="flex flex-col items-center justify-center py-12">
          <img src={noRecords} alt="No records" className="w-32 h-32 mb-4 object-contain" />
          <p className="text-lg font-semibold text-gray-500">No records found</p>
        </div>
      ) : (
        <>
          <div className="w-full h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
            </div>
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-6 mt-4 text-sm">
            {data.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></span>
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Portfolio;