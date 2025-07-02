"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
//import MainBar from "@/components/MainBar";
import TopBar from "@/components/TopBar";
import NewChatModal from "@/components/NewChatModal";

interface Chat {
  id: string;
  title: string;
}

export default function DashboardPage() {
  const [chats, setChats] = useState<Chat[]>([]);
  useEffect(() => {
    if (chats.length > 0) {
      console.log("Chats loaded:", chats);
    }
  }, [chats]);

  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const router = useRouter();

  // Load all chats
  const fetchChats = async () => {
    try {
      const res = await fetch("/api/chats");
      const data = await res.json();
      setChats(data.chats || []);
    } catch (err) {
      console.error("Failed to fetch chats:", err);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  // Create new chat
  const handleCreateNewChat = async (title: string) => {
    try {
      const res = await fetch("/api/create-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      const data = await res.json();

      if (res.ok && data.chatId) {
        setShowNewChatModal(false);
        await fetchChats(); // update chat list
        router.push(`/chat/${data.chatId}`);
      } else {
        alert(data.error || "Failed to create chat");
      }
    } catch (err) {
      console.error("Error creating chat:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <TopBar />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">
              Welcome to your Dashboard
            </h1>
            <p className="text-gray-600">
              Click <span className="font-semibold">New Chat</span> in the
              sidebar to start a conversation!
            </p>
          </div>
        </main>
      </div>

      {showNewChatModal && (
        <NewChatModal
          onClose={() => setShowNewChatModal(false)}
          onSubmit={handleCreateNewChat}
        />
      )}
    </div>
  );
}
