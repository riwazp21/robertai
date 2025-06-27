"use client";

import { useState } from "react";
import ChatSession from "@/components/ChatSession";
import NewChatModal from "@/components/NewChatModal";

interface MainBarProps {
  activeChatId: string | null;
  showNewChatModal: boolean;
  onSubmitNewChat: (title: string) => void;
  onCloseModal: () => void;
}

export default function MainBar({
  activeChatId,
  showNewChatModal,
  onSubmitNewChat,
  onCloseModal,
}: MainBarProps) {
  const [newTitle, setNewTitle] = useState("");

  return (
    <main className="flex-1 relative bg-gray-50 border-l h-full overflow-y-auto">
      {/* Overlay Modal for New Chat */}
      {showNewChatModal && (
        <NewChatModal
          onClose={onCloseModal}
          onSubmit={(title) => {
            onSubmitNewChat(title);
          }}
        />
      )}

      {/* No Chat Selected */}
      {!activeChatId && !showNewChatModal && (
        <div className="flex items-center justify-center h-full text-gray-500">
          Select or create a chat to get started.
        </div>
      )}
      {/* ChatSession */}
      {activeChatId && !showNewChatModal && (
        <ChatSession chatId={activeChatId} />
      )}
    </main>
  );
}
