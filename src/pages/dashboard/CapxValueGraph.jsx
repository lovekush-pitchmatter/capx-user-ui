import React from "react";
import { LineChart } from '@mui/x-charts/LineChart';
import { Box } from '@mui/material';

const CapxValueGraph = () => {
  const stages = ["Stage 1", "Stage 2", "Stage 3", "Stage 4", "Stage 5", "Listing"];
  const capxPrices = [1.00, 1.25, 2.00, 3.00, 4.50, 5.00]; // Example prices for each stage

  return (
    <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">CAPX Value</h3>

      <div className="border border-purple-300 rounded-lg p-4 bg-purple-50 space-y-2">
        <div className="flex justify-between items-center text-sm font-medium text-gray-700">
          <span>Stage 1</span>
          <span>$1.00 | $2.50 per CAPX</span>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>Sold: 500,000 / 2,000,000 CAPX</span>
          <span>Raised: $750,000 USDT</span>
        </div>
      </div>

      <Box sx={{ width: '100%', height: 250 }}>
        <LineChart
          xAxis={[{
            data: stages,
            scaleType: 'point',
            tickLabelStyle: {
              fontSize: 12,
              fill: '#6B7280'
            }
          }]}
          yAxis={[{
            tickLabelStyle: {
              fontSize: 12,
              fill: '#6B7280'
            },
            min: 0,
            tickNumber: 5
          }]}
          series={[
            {
              data: capxPrices,
              area: true,
              color: '#B500EF',
              curve: 'monotoneX',
              showMark: true,
              valueFormatter: (value) => `$${value.toFixed(2)}`,
            },
          ]}
          margin={{ left: 40, right: 20, top: 20, bottom: 40 }}
          grid={{ horizontal: true, vertical: false }}
          sx={{
            '& .MuiLineElement-root': {
              stroke: '#B500EF',
              strokeWidth: 2,
            },
            '& .MuiAreaElement-root': {
              fill: 'url(#gradient)',
            },
            '& .MuiChartsAxis-line': {
              stroke: '#E5E7EB',
            },
            '& .MuiChartsAxis-tick': {
              stroke: '#E5E7EB',
            },
            '& .MuiChartsGrid-line': {
              stroke: '#F3F4F6',
              strokeDasharray: '3 3',
            },
          }}
        >
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#B500EF" stopOpacity={0.8} />
              <stop offset="50%" stopColor="#7C3AED" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#C084FC" stopOpacity={0.1} />
            </linearGradient>
          </defs>
        </LineChart>
      </Box>
      <div className="flex justify-center space-x-4 text-xs text-gray-600">
        <div className="flex items-center">
          <span className="w-3 h-3 bg-purple-300 rounded-full mr-1"></span>
          <span>Below $5K</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 bg-purple-600 rounded-full mr-1"></span>
          <span>Above $5K</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-0.5 bg-gray-400 mr-1"></span>
          <span>Listing Price ($5)</span>
        </div>
      </div>
    </div>
  );
};

export default CapxValueGraph;
