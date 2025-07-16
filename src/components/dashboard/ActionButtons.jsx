import { PiPiggyBankLight, PiHandArrowDown, PiPiggyBank } from "react-icons/pi";
import { RiArrowUpDownLine } from "react-icons/ri";
import { LuShoppingCart } from "react-icons/lu";
import { Link } from "react-router-dom";

const ActionButtons = () => {
  const actions = [
    { label: "Deposit", color: "bg-pink-100", icon: PiPiggyBank, link: "/deposit-funds" },
    // { label: "Transfer", color: "bg-green-100", icon: RiArrowUpDownLine, link: "/transfer" },
    // { label: "Withdraw", color: "bg-yellow-100", icon: PiHandArrowDown, link: "/withdraw" },
    { label: "Buy CAPX", color: "bg-indigo-100", icon: LuShoppingCart, link: "/buy-capx" },
  ];

  return (
    <div className="w-full border-[2px] border-violet-500 bg-gray-50 dark:bg-zinc-800 p-4 rounded-xl flex items-center justify-center flex-wrap md:grid md:grid-cols-2 gap-4">
      {actions.map(({ label, color, icon: Icon, link }) => (
        <Link
          to={link}
          key={label}
          className="flex flex-col gap-1 items-center cursor-pointer transition-transform hover:scale-105"
          aria-label={label}
        >
          <div className={`p-4 rounded-xl shadow-md text-center ${color}`}>
            <Icon size={40} />
          </div>
          <span className="text-sm dark:text-white font-medium">{label}</span>
        </Link>
      ))}
    </div>
  );
};

export default ActionButtons;
