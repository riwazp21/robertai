"use client";

import { useParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import ChatSession from "@/components/ChatSession";

export default function ChatPage() {
  const { chatId } = useParams();

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-hidden bg-[#fdf9f3]">
          <ChatSession chatId={chatId as string} />
        </main>
      </div>
    </div>
  );
}
