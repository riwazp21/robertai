// /app/chat/[chatId]/page.tsx
import ChatSession from "@/components/ChatSession";

export default function ChatPage({ params }: { params: { chatId: string } }) {
  const { chatId } = params;

  return <ChatSession chatId={chatId} />;
}
