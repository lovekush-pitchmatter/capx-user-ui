import { useState, useEffect, useRef } from "react";
import ReactCountryFlag from "react-country-flag";
import sun from "../../assets/dashboard/sun.png";
import bell from "../../assets/dashboard/bell.png";
import mail from "../../assets/dashboard/mail.png";
import gift from "../../assets/dashboard/gift.png";
import search from "../../assets/dashboard/search.png";
import menu from "../../assets/dashboard/menu.png";
import "./index.css";
import { Link } from "react-router-dom";
import Theme from "../theme/Theme";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import LogoutIcon from "../../assets/dashboard/logout.png";
import Setting from "../../assets/Setting"

const Header = ({ menu_one, menu_two}) => {
  const customLanguages = [
    { code: "en", label: "English", country: "GB" },
    { code: "fr", label: "Français", country: "FR" },
    { code: "hi", label: "हिन्दी", country: "IN" },
    { code: "es", label: "Español", country: "ES" },
    { code: "de", label: "Deutsch", country: "DE" },
    { code: "zh-CN", label: "中文", country: "CN" },
    { code: "ar", label: "العربية", country: "SA" },
    { code: "ja", label: "日本語", country: "JP" },
    { code: "pt", label: "Português", country: "PT" },
    { code: "it", label: "Italiano", country: "IT" },
    { code: "ko", label: "한국어", country: "KR" },
    { code: "bn", label: "বাংলা", country: "BD" },
    { code: "pa", label: "ਪੰਜਾਬੀ", country: "IN" },
    { code: "mr", label: "मराठी", country: "IN" },
    { code: "te", label: "తెలుగు", country: "IN" },
    { code: "ta", label: "தமிழ்", country: "IN" },
    { code: "gu", label: "ગુજરાતી", country: "IN" },
    { code: "kn", label: "ಕನ್ನಡ", country: "IN" },
    { code: "ml", label: "മലയാളം", country: "IN" },
    { code: "or", label: "ଓଡ଼ିଆ", country: "IN" },
    { code: "si", label: "සිංහල", country: "LK" },
    { code: "ne", label: "नेपाली", country: "NP" },
    { code: "fa", label: "فارسی", country: "IR" },
    { code: "ur", label: "اردو", country: "PK" },
    { code: "ru", label: "Русский", country: "RU" },
    { code: "uk", label: "Українська", country: "UA" },
    { code: "sv", label: "Svenska", country: "SE" },
    { code: "no", label: "Norsk", country: "NO" },
    { code: "da", label: "Dansk", country: "DK" },
    { code: "fi", label: "Suomi", country: "FI" },
    { code: "hu", label: "Magyar", country: "HU" },
    { code: "pl", label: "Polski", country: "PL" },
    { code: "cs", label: "Čeština", country: "CZ" },
    { code: "sk", label: "Slovenčina", country: "SK" },
    { code: "sl", label: "Slovenščina", country: "SI" },
    { code: "hr", label: "Hrvatski", country: "HR" },
    { code: "sr", label: "Српски", country: "RS" },
    { code: "bg", label: "Български", country: "BG" },
    { code: "lt", label: "Lietuvių", country: "LT" },
    { code: "lv", label: "Latviešu", country: "LV" },
    { code: "et", label: "Eesti", country: "EE" },
    { code: "ms", label: "Bahasa Melayu", country: "MY" },
    { code: "id", label: "Bahasa Indonesia", country: "ID" },
    { code: "th", label: "ไทย", country: "TH" },
    { code: "vi", label: "Tiếng Việt", country: "VN" },
    { code: "tr", label: "Türkçe", country: "TR" },
    { code: "el", label: "Ελληνικά", country: "GR" },
    { code: "he", label: "עברית", country: "IL" },
    { code: "hy", label: "Հայերեն", country: "AM" },
    { code: "az", label: "Azərbaycan", country: "AZ" },
    { code: "af", label: "Afrikaans", country: "ZA" },
    { code: "sq", label: "Shqip", country: "AL" },
    { code: "sw", label: "Kiswahili", country: "KE" },
  ];

  // Notifications
  const notificationsList = [
    { id: 1, avatar: "https://i.pravatar.cc/40?img=1", name: "April Qoo", text: "liked your post", time: "30 minutes ago" },
    { id: 2, avatar: "https://i.pravatar.cc/40?img=2", name: "April Qoo", text: "commented on your post", time: "2 hours ago" },
    { id: 3, avatar: "https://i.pravatar.cc/40?img=3", name: "April Qoo", text: "requested to join your organisation", time: "14 hours ago" },
    { id: 4, avatar: "https://i.pravatar.cc/40?img=3", name: "April Qoo", text: "requested to join your organisation", time: "14 hours ago" },
    { id: 5, avatar: "https://i.pravatar.cc/40?img=3", name: "April Qoo", text: "requested to join your organisation", time: "14 hours ago" },
  ];

  const [notifications, setNotifications] = useState(3);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const notifRef = useRef(null);


  const [selectedLang, setSelectedLang] = useState(customLanguages[0]);
  const [searchValue, setSearchValue] = useState("");
  const [dropdownSearch, setDropdownSearch] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();

  // Google Translate widget loader
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.body.appendChild(script);

    window.googleTranslateElementInit = function () {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: customLanguages.map((l) => l.code).join(","),
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    return () => {
      document.body.removeChild(script);
      const widget = document.getElementById("google_translate_element");
      if (widget) widget.innerHTML = "";
    };
  }, []);

  const handleLangChange = (lang) => {
    setSelectedLang(lang);
    setIsDropdownOpen(false);

    const selectEl = document.querySelector("select.goog-te-combo");
    if (selectEl) {
      selectEl.value = lang.code;
      selectEl.dispatchEvent(new Event("change"));
    }
  };

  const filteredLanguages = customLanguages.filter((l) =>
    l.label.toLowerCase().includes(dropdownSearch.toLowerCase())
  );

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
      dispatch(logout());
    };

      const openTidioChat = () => {
    if (window.tidioChatApi) {
      window.tidioChatApi.open();
    } else {
      document.addEventListener("tidioChat-ready", () => {
        window.tidioChatApi.open();
      });
    }
  };

  return (
    <>
      <div className="flex items-center justify-between w-full px-4 h-14 bg-white border-b border-gray-200">
        <div id="google_translate_element" style={{ display: "none" }}></div>
 
        {/* Left Section */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex w-10 h-10 items-center justify-center">
            <img src={menu} alt="Menu" className="w-10 h-10" />
          </div>
          <div className="flex items-center gap-1 text-base font-semibold">
            <span className="text-gray-400">{menu_one ? menu_one : "Dashboard"}</span>
            <span className="text-gray-400">/</span>
            <span className="text-purple-600">{menu_two ? menu_two : "Home"}</span>
          </div>
        </div>

        {/* Center Section */}
        {/* <div className="hidden md:flex flex-1 max-w-md mx-6 relative z-10">
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
        </div> */}

        {/* Right Section */}
        <div className="flex items-center gap-4 top-nav-links" style={{ zIndex: 10 }}>
          
          <div className="flex">
            <Theme />
            <div className="sm:flex flex">
              {/* Notifications */}
              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => setIsNotifOpen(!isNotifOpen)}
                  className="relative focus:outline-none"
                >
                  <img src={bell} alt="Bell" className="w-10 h-10" />
                  {notifications > 0 && (
                    <span className="absolute top-3 right-3 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-500 rounded-full transform translate-x-1/2 -translate-y-1/2">
                      {notifications}
                    </span>
                  )}
                </button>

                {isNotifOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border">
                    <div className="p-3 font-semibold text-white border-b bg-blue-600 rounded-t-lg flex justify-between">
                      Notifications
                      <Setting color="white" />
                    </div>
                    <ul className="max-h-60 overflow-hidden">
                      {notificationsList.map((notif) => (
                        <li
                          key={notif.id}
                          className="flex items-start gap-3 p-3 hover:bg-gray-50 cursor-pointer"
                        >
                          <img
                            src={notif.avatar}
                            alt="avatar"
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <p className="text-sm">
                              <span className="font-bold">{notif.name}</span>{" "}
                              {notif.text}
                            </p>
                            <span className="text-xs text-gray-400">{notif.time}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="p-2 border-t text-center hover:bg-gray-100 cursor-pointer">
                      <Link to="/notifications">
                        <span className="text-sm font-semibold text-blue-600">
                          See All
                        </span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Mail & Gift */}
              <Link onClick={() => openTidioChat()} style={{ cursor: "pointer" }}><img src={mail} alt="Mail" className="w-10 h-10" /></Link>
              <Link to="/angelseed/reward" style={{ cursor: "pointer" }}><img src={gift} alt="Gift" className="w-10 h-10" /></Link>
            </div>
          </div>
          {/* Searchable language dropdown */}
          <div ref={dropdownRef} className="relative z-50 countryName">
            <button
              className="flex items-center p-2 border rounded w-40 justify-between"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="hidden sm:block">{selectedLang.label}</span>
              <ReactCountryFlag
                countryCode={selectedLang.country}
                svg
                style={{ width: "1.5em", height: "1.5em" }}
              />
            </button>

            {isDropdownOpen && (
              <div style={{ zIndex: 1000 }} className="absolute bg-white border rounded mt-1 w-40 max-h-60 overflow-auto shadow-lg">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-2 py-1 border-b focus:outline-none"
                  value={dropdownSearch}
                  onChange={(e) => setDropdownSearch(e.target.value)}
                />
                {filteredLanguages.map((lang) => (
                  <div
                    key={lang.code}
                    className="px-2 py-1 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                    onClick={() => handleLangChange(lang)}
                  >
                    <ReactCountryFlag
                      countryCode={lang.country}
                      svg
                      style={{ width: "1.5em", height: "1.5em" }}
                    />
                    <span>{lang.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

        <button
          onClick={handleLogout}
          style={{ zIndex: 1 }}
          type="button"
          className="hidden md:flex flex-col items-center text-gray-700 dark:text-gray-200 text-xs sm:text-sm hover:opacity-90 justify-self-end"
        >
          <img src={LogoutIcon} alt="Logout" className="w-5 h-5 mb-1" />
        </button>

        </div>
      </div>

      {/* Search Bar for Mobile */}
      <div className="w-full mt-3 px-4 md:hidden relative z-10">
        <div className="flex items-center bg-white border border-gray-300 rounded-xl px-3 py-3 shadow-sm">
          <div className="w-5 h-5 mr-2">
            <img src={search} alt="Search" className="w-8 h-8" />
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