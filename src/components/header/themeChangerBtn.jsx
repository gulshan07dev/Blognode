import React, { useState, useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { useSelector } from "react-redux";

export default function ThemeChangerBtn({ className }) {
  const authStatus = useSelector((state) => state.auth.authStatus);
  const [isDarkMode, setIsDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );

  useEffect(() => {
    const bodyElement = document.body;
    bodyElement.classList.remove("dark", "light");

    isDarkMode
      ? bodyElement.classList.add("dark")
      : bodyElement.classList.add("light");

    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <button
      className={`
        bg-[#f4f4ff] dark:bg-[#2e2e31] p-3 rounded-full dark:bg-gray-800"
        ${
          isDarkMode
            ? "text-yellow-500 dark:text-yellow-200"
            : "text-[#19191d] dark:text-blue-300"
        } first-letter:
       ${className}`}
      onClick={toggleDarkMode}
    >
      {isDarkMode ? <FiSun size={24} /> : <FiMoon size={24} />}
    </button>
  );
}
