"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function MobileThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClick = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <div className="fixed bottom-16 left-1/2 -translate-x-1/2 z-30">
      {/* Animated rotating ring - only in dark mode */}
      {isDark && (
        <div
          className="absolute inset-[-2px] rounded-full"
          style={{
            background: "conic-gradient(from 0deg, #F9C22E, #E01A4F, #8B5CF6, #1aafc9, #14b57a, #F9C22E)",
            animation: "spin 5s linear infinite",
          }}
        />
      )}
      {/* Button */}
      <button
        onClick={handleClick}
        className="relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:scale-110 active:scale-95"
        style={{ backgroundColor: isDark ? "#000000" : "#F9C22E" }}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke={isDark ? "#ffffff" : "#000000"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M9 18h6" />
          <path d="M10 22h4" />
          <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
        </svg>
      </button>
    </div>
  );
}
