"use client";

import { useState } from "react";

interface NewChatModalProps {
  onClose: () => void;
  onSubmit: (title: string) => void;
}

export default function NewChatModal({ onClose, onSubmit }: NewChatModalProps) {
  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    const trimmed = title.trim();
    if (trimmed.length > 0) {
      onSubmit(trimmed);
      setTitle("");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md">
      <div className="bg-[#fdf9f3] rounded-xl shadow-xl w-full max-w-sm p-6 border border-[#e0d5c0] font-serif">
        <h2 className="text-xl text-[#7b1e1e] font-bold mb-4 tracking-wide">
          Create New Chat
        </h2>

        <input
          value={title}
          onChange={(e) => {
            if (e.target.value.length <= 21) {
              setTitle(e.target.value);
            }
          }}
          placeholder="Enter chat title..."
          className="w-full px-4 py-3 mb-2 border-2 border-[#9c1c1c] rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c0392b] transition"
        />

        <div className="text-sm text-gray-500 text-right mb-4">
          {title.length} / 21
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-[#7b1e1e] hover:underline transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={title.trim().length === 0}
            className={`px-5 py-2 rounded-lg font-semibold transition ${
              title.trim().length === 0
                ? "bg-gray-300 text-white cursor-not-allowed"
                : "bg-gradient-to-r from-[#7b1e1e] to-[#9c1c1c] text-[#f1c40f] hover:shadow-md"
            }`}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
