"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import Chat from "./chat";
import { useAuthStore } from "@/store/Auth";

export default function ChatUi() {
  const [connections, setConnections] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);
  const {user} = useAuthStore()
  useEffect(() => {
    const fetchConnections = async () => {
      const res = await api.get("/connections/accepted");
      console.log(res.data,'in chat Uiiiiii')
      setConnections(res.data);
    };
    fetchConnections();
  }, []);
  {console.log(user),'in useAtuhstoree'}
  return (
    <div className="flex h-[90vh] border rounded-lg overflow-hidden">
      {/* LEFT SIDEBAR */}
      <div className="w-1/3 border-r bg-gray-50 overflow-y-auto">
        <h2 className="text-lg font-bold p-4">Chats</h2>
        {connections.map((c) => (
          <div
            key={c.conversationId}
            onClick={() => setSelected(c)}
            className={`p-3 cursor-pointer hover:bg-gray-200 ${
              selected?.conversationId === c.conversationId ? "bg-gray-200" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              {/* <img
                src={null}
                className="w-10 h-10 rounded-full object-cover"
                alt={c.name}
              /> */}
              <div>
                <p className="font-medium">{c.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT SIDE CHAT WINDOW */}
      <div className="flex-1 flex flex-col">
        {selected ? (
          <Chat
            conversationId={selected.conversationId}
            currentUserId={user?.id}
          />
        ) : (
          <div className="flex flex-1 items-center justify-center text-gray-400">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
}
