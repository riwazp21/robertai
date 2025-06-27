"use client";

import { useState } from "react";

interface NewChatFormProps {
  onCreated: (chatId: string) => void;
}

export default function NewChatForm({ onCreated }: NewChatFormProps) {
  const [title, setTitle] = useState("");
  const [creating, setCreating] = useState(false);

  const handleCreate = async () => {
    if (!title.trim()) return;
    setCreating(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    const data = await res.json();
    if (res.ok) {
      onCreated(data.chat.id);
      setTitle("");
    } else {
      alert(data.error || "Failed to create chat");
    }

    setCreating(false);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-xl shadow-lg bg-[#fdf9f3] border border-[#e0d5c0] w-full max-w-md font-serif">
      <h2 className="text-xl text-[#7b1e1e] font-bold mb-4 tracking-wide">
        Start a New Chat
      </h2>

      <input
        type="text"
        placeholder="Enter chat title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-4 py-3 mb-4 border-2 border-[#9c1c1c] rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c0392b] transition"
      />

      <button
        onClick={handleCreate}
        disabled={creating}
        className="w-full px-5 py-3 bg-gradient-to-r from-[#7b1e1e] to-[#9c1c1c] text-[#f1c40f] font-semibold rounded-lg hover:bg-[#7b1e1e]/90 shadow-sm hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {creating ? "Creating..." : "Create Chat"}
      </button>
    </div>
  );
}
