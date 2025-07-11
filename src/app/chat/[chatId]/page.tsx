"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import ChatSession from "@/components/ChatSession";

export default function ChatPage() {
  const { chatId } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Debug: Log sidebar state changes
  useEffect(() => {
    console.log("Chat Page - Sidebar:", sidebarOpen ? "OPEN" : "CLOSED");
  }, [sidebarOpen]);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <TopBar onMenuClick={() => setSidebarOpen((open) => !open)} />

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar overlays on top of main content */}
        {sidebarOpen && (
          <div className="absolute inset-0 z-40">
            <Sidebar />
          </div>
        )}

        <main className="flex-1 overflow-hidden bg-[#fdf9f3]">
          <ChatSession chatId={chatId as string} />
        </main>
      </div>
    </div>
  );
}
