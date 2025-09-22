import { useLocation, useNavigate } from "react-router-dom";
import Dashboard from "../../assets/icons/category.png";
import Token from "../../assets/icons/coin.png";
import Wallet from "../../assets/icons/wallet.png";
import Reports from "../../assets/icons/note.png";
import Support from "../../assets/icons/call.png";
import Setting from "../../assets/icons/settings.png";
import Staking from "../../assets/icons/coin.png";
import Referrals from "../../assets/icons/referral.png";
import LeaderBoard from "../../assets/icons/ranking.png";
import LaunchPad from "../../assets/icons/launchpad.png";
import Annoucments from "../../assets/icons/notification.png";
import Verifications from "../../assets/icons/verify.png";
import ArrowMain from "../../assets/icons/arrow.png";
import { MdChevronRight } from "react-icons/md";
import { useEffect, useState } from "react";
import lightLogo from "../../assets/images/capshield_logo_light.png";
import Menu from "../../assets/Menu";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState({});

  // ✅ Tidio open helper
  const openTidioChat = () => {
    if (window.tidioChatApi) {
      window.tidioChatApi.open();
    } else {
      document.addEventListener("tidioChat-ready", () => {
        window.tidioChatApi.open();
      });
    }
  };

  const navItems = [
    { label: "Dashboard", icon: Dashboard, path: "/dashboard" },
    {
      label: "Wallet",
      icon: Wallet,
      path: "/wallet",
      children: [
        { label: "Balance", icon: ArrowMain, path: "/balance" },
        { label: "Deposit", icon: ArrowMain, path: "/deposit-funds" },
        { label: "Withdraw", icon: ArrowMain, path: "/withdraw" },
        // { label: "Transfer", icon: ArrowMain, path: "/transfer" },
      ],
    },
    { label: "Staking", icon: Staking, path: "/staking" },
    { label: "Buy Crypto", icon: Token, path: "/buy-crypto" },
    {
      label: "Reports",
      icon: Reports,
      path: "/reports",
      children: [
        // { label: "Transaction Report", icon: ArrowMain, path: "/transaction-report" },
        { label: "Transfer Report", icon: ArrowMain, path: "/transfer-report" },
        { label: "Withdrawal Report", icon: ArrowMain, path: "/withdrawal-report" },
        { label: "Conversion Report", icon: ArrowMain, path: "/conversion-report" },
        { label: "Deposit History", icon: ArrowMain, path: "/deposit-history" },
        { label: "Token Purchase", icon: ArrowMain, path: "/token-purchase-history" },
      ],
    },
    {
      label: "Referral",
      icon: Referrals,
      path: "/reports",
      children: [
        { label: "Dashboard", icon: ArrowMain, path: "/referral/dashboard" },
        { label: "Referral Report", icon: ArrowMain, path: "/referral-report" },
      ],
    },
    { label: "Rewards", icon: LeaderBoard, path: "/angelseed/reward" },

    // 🚧 Coming Soon items
    { label: "Launchpad", icon: LaunchPad, comingSoon: true },
    { label: "Annoucements", icon: Annoucments, comingSoon: true },
    { label: "Verification", icon: Verifications, comingSoon: true },

    { label: "Settings", icon: Setting, path: "/settings" },

    // ✅ Support item (opens Tidio)
    { label: "Support", icon: Support },
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
        const hasActiveChild = item.children.some(
          (child) => location.pathname === child.path
        );
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
        className={`max-lg:h-screen fixed top-0 left-0 z-[10000] bg-black text-white transition-all duration-300 ${
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
          <button
            className="lg:hidden w-6 h-6"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu color="white" />
          </button>
        </div>

        <nav>
          <ul className="space-y-2 pl-4">
            {navItems.map(({ label, icon: Icon, path, children, comingSoon }) => {
              const hasActiveChild = children
                ? children.some((child) => location.pathname === child.path)
                : false;
              const isActive = location.pathname === path || hasActiveChild;
              const isSubmenuOpen = openSubmenus[label];

              const handleClick = () => {
                if (comingSoon) return; // 🚫 disable click
                if (label === "Support") {
                  openTidioChat();
                  setIsOpen(false);
                  return;
                }
                if (children) {
                  toggleSubmenu(label);
                } else if (path) {
                  navigate(path);
                  setIsOpen(false);
                }
              };

              return (
                <div key={label}>
                  <li
                    onClick={handleClick}
                    className={`flex items-center justify-between pr-3 space-x-4 p-3 rounded-l-xl transition-colors duration-200 ${
                      comingSoon
                        ? "text-gray-400 cursor-not-allowed hover:cursor-not-allowed"
                        : "cursor-pointer"
                    } ${
                      isActive && !comingSoon
                        ? "bg-gradient-to-r from-[#B500EF] to-[#37009A] text-white"
                        : !comingSoon
                        ? "hover:bg-violet-500"
                        : ""
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      {typeof Icon === "string" ? (
                        <img src={Icon} alt={label} className="w-6 h-6" />
                      ) : (
                        <Icon color="white" />
                      )}
                      {!isCollapsed && (
                        <span className="font-semibold whitespace-nowrap sm:inline-block">
                          {label}
                        </span>
                      )}
                    </div>

                    {/* ✅ Coming Soon badge */}

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
                      {children.map(({ label: subLabel, icon, path: subPath }) => {
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
                            <img
                              src={icon}
                              alt={subLabel}
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