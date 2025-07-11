import React from "react";

interface TopBarProps {
  onMenuClick?: () => void;
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  return (
    <header className="w-full bg-gradient-to-r from-[#7b1e1e] to-[#9c1c1c] py-2 px-6 shadow-lg text-center flex items-center">
      {/* Hamburger menu - visible on all screen sizes */}
      <button
        className="text-[#f1c40f] text-2xl mr-2"
        onClick={onMenuClick}
        aria-label="Open sidebar menu"
      >
        ☰
      </button>
      <h1 className="text-2xl text-[#f1c40f] font-serif tracking-wide drop-shadow-sm mx-auto">
        RobertAI
      </h1>
    </header>
  );
}
