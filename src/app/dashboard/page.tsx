"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import MainBar from "@/components/MainBar";
import TopBar from "@/components/TopBar";

interface Chat {
  id: string;
  title: string;
}

export default function Dashboard() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  //const router = useRouter();

  // Fetch user’s chats
  const fetchChats = async () => {
    const res = await fetch("/api/chats");
    const data = await res.json();
    setChats(data.chats || []);
  };

  useEffect(() => {
    fetchChats();
  }, []);

  const handleCreateNewChat = async (title: string) => {
    const res = await fetch("/api/create-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    const data = await res.json();
    if (data.chatId) {
      setActiveChatId(data.chatId);
      setShowNewChatModal(false);
      await fetchChats(); // ✅ Refresh chat list
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <TopBar />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          chats={chats}
          activeChatId={activeChatId}
          onSelectChat={setActiveChatId}
          onNewChat={() => setShowNewChatModal(true)}
        />
        <MainBar
          activeChatId={activeChatId}
          showNewChatModal={showNewChatModal}
          onSubmitNewChat={handleCreateNewChat}
          onCloseModal={() => setShowNewChatModal(false)}
        />
      </div>
    </div>
  );
}
