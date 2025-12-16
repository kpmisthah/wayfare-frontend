"use client";

import { use } from "react";
import Chat from "@/modules/user/components/chat/chat";
import { withAuth } from "@/shared/components/HOC/withAuth";
import { useAuthStore } from "@/store/Auth";

function ChatPage({ params }: { params: Promise<{ conversationId: string }> }) {
  const { user } = useAuthStore();
  const { conversationId } = use(params);

  if (!user) return null;

  return (
    <Chat
      chatId={conversationId}
      currentUserId={user.id}
    />
  );
}

export default withAuth(ChatPage);

