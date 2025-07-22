import { useLocation, useNavigate } from "react-router-dom";
import Dashboard from "../../assets/Dashboard";
import Token from "../../assets/Token";
import Wallet from "../../assets/Wallet";
import Reports from "../../assets/Reports";
import Support from "../../assets/Support";
import Setting from "../../assets/Setting";
import Menu from "../../assets/Menu";
import { MdChevronRight } from "react-icons/md";
import { useEffect, useState } from "react";
import lightLogo from "../../assets/images/capshield_logo_light.png";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState({});

  const navItems = [
    { label: "Dashboard", icon: Dashboard, path: "/dashboard" },
    {
      label: "Wallet",
      icon: Wallet,
      path: "/wallet",
      children: [
        { label: "Balance", icon: MdChevronRight, path: "/balance" },
        { label: "Deposit", icon: MdChevronRight, path: "/deposit-funds" },
        // { label: "Transfer", icon: MdChevronRight, path: "/transfer" },
      ],
    },
    { label: "Buy Crypto", icon: Token, path: "/buy-crypto" },
    {
      label: "Reports",
      icon: Reports,
      path: "/reports",
      children: [
        { label: "Deposit History", icon: MdChevronRight, path: "/deposit-history" },
        { label: "Token Purchase", icon: MdChevronRight, path: "/token-purchase-history" },
        { label: "Referral Report", icon: MdChevronRight, path: "/referral-report" },
      ],
    },
    { label: "Settings", icon: Setting, path: "/settings" },
    { label: "Support", icon: Support, path: "/support" },
  ];

  const toggleSubmenu = (label) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  // Hide sidebar on small screens on initial load
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsOpen]);

  // Automatically open submenu on route match
  useEffect(() => {
    const newOpenSubmenus = {};
    navItems.forEach((item) => {
      if (item.children) {
        // Check if any child route matches current path
        const hasActiveChild = item.children.some(child => location.pathname === child.path);
        if (hasActiveChild) {
          newOpenSubmenus[item.label] = true;
        }
      }
    });
    setOpenSubmenus((prev) => ({ ...prev, ...newOpenSubmenus }));
  }, [location.pathname]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-30 lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside
        className={`max-lg:h-screen fixed top-0 left-0 z-40 bg-black text-white transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-56"
        } lg:translate-x-0 lg:relative lg:block ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:!translate-x-0`}
      >
        <div className="flex items-center justify-between px-6 py-8">
          {!isCollapsed && (
            <img
              src={lightLogo}
              alt="CapShield Logo"
              className="h-14 w-auto ml-[-2]"
            />
          )}
          <button className="lg:hidden w-6 h-6" onClick={() => setIsOpen(!isOpen)}>
            <Menu color="white" />
          </button>
          <button className="max-lg:hidden w-6 h-6" onClick={() => setIsCollapsed(!isCollapsed)}>
            <Menu color="white" />
          </button>
        </div>

        <nav>
          <ul className="space-y-2 pl-4">
            {navItems.map(({ label, icon: Icon, path, children }) => {
              // Check if current path matches this item or any of its children
              const hasActiveChild = children ? children.some(child => location.pathname === child.path) : false;
              const isActive = location.pathname === path || hasActiveChild;
              const isSubmenuOpen = openSubmenus[label];

              const handleClick = () => {
                if (children) {
                  toggleSubmenu(label);
                } else {
                  navigate(path);
                  setIsOpen(false);
                }
              };

              return (
                <div key={label}>
                  <li
                    onClick={handleClick}
                    className={`flex items-center justify-between pr-3 space-x-4 p-3 rounded-l-xl cursor-pointer transition-colors duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-[#B500EF] to-[#37009A] text-white"
                        : "hover:bg-violet-500"
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <Icon color="white" />
                      {!isCollapsed && (
                        <span className="font-semibold whitespace-nowrap sm:inline-block">
                          {label}
                        </span>
                      )}
                    </div>
                    {!isCollapsed && children && (
                      <MdChevronRight
                        size={20}
                        className={`transition-transform duration-200 ml-auto ${
                          isSubmenuOpen ? "rotate-90" : ""
                        }`}
                      />
                    )}
                  </li>

                  {/* Submenu */}
                  {children && isSubmenuOpen && !isCollapsed && (
                    <ul className="ml-3 mt-1 pl-3 border-l border-white/10 space-y-1">
                      {children.map(({ label: subLabel, icon: SubIcon, path: subPath }) => {
                        const isSubActive = location.pathname === subPath;
                        return (
                          <li
                            key={subLabel}
                            onClick={() => {
                              navigate(subPath);
                              setIsOpen(false);
                            }}
                            className={`flex items-center gap-2 font-medium p-2 px-3 rounded-md text-sm cursor-pointer transition-colors duration-200 ${
                              isSubActive
                                ? "bg-[#f3e8ff] text-[#7A44FF]"
                                : "hover:bg-white/10 text-white"
                            }`}
                          >
                            <SubIcon
                              color={isSubActive ? "#7A44FF" : "white"}
                              className="w-4 h-4"
                            />
                            <span>{subLabel}</span>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Sidebar Toggle for Small Screens */}
      {!isOpen && (
        <div className="fixed top-4 left-4 z-50 lg:hidden bg-white p-1 rounded-full shadow-md">
          <button
            className="cursor-pointer w-8 h-8 flex items-center justify-center"
            onClick={() => setIsOpen(true)}
          >
            <Menu color="black" />
          </button>
        </div>
      )}
    </>
  );
};

export default Sidebar;