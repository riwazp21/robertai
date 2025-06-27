// /app/chat/[chatId]/page.tsx
import ChatSession from "@/components/ChatSession";

interface ChatPageProps {
  params: {
    chatId: string;
  };
}

export default function ChatPage({ params }: ChatPageProps) {
  return <ChatSession chatId={params.chatId} />;
}
