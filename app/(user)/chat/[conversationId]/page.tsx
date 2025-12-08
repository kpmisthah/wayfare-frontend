// "use client";
import Chat from "@/modules/user/components/chat/chat";
import { getUserFromServer } from "@/lib/getUser";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function ChatPage({ params }: any) {
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
