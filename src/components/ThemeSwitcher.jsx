import React, { useState, useEffect } from "react";
import { IoSunny, IoMoon } from "react-icons/io5";
const ThemeSwitcher = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDarkMode);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className={`rounded-full px-4 py-2 ${
        darkMode ? "bg-yellow-400" : "bg-gray-800"
      } ${
        darkMode ? "text-gray-800" : "text-white"
      } transition-colors duration-200`}
    >
      {darkMode ? <IoSunny size={20} /> : <IoMoon size={20} />}
    </button>
  );
};

export default ThemeSwitcher;
