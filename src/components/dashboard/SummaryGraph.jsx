import { LineChart } from '@mui/x-charts/LineChart';
import { Box } from '@mui/material';

const SummaryGraph = ({ monthlyData }) => {
  const defaultMonths = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const capxData = Array(12).fill(0);

  if (monthlyData && monthlyData.length > 0) {
    monthlyData.forEach((m) => {
      const idx = defaultMonths.indexOf(m.month);
      if (idx !== -1) capxData[idx] = m.token;
    });
  }

  // Generate cumulative data for smooth area effect
  const cumulativeData = [];
  let cumulative = 0;
  capxData.forEach((value) => {
    cumulative += value;
    cumulativeData.push(cumulative);
  });

  return (
    <div className="w-full mx-auto bg-white dark:bg-zinc-900 dark:text-white p-4 rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="md:text-2xl text-lg text-start font-semibold">
          Summary Graph
        </h2>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#B500EF' }}></div>
          <span className="text-sm font-medium">CAPX</span>
        </div>
      </div>
      
      <Box sx={{ width: '100%', height: 400 }}>
        <LineChart
          xAxis={[{
            data: defaultMonths,
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
            tickNumber: 6
          }]}
          series={[
            {
              data: cumulativeData,
              area: true,
              color: '#B500EF',
              curve: 'monotoneX',
              showMark: false,
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
    </div>
  );
};

export default SummaryGraph;
