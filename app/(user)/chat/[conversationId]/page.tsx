// "use client";
import Chat from "@/modules/user/components/chat/chat";
import { getUserFromServer } from "@/lib/getUser";
export default async function ChatPage({ params }: { params: { conversationId: string } }) {
    const user = await getUserFromServer()
    if(!user)return <p>Please login</p>
  return (
    <Chat
      conversationId={params.conversationId}
      currentUserId={user.id}
    />
  );
}
