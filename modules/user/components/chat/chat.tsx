"use client";

import dayjs from "dayjs";
import { useSocket } from "../../hooks/use-socket";
// import { useGlobalSocket } from "@/app/(user)/socket-provider/SocketProvider";


export default function Chat({ conversationId, currentUserId }: { conversationId: string; currentUserId: string|undefined; token?: string }) {
  const {
    messages,
    text,
    setText,
    scrollRef,
    sendMessage
  } = useSocket(conversationId,currentUserId)
  {console.log(conversationId,'conversationIddd and curret',currentUserId)}
  {console.log(messages),'in chat.tsx'}
  return (
    <div className="max-w-xl w-full flex flex-col border rounded p-3">
      <div className="flex-1 overflow-auto mb-3" style={{ maxHeight: "60vh" }}>
        {messages.map((m, i) => {
          const mine = m.senderId === currentUserId;
          return (
            <div key={i} className={`mb-2 flex ${mine ? "justify-end" : "justify-start"}`}>
              <div className={`px-3 py-2 rounded-lg ${mine ? "bg-blue-600 text-white" : "bg-gray-100 text-black"}`}>
                <div className="text-sm">{m.content}</div>
                <div className="text-xs mt-1 text-gray-300">{dayjs(m.createdAt).format("HH:mm")}</div>
              </div>
            </div>
          );
        })}
        <div ref={scrollRef} />
      </div>

      <div className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 border rounded p-2"
          placeholder="Write a message..."
        />
        <button onClick={sendMessage} className="px-4 py-2 bg-blue-600 text-white rounded">Send</button>
      </div>
    </div>
  );
}
