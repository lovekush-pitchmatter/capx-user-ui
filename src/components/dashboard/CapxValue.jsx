import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Dot,
} from "recharts";

const CapxValue = ({
  currentPresaleStage,
  minPresaleAmount,
  maxPresaleAmount,
  totalCapxTokenMarket,
  totalRaised,
  totalCapxTokenSold,
}) => {
  // Format number to always show 2 decimal places
  const formatNumber = (num) => {
    return typeof num === "number" ? num.toFixed(2) : num;
  };

  // Chart data
  const chartData = [
    { stage: "Stage 1", below5k: 2.5, above5k: 1.0, listing: null },
    { stage: "Stage 2", below5k: 3.0, above5k: 1.2, listing: null },
    { stage: "Stage 3", below5k: 3.5, above5k: 1.5, listing: null },
    { stage: "Stage 4", below5k: 4.0, above5k: 2.0, listing: null },
    { stage: "Stage 5", below5k: 4.5, above5k: 2.5, listing: null },
    { stage: "Listing", below5k: 5.0, above5k: 5.0, listing: 5.0 },
  ];

  // Custom dot
  const CustomDot = ({ cx, cy, payload, dataKey }) => {
    if (payload[dataKey] === null) return null;

    // Large outlined dot at Listing
    if (payload.stage === "Listing") {
      return (
        <g>
          <circle
            cx={cx}
            cy={cy}
            r={12}
            fill="#fff"
            stroke="#8b5cf6"
            strokeWidth={3}
          />
          <circle
            cx={cx}
            cy={cy}
            r={6}
            fill={dataKey === "above5k" ? "#6366f1" : "#8b5cf6"}
            stroke="#fff"
            strokeWidth={2}
          />
        </g>
      );
    }

    // Normal filled dots
    return (
      <circle
        cx={cx}
        cy={cy}
        r={5}
        fill={dataKey === "above5k" ? "#6366f1" : "#8b5cf6"}
        stroke="#fff"
        strokeWidth={2}
      />
    );
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 w-full max-w-5xl">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">CAPX Value</h3>

      {/* Stage Info + Progress */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
          <span className="font-medium">Stage {currentPresaleStage}</span>
          <span className="font-medium">
            &gt;$5k: ${formatNumber(minPresaleAmount)} | &lt;$5k: $
            {formatNumber(maxPresaleAmount)} per CAPX
          </span>
        </div>

        <div className="w-full h-4 bg-white border border-black rounded-full overflow-hidden mb-3">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"
            style={{ width: "25%" }}
          ></div>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full" style={{ height: 450 }}>
        <ResponsiveContainer width="100%" height={450}>
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 30, bottom: 30 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
  dataKey="stage"
  axisLine={false}
  tickLine={false}
  interval={0}
  tick={({ x, y, payload }) => (
    <text
      x={x}
      y={y + 10}
      textAnchor="middle"
      fontSize={window.innerWidth < 640 ? 10 : 14}  // smaller on mobile
      fill="#6b7280"
      fontWeight={500}
    >
      {payload.value}
    </text>
  )}
/>

            <YAxis
              domain={[1, 5]}
              ticks={[1, 2, 3, 4, 5]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 16, fill: "#6b7280", fontWeight: 500 }}
              tickFormatter={(value) => `${value.toFixed(1)}`}
            />

            {/* Below $5k */}
            <Line
              type="linear"
              dataKey="below5k"
              stroke="#8b5cf6"
              strokeWidth={3}
              dot={<CustomDot dataKey="below5k" />}
              connectNulls={true}
              name="Below $5K"
            />

            {/* Above $5k */}
            <Line
              type="linear"
              dataKey="above5k"
              stroke="#6366f1"
              strokeWidth={3}
              dot={<CustomDot dataKey="above5k" />}
              connectNulls={true}
              name="Above $5K"
            />

            {/* Listing price dashed line */}
            <Line
              type="linear"
              dataKey="listing"
              stroke="#8b5cf6"
              strokeWidth={3}
              strokeDasharray="8 8"
              dot={<CustomDot dataKey="listing" />}
              connectNulls={true}
              name="Listing Price ($5)"
            />

            {/* Horizontal dashed line at y=5 */}
            <Line
              type="linear"
              data={[
                { stage: "Stage 1", hline: 5 },
                { stage: "Stage 2", hline: 5 },
                { stage: "Stage 3", hline: 5 },
                { stage: "Stage 4", hline: 5 },
                { stage: "Stage 5", hline: 5 },
                { stage: "Listing", hline: 5 },
              ]}
              dataKey="hline"
              stroke="#8b5cf6"
              strokeWidth={2}
              strokeDasharray="6 6"
              dot={false}
              legendType="none"
              connectNulls={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Custom Legend */}
      <div className="flex justify-center gap-6 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-6 h-0.5 bg-purple-500"></div>
          <span className="text-gray-600">Below $5K</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-0.5 bg-indigo-500"></div>
          <span className="text-gray-600">Above $5K</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-0.5"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, #8b5cf6 0, #8b5cf6 4px, transparent 4px, transparent 8px)",
            }}
          ></div>
          <span className="text-gray-600">Listing Price ($5.00)</span>
        </div>
      </div>
    </div>
  );
};

export default CapxValue;