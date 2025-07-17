import { PiPiggyBankLight, PiHandArrowDown, PiPiggyBank } from "react-icons/pi";
import { RiArrowUpDownLine } from "react-icons/ri";
import { LuShoppingCart } from "react-icons/lu";
import { Link } from "react-router-dom";

const ActionButtons = () => {
  const actions = [
    { label: "Deposit",  icon: PiPiggyBank, link: "/deposit-funds" },
    { label: "Transfer",  icon: RiArrowUpDownLine, link: "/transfer" },
    { label: "Withdraw",  icon: PiHandArrowDown, link: "/withdraw" },
    { label: "Buy CAPX",  icon: LuShoppingCart, link: "/buy-capx" },
  ];

  return (
    <div className="flex items-center justify-center flex-wrap  gap-4">
      {actions.map(({ label,  icon: Icon, link }) => (
        <Link
          to={link}
          key={label}
          className="flex flex-col gap-1 items-center cursor-pointer transition-transform hover:scale-105"
          aria-label={label}
        >
          <div className={`p-2 rounded-full border-2 border-[#DA68FFBF] shadow-md text-center text-[#DA68FF]`}>
            <Icon size={20} />
          </div>
           </Link>
      ))}
    </div>
  );
};

export default ActionButtons;
