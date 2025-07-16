
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import Tracking from "../../assets/tracking.png";
import { useDispatch } from "react-redux";
import { BsBell, BsSearch } from "react-icons/bs";
import { logout } from "../../store/slices/authSlice";
import { FiLogOut } from "react-icons/fi";
import { useState } from "react";
import Theme from "../Theme/Theme";

const Header = () => { 
  const [showSearch, setShowSearch] = useState(false);

  const toggleSearch = () => setShowSearch((prev) => !prev);
  const dispatch = useDispatch();

const handleLogout = () => {
  dispatch(logout());
};

  return (
    <div className="max-lg:flex-col  flex justify-center items-center w-full mx-auto">
      
        <h1 className="lg:hidden dark:text-white text-3xl font-semibold whitespace-nowrap">CAPShield</h1>
     

      <div className="flex items-center justify-between w-full">
  {/* Left: Search */}
  <div className="relative max-w-md w-full">
    <button
      onClick={toggleSearch}
      className="absolute left-3 top-1/2 -translate-y-1/2 z-10 text-gray-500"
    >
      <BsSearch size={16} />
    </button>

    <input
      type="text"
      placeholder="Search"
      autoFocus={showSearch}
      className="w-full pl-10 pr-4 py-1.5 bg-gray-100 rounded-xl focus:outline-none transition-all duration-300 ease-in-out"
    />
  </div>

  {/* Right: Icons */}
  <div className="flex items-center sm:gap-4 gap-2 ml-4">
    <Theme />

    {/* <button className="p-2 bg-white rounded-xl border-2 dark:bg-gray-800 dark:text-white border-[#7A44FF]">
      <BsBell className="md:h-6 md:w-6 h-4 w-4" />
    </button> */}

    {/* <button className="p-2 bg-white rounded-xl border-2 dark:bg-gray-800 dark:text-white border-[#7A44FF]">
      <CgShoppingBag className="md:h-6 md:w-6 h-4 w-4" />
    </button> */}

    <button onClick={handleLogout} className="p-2 bg-white rounded-xl border-2 dark:bg-gray-800 dark:text-white border-[#7A44FF]">
      <FiLogOut className="md:h-6 md:w-6 h-4 w-4" />
    </button>
  </div>
</div>

    </div>
  );
};

export default Header;
