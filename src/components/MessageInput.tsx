"use client";

import { useState, useRef, useEffect } from "react";

interface MessageInputProps {
  onSend: (text: string) => void;
}

export default function MessageInput({ onSend }: MessageInputProps) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-grow height
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [input]);

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   if (input.trim() === "") return;
  //   onSend(input.trim());
  //   setInput("");
  // };

  // const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
  //   if (e.key === "Enter" && !e.shiftKey) {
  //     e.preventDefault();
  //     handleSubmit(e as any);
  //   }
  // };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (input.trim() === "") return;
        onSend(input.trim());
        setInput("");
      }}
      className="flex items-end gap-2"
    >
      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            e.currentTarget.form?.requestSubmit(); // triggers the form submit cleanly
          }
        }}
        placeholder="Type your decree..."
        rows={1}
        className="flex-1 p-3 rounded-xl border-2 border-[#9c1c1c] bg-white text-gray-800 font-serif placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c0392b] transition resize-none max-h-40 overflow-y-auto"
      />
      <button
        type="submit"
        className="px-5 py-3 bg-gradient-to-r from-[#7b1e1e] to-[#9c1c1c] text-[#f1c40f] font-semibold rounded-xl hover:bg-[#7b1e1e]/90 shadow-sm hover:shadow-lg transition"
      >
        Send
      </button>
    </form>
  );
}
