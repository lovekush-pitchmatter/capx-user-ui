import { useEffect, useState } from "react";
import { IoMoonOutline } from "react-icons/io5";
import sun from "../../assets/dashboard/sun.png";

const Theme = () => {
  const [mode, setMode] = useState(false); // false = light, true = dark

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setMode(false);
    }
  }, []);

  const toggleDarkMode = () => {
    const isDark = !mode;
    setMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  return (
    <button onClick={toggleDarkMode}>
      {mode ? (
        <IoMoonOutline className="md:h-5 md:w-5 h-4 w-4 dark:text-gray" />
      ) : (
        <img src={sun} alt="Sun" className="w-10 h-10" />
      )}
    </button>
  );
};

export default Theme;
