interface ChatBubbleProps {
  role: "user" | "server";
  text: string;
}

export default function ChatBubble({ role, text }: ChatBubbleProps) {
  const isUser = role === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      } animate-fade-in`}
    >
      <div
        className={`px-4 py-3 rounded-2xl max-w-[75%] break-words shadow-md transition-all
          ${
            isUser
              ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-br-none"
              : "bg-gray-100 text-gray-800 rounded-bl-none"
          }`}
      >
        {text}
      </div>
    </div>
  );
}
