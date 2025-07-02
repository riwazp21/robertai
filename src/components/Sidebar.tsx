"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import NewChatModal from "@/components/NewChatModal"; // ✅ make sure path is correct

interface Chat {
  id: string;
  title: string;
}

export default function Sidebar() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(false);
  void loading;
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  // Fetch user's chat list
  const fetchChats = async () => {
    try {
      const res = await fetch("/api/chats");
      const data = await res.json();
      if (res.ok) {
        setChats(data.chats || []);
      } else {
        console.error("Failed to load chats:", data.error);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <aside className="w-64 bg-[#fdf9f3] text-gray-800 p-4 border-r border-[#e0d5c0] h-full overflow-y-auto font-serif shadow-inner">
      {/* New Chat Button */}
      <div className="sticky top-0 bg-[#fdf9f3] z-10 pb-4">
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-[#7b1e1e] to-[#9c1c1c] text-[#f1c40f] hover:text-white hover:shadow-lg px-4 py-2 rounded-md font-medium tracking-wide transition duration-200 disabled:opacity-50"
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

      <h3 className="text-md font-bold text-[#7b1e1e] uppercase mt-3 mb-2 tracking-wide">
        Your Chats
      </h3>

      {/* Chat List */}
      <ul className="space-y-2">
        {chats.map((chat) => {
          const isActive = pathname === `/chat/${chat.id}`;
          return (
            <li key={chat.id}>
              <button
                onClick={() => router.push(`/chat/${chat.id}`)}
                className={`w-full text-left px-3 py-2 rounded-md truncate transition-all duration-150 ${
                  isActive
                    ? "bg-[#f5ebe0] border-l-4 border-[#c0392b] font-semibold text-[#7b1e1e] shadow"
                    : "hover:bg-[#f0e6dd] text-gray-700"
                }`}
                title={chat.title}
              >
                {chat.title.length > 40
                  ? chat.title.slice(0, 40) + "..."
                  : chat.title}
              </button>
            </li>
          );
        })}
      </ul>

      {/* Modal */}
      {showModal && (
        <NewChatModal
          onClose={() => setShowModal(false)}
          onSubmit={async (title: string) => {
            setLoading(true);
            try {
              const res = await fetch("/api/create-chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title }),
              });

              const data = await res.json();
              if (res.ok && data.chatId) {
                router.push(`/chat/${data.chatId}`);
                await fetchChats(); // Refresh chat list
              } else {
                alert(data.error || "Failed to create chat");
              }
            } catch (err) {
              console.error("Failed to create chat:", err);
            } finally {
              setShowModal(false);
              setLoading(false);
            }
          }}
        />
      )}
    </aside>
  );
}
