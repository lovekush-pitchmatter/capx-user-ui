import { useEffect, useState } from "react";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

const Theme = () => {
  const [mode, setMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: light)"
    ).matches;

    if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
      setMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    const isDark = !mode;
    setMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  return (
    <button
      className="p-2 bg-white rounded-xl border-2 border-[#7A44FF] dark:bg-gray-800"
      onClick={toggleDarkMode}
    >
      {mode ? (
        <IoSunnyOutline className="md:h-6 md:w-6 h-4 w-4 dark:text-white" />
      ) : (
        <IoMoonOutline className="md:h-6 md:w-6 h-4 w-4 dark:text-white" />
      )}
    </button>
  );
};

export default Theme;
