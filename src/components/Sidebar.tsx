"use client";

import { usePathname } from "next/navigation";
import { decrypt } from "@/lib/encrypt";

interface SidebarProps {
  chats: { id: string; title: string }[];
  activeChatId: string | null;
  onSelectChat: (chatId: string) => void;
  onNewChat: () => void;
}

export default function Sidebar({
  chats,
  activeChatId,
  onSelectChat,
  onNewChat,
}: SidebarProps) {
  return (
    <aside className="w-64 bg-[#fdf9f3] text-gray-800 p-4 border-r border-[#e0d5c0] h-full overflow-y-auto font-serif shadow-inner">
      {/* Sticky New Chat Button */}
      <div className="sticky top-0 bg-[#fdf9f3] z-10 pb-4">
        <button
          onClick={onNewChat}
          className="flex items-center gap-2 bg-gradient-to-r from-[#7b1e1e] to-[#9c1c1c] text-[#f1c40f] hover:text-white hover:shadow-lg px-4 py-2 rounded-md font-medium tracking-wide transition duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          New Chat
        </button>
      </div>

      {/* Chat List Header */}
      <h3 className="text-md font-bold text-[#7b1e1e] uppercase mt-3 mb-2 tracking-wide">
        Your Chats
      </h3>

      {/* Chat List */}
      <ul className="space-y-2">
        {chats.map((chat) => {
          const decryptedTitle = chat.title; // 🧠 Decrypt here once

          return (
            <li key={chat.id}>
              <button
                onClick={() => onSelectChat(chat.id)}
                className={`w-full text-left px-3 py-2 rounded-md truncate transition-all duration-150 ${
                  activeChatId === chat.id
                    ? "bg-[#f5ebe0] border-l-4 border-[#c0392b] font-semibold text-[#7b1e1e] shadow"
                    : "hover:bg-[#f0e6dd] text-gray-700"
                }`}
                title={decryptedTitle}
              >
                {decryptedTitle.length > 40
                  ? decryptedTitle.slice(0, 40) + "..."
                  : decryptedTitle}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
