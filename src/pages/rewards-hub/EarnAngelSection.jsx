import { FaPoll, FaSyncAlt, FaGamepad, FaClipboardList, FaQuestionCircle  } from "react-icons/fa";
import chart from "../../assets/images/chart-r.png"
import airDropZone from "../../assets/images/airdrop-zone-r.png"
import games from "../../assets/images/games-r.png"
import survey from "../../assets/images/surver-r.png"
import quiz from "../../assets/images/quiz-r.png"
import spinWheel from "../../assets/images/spinwheel-r.png"

const EarnAngelSection = () => {
  const items = [
    {
      icon: <img src={chart} alt="Poll Party" className="w-12" />,
      title: "Poll Party",
      subtitle: "Pick a side. Earn ANGEL. Repeat.",
    },
    {
      icon: <img src={spinWheel} alt="Spin & Win" className="w-12" />,
      title: "Spin & Win",
      subtitle: "One tap. Big luck. Free tokens.",
    },
    {
      icon: <img src={quiz} alt="Quiz Quest" className="w-12" />,
      title: "Quiz Quest",
      subtitle: "Fast facts. Right picks. Sweet wins.",
    },
    {
      icon: <img src={survey} alt="Survey Time" className="w-12" />,
      title: "Survey Time",
      subtitle: "Speak up. Score tokens. Simple.",
    },
    {
      icon: <img src={games} alt="Game On" className="w-12" />,
      title: "Game On",
      subtitle: "Beat tasks. Grab ANGEL. Smile.",
    },
    {
      icon: <img src={airDropZone} alt="Airdrop Zone" className="w-12" />,
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
            {item.icon}
            <h3 className="font-semibold text-xl text-purple-800">{item.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{item.subtitle}</p>
          </div>
        ))}
      </div>
    </div>  
  )
}

export default EarnAngelSection