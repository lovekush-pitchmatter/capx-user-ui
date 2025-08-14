import { FaPoll, FaSyncAlt, FaGamepad, FaClipboardList, FaQuestionCircle  } from "react-icons/fa";
import balloon from "../../assets/balloon.png"

const EarnAngelSection = () => {
  const items = [
    {
      icon: <FaPoll className="text-purple-600 text-5xl mb-3" />,
      title: "Poll Party",
      subtitle: "Pick a side. Earn ANGEL. Repeat.",
    },
    {
      icon: <FaSyncAlt className="text-pink-600 text-5xl mb-3" />,
      title: "Spin & Win",
      subtitle: "One tap. Big luck. Free tokens.",
    },
    {
      icon: <FaGamepad className="text-blue-600 text-5xl mb-3" />,
      title: "Quiz Quest",
      subtitle: "Fast facts. Right picks. Sweet wins.",
    },
    {
      icon: <FaClipboardList className="text-green-600 text-5xl mb-3" />,
      title: "Survey Time",
      subtitle: "Speak up. Score tokens. Simple.",
    },
    {
      icon: <FaQuestionCircle className="text-yellow-600 text-5xl mb-3" />,
      title: "Game On",
      subtitle: "Beat tasks. Grab ANGEL. Smile.",
    },
    {
      title: "Airdrop Zone",
      subtitle: "Do tasks. Claim tokens. Fly high.",
    },
  ];

  return (
    <div className="px-6">
      <h2 className="text-center text-2xl font-bold mb-2">
        Earn ANGEL. Rise Like a Star.
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Play, vote, spin, and climb your way to Angelhood.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="border-2 border-purple-400 rounded-lg p-6 flex flex-col items-center text-center hover:shadow-lg transition"
          >
            {item.title === "Airdrop Zone" ? (
              <img className="w-12" src={balloon} alt="" />
            ) : item.icon}
            <h3 className="font-semibold text-xl text-purple-800">{item.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{item.subtitle}</p>
          </div>
        ))}
      </div>
    </div>  
  )
}

export default EarnAngelSection