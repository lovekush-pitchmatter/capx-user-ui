import React from "react";
import { FaPoll, FaDice, FaGamepad, FaClipboardList, FaQuestionCircle } from "react-icons/fa"; // Using Font Awesome for icons

const actions = [
  { name: "Polls", icon: FaPoll, color: "text-blue-500" },
  { name: "Spins", icon: FaDice, color: "text-green-500" },
  { name: "Games", icon: FaGamepad, color: "text-red-500" },
  { name: "Surveys", icon: FaClipboardList, color: "text-yellow-500" },
  { name: "Quizzes", icon: FaQuestionCircle, color: "text-purple-500" },
];

const EarnAngelCoinsActions = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md h-full flex flex-col justify-between">
      <div className="flex justify-around items-center mb-4 flex-wrap gap-4">
        {actions.map((action) => (
          <div key={action.name} className="flex flex-col items-center text-center group cursor-pointer">
            <div className={`p-3 rounded-full bg-gray-100 group-hover:bg-purple-100 transition-colors`}>
              <action.icon className={`${action.color} text-2xl`} />
            </div>
            <span className="text-xs font-medium text-gray-700 mt-2">{action.name}</span>
          </div>
        ))}
      </div>
      <p className="text-center text-sm text-gray-600 font-medium">
        Earn ANGEL Coins - Polls, tasks & surveys that pave your way to becoming an Angel Angel Investor
      </p>
    </div>
  );
};

export default EarnAngelCoinsActions;
