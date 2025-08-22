import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Dot } from "recharts";

const CapxValue = () => {
  // Chart data based on the image
  const chartData = [
    { stage: "Stage 1", below5k: 2.5, above5k: 1.0, listing: null },
    { stage: "Stage 2", below5k: 3.0, above5k: 1.2, listing: null },
    { stage: "Stage 3", below5k: 3.5, above5k: 1.5, listing: null },
    { stage: "Stage 4", below5k: 4.0, above5k: 2.0, listing: null },
    { stage: "Stage 5", below5k: 4.5, above5k: 2.5, listing: null },
    { stage: "Listing", below5k: null, above5k: null, listing: 5.0 }
  ];

  const CustomDot = (props) => {
    const { cx, cy, payload, dataKey } = props;
    if (payload[dataKey] === null) return null;
    
    let fill = "#8b5cf6"; // purple
    if (dataKey === "above5k") fill = "#6366f1"; // indigo
    if (dataKey === "listing") fill = "#8b5cf6"; // purple
    
    return <Dot cx={cx} cy={cy} r={4} fill={fill} stroke="white" strokeWidth={2} />;
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 w-full max-w-4xl">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">CAPX Value</h3>
      
      {/* Stage Info + Progress */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
          <span className="font-medium">Stage 1</span>
          <span>&gt;$5k: $1.00 | &lt;$5k: $2.50 per CAPX</span>
        </div>
        
        <div className="w-full h-4 bg-white border border-gray-300 rounded-full overflow-hidden mb-3">
          <div className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full" style={{width: '25%'}}></div>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Sold: <span className="font-medium text-gray-800">500,000</span> / 2,000,000 CAPX</span>
          <span className="text-gray-600">Raised: <span className="font-medium text-green-600">$750,000 USDT</span></span>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="stage" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              angle={0}
              textAnchor="middle"
            />
            <YAxis 
              domain={[0.5, 5.5]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              tickFormatter={(value) => `${value.toFixed(1)}`}
            />
            
            {/* Below $5k line */}
            <Line
              type="monotone"
              dataKey="below5k"
              stroke="#8b5cf6"
              strokeWidth={3}
              dot={<CustomDot dataKey="below5k" />}
              connectNulls={false}
              name="Below $5K"
            />
            
            {/* Above $5k line */}
            <Line
              type="monotone"
              dataKey="above5k"
              stroke="#6366f1"
              strokeWidth={3}
              dot={<CustomDot dataKey="above5k" />}
              connectNulls={false}
              name="Above $5K"
            />
            
            {/* Listing price line */}
            <Line
              type="monotone"
              dataKey="listing"
              stroke="#8b5cf6"
              strokeWidth={3}
              strokeDasharray="8 8"
              dot={<CustomDot dataKey="listing" />}
              connectNulls={false}
              name="Listing Price ($5)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-0.5 bg-purple-500"></div>
          <span className="text-gray-600">Below $5K</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-0.5 bg-indigo-500"></div>
          <span className="text-gray-600">Above $5K</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-0.5 bg-purple-500" style={{backgroundImage: 'repeating-linear-gradient(90deg, #8b5cf6 0, #8b5cf6 4px, transparent 4px, transparent 8px)'}}></div>
          <span className="text-gray-600">Listing Price ($5)</span>
        </div>
      </div>
    </div>
  );
};

export default CapxValue;