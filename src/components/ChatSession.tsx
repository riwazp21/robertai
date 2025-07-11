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

// Component to handle advisor message with preview/expand functionality
function AdvisorMessage({ text }: { text: string }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Parse the message into sections
  const parseMessage = (message: string) => {
    const lines = message.split("\n");
    const sections = {
      firstParagraph: "",
      relevantLaws: "",
      otherContent: "",
    };

    let currentSection = "firstParagraph";
    let firstParagraphFound = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Skip empty lines
      if (!line) continue;

      // Check if this is the first paragraph (not bolded)
      if (!firstParagraphFound && !line.startsWith("**")) {
        sections.firstParagraph += line + "\n";
        firstParagraphFound = true;
        continue;
      }

      // Check if this is "Relevant Laws" section
      if (
        line.includes("**Relevant Laws**") ||
        line.includes("**Relevant Law**")
      ) {
        currentSection = "relevantLaws";
        sections.relevantLaws += line + "\n";
        continue;
      }

      // If we're in relevant laws section, keep adding until we hit another bolded section
      if (currentSection === "relevantLaws") {
        if (line.startsWith("**") && !line.includes("Relevant Laws")) {
          currentSection = "otherContent";
          sections.otherContent += line + "\n";
        } else {
          sections.relevantLaws += line + "\n";
        }
        continue;
      }

      // Everything else goes to other content
      sections.otherContent += line + "\n";
    }

    return sections;
  };

  const sections = parseMessage(text);
  const hasOtherContent = sections.otherContent.trim().length > 0;

  if (!hasOtherContent || isExpanded) {
    // Show full content
    return (
      <div className="whitespace-pre-wrap">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
      </div>
    );
  }

  // Show preview mode
  return (
    <div className="space-y-3">
      {/* First paragraph */}
      {sections.firstParagraph.trim() && (
        <div className="whitespace-pre-wrap">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {sections.firstParagraph}
          </ReactMarkdown>
        </div>
      )}

      {/* Relevant Laws (if exists) */}
      {sections.relevantLaws.trim() && (
        <div className="whitespace-pre-wrap">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {sections.relevantLaws}
          </ReactMarkdown>
        </div>
      )}

      {/* Decipher More button */}
      <button
        onClick={() => setIsExpanded(true)}
        className="text-[#7b1e1e] font-bold hover:text-[#9c1c1c] underline decoration-dotted hover:decoration-solid transition-all duration-200 text-sm"
      >
        Decipher More...
      </button>
    </div>
  );
}

export default function ChatSession({ chatId }: ChatSessionProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [isAutoScrollEnabled, setIsAutoScrollEnabled] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
    setIsAutoScrollEnabled(isNearBottom);
  };

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

  useEffect(() => {
    if (isAutoScrollEnabled) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading, isAutoScrollEnabled]);

  return (
    <div className="flex flex-col h-full bg-[#fdf9f3] overflow-hidden font-serif">
      {/* Message Feed */}
      <div
        ref={messagesContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-8 py-6 space-y-4"
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
              <AdvisorMessage text={msg.text} />
            ) : (
              msg.text
            )}
          </div>
        ))}

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
      <div className="px-8 pt-2 pb-4">
        <MessageInput onSend={handleSend} />
      </div>
    </div>
  );
}
