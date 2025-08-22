import { useState } from "react";
import sun from "../../assets/dashboard/sun.png";
import bell from "../../assets/dashboard/bell.png";
import mail from "../../assets/dashboard/mail.png";
import gift from "../../assets/dashboard/gift.png"; 
import search from "../../assets/dashboard/search.png";
import menu from "../../assets/dashboard/menu.png";

const Header = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <div className="flex items-center justify-between w-full px-4 h-14 bg-white border-b border-gray-200">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex w-10 h-10 items-center justify-center">
            <img src={menu} alt="Menu" className="w-10 h-10" />
          </div>
          <div className="flex items-center gap-1 text-base font-semibold">
            <span className="text-gray-400">Dashboard</span>
            <span className="text-gray-400">/</span>
            <span className="text-purple-600">Dashboard</span>
          </div>
        </div>

        {/* Center Section */}
        <div className="hidden md:flex flex-1 max-w-md mx-6 relative z-10">
          <div className="flex items-center bg-white border border-gray-300 rounded-xl px-3 py-2 shadow-sm">
            <div className="w-5 h-5 mr-2">
              <img src={search} alt="Search" className="w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="flex-1 bg-transparent text-gray-600 placeholder:text-gray-400 text-sm focus:outline-none"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <img src={sun} alt="Sun" className="w-6 h-6" />
          <img src={bell} alt="Bell" className="w-6 h-6" />
          <img src={mail} alt="Mail" className="w-6 h-6" />
          <img src={gift} alt="Gift" className="w-6 h-6" />
        </div>
      </div>

      {/* Search Bar for Mobile */}
      <div className="w-full mt-3 px-4 md:hidden relative z-10">
        <div className="flex items-center bg-white border border-gray-300 rounded-xl px-3 py-3 shadow-sm">
          <div className="w-5 h-5 mr-2">
            <img src={search} alt="Search" className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="flex-1 bg-transparent text-gray-600 placeholder:text-gray-400 text-sm focus:outline-none"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>
    </>
  );
};

export default Header;