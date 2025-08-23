
const PollResults = () => {
  const results = [
    { label: "AI", percent: 42 },
    { label: "Web3", percent: 33 },
    { label: "Clean Energy", percent: 18 },
    { label: "Robotics", percent: 7 },
  ];

  return (
    <div className="border rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-2">Live Results</h3>
      <div className="w-full h-[1px] bg-gray-200 mb-4"></div>
      <div className="grid grid-cols-2 gap-x-8 gap-y-4">
        {results.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between text-md font-medium mb-1">
              <span>{item.label}</span>
              <span>{item.percent}%</span>
            </div>
            <div className="w-full bg-purple-100 h-4 rounded-md overflow-hidden">
              <div
                className="h-4 bg-purple-700"
                style={{ width: `${item.percent}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PollResults