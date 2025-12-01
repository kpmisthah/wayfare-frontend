"use client";

import dayjs from "dayjs";
import { useSocket } from "../../hooks/use-socket";
import { Send, Phone, Video, MoreVertical, Smile, Users } from "lucide-react";
import { useCallStore } from "@/store/useCallStore";

export default function Chat({
  chatId,
  currentUserId,
  selectedUser,
}: {
  chatId: string;
  currentUserId: string | undefined;
  selectedUser?: any;
}) {
  const { messages, text, setText, scrollRef, sendMessage } = useSocket(
    chatId,
    selectedUser,
    currentUserId,  
  );
  const isGroup = selectedUser.type === "group";
  const { isCallActive } = useCallStore();

  const getInitials = (name: string) => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleStartCall = (type: "video" | "audio") => {
    const recipientId = selectedUser?.userId; // GET THE ACTUAL PARTNER'S USER ID
    console.log(recipientId, "reciepientIdd");
    if (!recipientId || !currentUserId) return;
    useCallStore
      .getState()
      .startCallUI(chatId, currentUserId, recipientId, type);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-gray-50 p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0
              ${
                isGroup
                  ? "bg-gradient-to-br from-blue-400 to-blue-600"
                  : "bg-gradient-to-br from-green-400 to-green-600"
              }`}
          >
            {isGroup ? (
              <Users className="w-5 h-5" />
            ) : (
              getInitials(selectedUser?.name || "U")
            )}
          </div>

          {/* Name + Status */}
          <div>
            <h2 className="font-semibold text-gray-900">
              {selectedUser?.name || "Chat"}
            </h2>
            <p className="text-xs text-gray-500">
              {isGroup
                ? `${selectedUser?.members?.length || 0} members`
                : "Online"}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {!isGroup && (
            <>
              <button
                onClick={() => handleStartCall("video")}
                disabled={isCallActive}
                className="p-2 hover:bg-gray-200 rounded-full transition disabled:opacity-50"
                title="Video Call"
              >
                <Video className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={() => handleStartCall("audio")}
                disabled={isCallActive}
                className="p-2 hover:bg-gray-200 rounded-full transition disabled:opacity-50"
                title="Audio Call"
              >
                <Phone className="w-5 h-5 text-gray-600" />
              </button>
            </>
          )}
          <button className="p-2 hover:bg-gray-200 rounded-full transition">
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div
        className="flex-1 overflow-y-auto p-4 space-y-4"
        style={{
          backgroundImage:
            'url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23d1d5db" fill-opacity="0.15"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')',
          backgroundColor: "#f0f2f5",
        }}
      >
        {messages.map((m) => {
          const mine = m.senderId === currentUserId;
          const showSenderName = isGroup && !mine;

          return (
            <div
              key={m.id}
              className={`flex ${mine ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-md px-4 py-2 rounded-lg relative
                  ${
                    mine
                      ? "bg-green-500 text-white rounded-br-none"
                      : "bg-white text-gray-900 rounded-bl-none shadow-sm"
                  }`}
              >
                {/* Show sender name in group (not for own messages) */}
                {showSenderName && (
                  <p className="text-xs font-semibold text-blue-600 mb-1 opacity-80">
                    ~ {m.senderId || "User"}
                  </p>
                )}

                <p className="text-sm break-words">{m.content}</p>

                <div
                  className={`text-xs mt-1 ${
                    mine ? "text-green-100" : "text-gray-500"
                  } text-right`}
                >
                  {dayjs(m.createdAt).format("HH:mm")}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={scrollRef} />
      </div>

      {/* Input Bar */}
      <div className="bg-gray-50 p-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-200 rounded-full transition">
            <Smile className="w-6 h-6 text-gray-600" />
          </button>

          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder={isGroup ? "Message group" : "Type a message"}
            className="flex-1 px-4 py-3 bg-white rounded-full text-sm focus:outline-none border border-gray-200 focus:border-green-500 transition"
            disabled={isCallActive}
          />

          <button
            onClick={sendMessage}
            disabled={!text.trim() || isCallActive}
            className="p-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-full transition"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
//final ocde
