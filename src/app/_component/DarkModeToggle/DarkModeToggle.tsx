"use client";

import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    setIsDark(saved === "true");
  }, []);

  const toggle = () => {
    const newVal = !isDark;
    setIsDark(newVal);
    localStorage.setItem("darkMode", String(newVal));
    if (newVal) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <button
      onClick={toggle}
      className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
      aria-label="Toggle dark mode"
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}