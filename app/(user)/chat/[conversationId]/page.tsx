"use client";

import Chat from "@/modules/user/components/chat/chat";
import { withAuth } from "@/shared/components/HOC/withAuth";
import { useAuthStore } from "@/store/Auth";

function ChatPage({ params }: { params: { conversationId: string } }) {
  const { user } = useAuthStore();
  const conversationId = params.conversationId;

  if (!user) return null; 

  return (
    <Chat
      chatId={conversationId}
      currentUserId={user.id}
    />
  );
}

export default withAuth(ChatPage);
