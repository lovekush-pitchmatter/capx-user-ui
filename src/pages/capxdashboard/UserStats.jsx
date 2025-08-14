import { LuLogOut } from "react-icons/lu";
import userDefault from "../../assets/images/user_default.png"
import { FaPoll, FaSyncAlt, FaGamepad, FaClipboardList, FaQuestionCircle } from "react-icons/fa";

const UserStats = () => {
  return (
    <div className="mb-6 flex justify-between">
      {/* User Info */}
      <div className="flex items-center mb-4">
        <img
          src={userDefault}
          alt="User"
          className="rounded-full mr-4 w-10"
        />
        <div>
          <h2 className="font-semibold">aaravmehra</h2>
          <p className="text-sm text-gray-500">User ID 164647708</p>
        </div>
      </div>

      {/* SECTION: Polls, Spins, Games, Surveys, Quizzes */}
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          {[
            { icon: <FaPoll className="text-purple-500 text-2xl" />, label: "Polls" },
            { icon: <FaSyncAlt className="text-pink-500 text-2xl" />, label: "Spins" },
            { icon: <FaGamepad className="text-blue-500 text-2xl" />, label: "Games" },
            { icon: <FaClipboardList className="text-green-500 text-2xl" />, label: "Surveys" },
            { icon: <FaQuestionCircle className="text-yellow-500 text-2xl" />, label: "Quizzes" },
            { icon: <LuLogOut className="text-purple-700"/> }
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center mx-2 my-2">
              {item.icon}
              <p className="text-sm font-medium mt-1">{item.label}</p>
            </div>
          ))}
        </div>
        {/* DESCRIPTION TEXT */}
        <p className="text-sm mt-2 text-gray-600">
          <span className="text-purple-800 font-semibold">Earn ANGEL Coins</span> - Polls, tasks & surveys that pave your way to becoming an angel Angel Investor
        </p>
      </div>

    </div>    
  )
}

export default UserStats