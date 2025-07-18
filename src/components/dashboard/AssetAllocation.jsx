import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function getAssetData(dashboard, user) {
  const capx = user?.user_vested_tokens ?? 0;
  const usd = dashboard?.totalAssets ?? 0;
  const wallet_amount = user?.wallet_amount ?? 0;
  return {
    data: [capx, wallet_amount, usd],
    labels: ["CAPX", "Wallet Amount", "USD"],
    colors: ["#A58CFF", "#FFD94D", "#0dbab8"],
  };
}

const options = {
  plugins: {
    legend: {
      display: false,
    },
  },
  maintainAspectRatio: true,
  responsive: true,
};

export default function AssetAllocation({ dashboard, user }) {
  const { data, labels, colors } = getAssetData(dashboard, user);
  const allZero = data.every((v) => v === 0);

  let chartData = null;
  let tokenData = [];

  if (!allZero) {
    const total = data.reduce((sum, v) => sum + v, 0) || 1;
    chartData = {
      labels,
      datasets: [
        {
          data,
          backgroundColor: colors,
          borderWidth: 0,
          cutout: "75%",
          borderRadius: 10,
          spacing: 4,
        },
      ],
    };

    tokenData = labels.map((label, i) => ({
      label,
      color: colors[i],
      percentage: `${((data[i] / total) * 100).toFixed(0)}%`,
    }));
  }

  return (
    <div className="bg-white  dark:bg-zinc-900 p-4 rounded-xl shadow-lg w-full">
      <h3 className="text-center dark:text-white font-semibold text-lg mb-4">
        Asset Allocation
      </h3>

      {allZero ? (
        <div className="h-36 flex items-center justify-center text-gray-400 dark:text-gray-300">
          No data available
        </div>
      ) : (
        <>
          <div className="h-36 flex justify-center items-center">
            <Doughnut data={chartData} options={options} />
          </div>
          <div className="mt-4 flex items-center justify-center gap-4 flex-wrap text-sm dark:text-white">
            {tokenData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
