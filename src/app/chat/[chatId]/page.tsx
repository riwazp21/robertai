// /app/chat/[chatId]/page.tsx
import ChatSession from "@/components/ChatSession";

interface ChatPageProps {
  params: {
    chatId: string;
  };
}

export default function ChatPage({ params }: ChatPageProps) {
  const { chatId } = params;
  return <ChatSession chatId={chatId} />;
}
