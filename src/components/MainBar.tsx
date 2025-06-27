"use client";

import NewChatModal from "@/components/NewChatModal";

interface MainBarProps {
  showNewChatModal: boolean;
  onSubmitNewChat: (title: string) => void;
  onCloseModal: () => void;
}

export default function MainBar({
  showNewChatModal,
  onSubmitNewChat,
  onCloseModal,
}: MainBarProps) {
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
      {!showNewChatModal && (
        <div className="flex items-center justify-center h-full text-gray-500">
          Select or create a chat to get started.
        </div>
      )}
    </main>
  );
}
