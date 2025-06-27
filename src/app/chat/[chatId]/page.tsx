// src/app/chat/[chatId]/page.tsx
import ChatSession from "@/components/ChatSession";

type Props = {
  params: {
    chatId: string;
  };
};

export default function ChatPage({ params }: Props) {
  return <ChatSession chatId={params.chatId} />;
}
