const PollResults = ({ answers }) => {
  if (!answers || !Array.isArray(answers) || answers.length === 0) {
    return (
      <div className="border rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-2">Live Results</h3>
        <div className="w-full h-[1px] bg-gray-200 mb-4"></div>
        <p className="text-gray-500 text-sm">No poll results available.</p>
      </div>
    );
  }

  // Calculate total votes from array format
  const totalVotes = answers.reduce((sum, item) => sum + (item.total_answer_by_user || 0), 0);

  return (
    <div className="border rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-2">Live Results</h3>
      <div className="w-full h-[1px] bg-gray-200 mb-4"></div>
      <div className="grid grid-cols-2 gap-x-8 gap-y-4">
        {answers.map((item, index) => {
          const label = item.answer;
          const count = item.total_answer_by_user || 0;
          const percent = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;
          return (
            <div key={index}>
              <div className="flex justify-between text-md font-medium mb-1">
                <span>{label}</span>
                <span>{percent}%</span>
              </div>
              <div className="w-full bg-purple-100 h-4 rounded-md overflow-hidden">
                <div
                  className="h-4 bg-purple-700"
                  style={{ width: `${percent}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PollResults;