"use client";

import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import MessageInput from "@/components/MessageInput";

interface Message {
  role: "user" | "advisor";
  text: string;
}

interface RawMessage {
  userMessage: string;
  advisorMessage: string;
}

interface ChatSessionProps {
  chatId: string;
}

export default function ChatSession({ chatId }: ChatSessionProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [isAutoScrollEnabled, setIsAutoScrollEnabled] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  // Detect if user has scrolled up
  const handleScroll = () => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
    setIsAutoScrollEnabled(isNearBottom);
  };

  // Fetch messages on load
  useEffect(() => {
    const fetchMessages = async () => {
      const res = await fetch(`/api/messages?chatId=${chatId}`);
      const data = await res.json();

      const formatted: Message[] = (data.messages as RawMessage[]).flatMap(
        (m) => [
          { role: "user", text: m.userMessage },
          { role: "advisor", text: m.advisorMessage },
        ]
      );

      setMessages(formatted);
    };

    fetchMessages();
  }, [chatId]);

  // Animate and handle message sending
  const handleSend = async (text: string) => {
    const userMessage: Message = { role: "user", text };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    const res = await fetch("/api/synthesizer-agent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userScenario: text }),
    });

    const data = await res.json();
    const fullReply = data.advice;

    setMessages((prev) => [...prev, { role: "advisor", text: fullReply }]);
    setLoading(false);

    await fetch("/api/save-message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chatId,
        userMessage: text,
        advisorMessage: fullReply,
      }),
    });
  };

  // Scroll only if user is at bottom
  useEffect(() => {
    if (isAutoScrollEnabled) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading, isAutoScrollEnabled]);

  return (
    <div className="flex flex-col h-full bg-[#fdf9f3] rounded-xl border border-[#e0d5c0] shadow-lg overflow-hidden font-serif">
      {/* Message Feed */}
      <div
        ref={messagesContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-6 py-6 space-y-4"
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`w-fit max-w-2xl text-sm leading-relaxed tracking-wide ${
              msg.role === "user"
                ? "ml-auto bg-gradient-to-br from-[#7b1e1e] to-[#9c1c1c] text-white rounded-2xl px-5 py-3 shadow-lg"
                : "mr-auto bg-[#f8f1e4] text-[#1a1a1a] border border-[#e6d5b8] rounded-2xl px-5 py-3 shadow"
            }`}
          >
            {msg.role === "advisor" ? (
              <div className="whitespace-pre-wrap">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {msg.text}
                </ReactMarkdown>
              </div>
            ) : (
              msg.text
            )}
          </div>
        ))}

        {/* Animated dots while waiting */}
        {loading && (
          <div className="w-fit max-w-2xl mr-auto bg-[#f8f1e4] text-[#1a1a1a] border border-[#e6d5b8] rounded-2xl px-5 py-3 shadow flex gap-1 text-xl">
            <span className="animate-bounce">.</span>
            <span className="animate-bounce delay-150">.</span>
            <span className="animate-bounce delay-300">.</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-6 pt-2 pb-4">
        <MessageInput onSend={handleSend} />
      </div>
    </div>
  );
}
