import ChatSession from "@/components/ChatSession";

export default function ChatPage({ params }: { params: { chatId: string } }) {
  return <ChatSession chatId={params.chatId} />;
}
