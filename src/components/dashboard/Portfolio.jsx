import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "USDT", value: 30, color: "#00C49F" },
  { name: "CAPX", value: 27, color: "#0088FE" },
  { name: "AngelSEED", value: 23, color: "#FFBB28" },
  { name: "Other", value: 20, color: "#FF6384" },
];

const Portfolio = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 w-full h-full">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Portfolio</h3>

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
    </div>
  );
};

export default Portfolio;