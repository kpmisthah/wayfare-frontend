// "use client";
import Chat from "@/modules/user/components/chat/chat";
import { getUserFromServer } from "@/lib/getUser";
export default async function ChatPage({ params }: { params: Promise<{ conversationId: string }> }) {
  const { conversationId } = await params;
  const user = await getUserFromServer()
  if (!user) return <p>Please login</p>
  return (
    <Chat
      chatId={conversationId}
      currentUserId={user.id}
    />
  );
}
