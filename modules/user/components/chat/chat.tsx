
"use client";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import { useSocket } from "../../hooks/use-socket";
import {
  Send,
  Phone,
  Video,
  MoreVertical,
  Smile,
  Users,
  ArrowLeft,
  Check,
  CheckCheck,
  X,
} from "lucide-react";
import { useCallStore } from "@/store/useCallStore";
import { Header } from "@/shared/components/layout/Header";
import { useEffect, useState, useRef } from "react";
import { ChatConnection } from "./types";
import { getSocket } from "@/lib/socket";
import dynamic from "next/dynamic";
import { EmojiClickData, Theme } from "emoji-picker-react";

// Dynamically import EmojiPicker with SSR disabled
const EmojiPicker = dynamic(() => import("emoji-picker-react"), {
  ssr: false,
  loading: () => <div className="w-[320px] h-[400px] bg-white rounded-lg shadow-lg flex items-center justify-center">Loading...</div>,
});
export default function Chat({
  chatId,
  currentUserId,
  selectedUser,
  onBackClick,
}: {
  chatId: string;
  currentUserId: string | undefined;
  selectedUser?: ChatConnection;
  onBackClick?: () => void;
}) {
  const { messages, text, scrollRef, sendMessage, typingUsers, handleTyping, setText } =
    useSocket(chatId, selectedUser, currentUserId);
  const [isOnline, setIsOnline] = useState(false);
  const [lastSeen, setLastSeen] = useState<string | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const isGroup = selectedUser?.type === "group";
  const { isCallActive } = useCallStore();

  // Handle emoji selection
  const onEmojiClick = (emojiData: EmojiClickData) => {
    handleTyping(text + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getInitials = (name: string) => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getSenderDisplayName = (senderId: string) => {
    if (senderId && senderId.includes('-') && senderId.length > 20) {
      return "Member";
    }
    if (senderId) {
      const formatted = senderId
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase());
      return formatted || "Member";
    }
    return "Unknown";
  };

  const handleStartCall = (type: "video" | "audio") => {
    const recipientId = selectedUser?.userId;
    if (!recipientId || !currentUserId) return;
    useCallStore
      .getState()
      .startCallUI(chatId, currentUserId, recipientId, type);
  };
  useEffect(() => {
    const socket = getSocket();

    const handleOnline = (data: { userId: string }) => {
      if (data.userId === selectedUser?.userId) setIsOnline(true);
    };

    const handleOffline = (data: { userId: string; lastSeen: string }) => {
      if (data.userId === selectedUser?.userId) {
        setIsOnline(false);
        setLastSeen(data.lastSeen);
      }
    };

    const handleStatus = (data: {
      userId: string;
      isOnline: boolean;
      lastSeen: string | null;
    }) => {
      if (data.userId === selectedUser?.userId) {
        setIsOnline(data.isOnline);
        setLastSeen(data.lastSeen);
      }
    };

    socket.on("userOnline", handleOnline);
    socket.on("userOffline", handleOffline);
    socket.on("userStatus", handleStatus);

    if (selectedUser?.userId) {
      socket.emit("getStatus", selectedUser.userId);
    }

    return () => {
      socket.off("userOnline", handleOnline);
      socket.off("userOffline", handleOffline);
      socket.off("userStatus", handleStatus);
    };
  }, [selectedUser]);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-gray-50 p-4 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          {/* Back Button for Mobile */}
          <button
            onClick={onBackClick}
            className="p-1 md:hidden hover:bg-gray-200 rounded-full transition"
            title="Back to chats"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>

          {/* Avatar */}
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0
              ${isGroup
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
                : isOnline
                  ? "Online"
                  : lastSeen
                    ? `Last seen ${dayjs(lastSeen).fromNow()}`
                    : "Offline"}
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
        className="flex-1 overflow-y-auto p-4 space-y-2 bg-[#e5ddd5]"
        style={{
          backgroundImage:
            'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")',
          backgroundRepeat: 'repeat',
          backgroundSize: '400px',
        }}
      >
        {messages.map((m, index) => {
          const mine = m.senderId === currentUserId;
          const showSenderName = isGroup && !mine;

          const currentDate = dayjs(m.createdAt);
          const prevDate = index > 0 ? dayjs(messages[index - 1].createdAt) : null;
          const showDateSeparator = !prevDate || !currentDate.isSame(prevDate, 'day');

          let dateLabel = currentDate.format("MMMM D, YYYY");
          if (currentDate.isSame(dayjs(), 'day')) dateLabel = "Today";
          else if (currentDate.isSame(dayjs().subtract(1, 'day'), 'day')) dateLabel = "Yesterday";

          return (
            <div key={m.id} className="flex flex-col">
              {showDateSeparator && (
                <div className="flex justify-center my-4 sticky top-2 z-10">
                  <span className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full shadow-sm">
                    {dateLabel}
                  </span>
                </div>
              )}

              <div className={`flex ${mine ? "justify-end" : "justify-start"} mb-1 group`}>
                {!mine && (
                  <div className="flex-shrink-0 mr-2 self-end mb-1">
                    {m.senderProfileImage ? (
                      <img
                        src={m.senderProfileImage}
                        alt={m.senderName || 'User'}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold
                        ${isGroup ? "bg-blue-500" : "bg-green-500"}`}>
                        {isGroup && m.senderName
                          ? getInitials(m.senderName)
                          : isGroup
                            ? getInitials(getSenderDisplayName(m.senderId))
                            : getInitials(selectedUser?.name || "U")}
                      </div>
                    )}
                  </div>
                )}

                <div
                  className={`max-w-[75%] sm:max-w-[70%] md:max-w-[60%] px-4 py-2 rounded-2xl relative shadow-sm
                    ${mine
                      ? "bg-[#d9fdd3] text-gray-900 rounded-tr-none"
                      : "bg-white text-gray-900 rounded-tl-none"
                    }`}
                >
                  {showSenderName && (
                    <p className="text-xs font-bold text-orange-600 mb-1">
                      {m.senderName || getSenderDisplayName(m.senderId)}
                    </p>
                  )}

                  <p className="text-[15px] leading-relaxed break-words whitespace-pre-wrap">{m.content}</p>

                  <div className={`text-[10px] mt-1 flex items-center justify-end gap-1 text-gray-500 select-none`}>
                    {dayjs(m.createdAt).format("h:mm A")}
                    {mine && (
                      <span>
                        {m.status === "read" ? (
                          <CheckCheck className="w-3.5 h-3.5 text-blue-500" />
                        ) : (
                          <Check className="w-3.5 h-3.5 text-gray-400" />
                        )}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 mt-10">
            <div className="bg-white/80 p-4 rounded-xl shadow-sm text-center">
              <p className="text-sm">No messages yet.</p>
              <p className="text-xs mt-1">Send a message to start the conversation!</p>
            </div>
          </div>
        )}

        <div ref={scrollRef} />
      </div>

      {/* Input Bar */}
      <div className="bg-gray-50 p-4 border-t border-gray-200 flex-shrink-0 relative">
        {/* Emoji Picker */}
        {showEmojiPicker && (
          <div
            ref={emojiPickerRef}
            className="absolute bottom-full left-0 mb-2 z-50"
          >
            <EmojiPicker
              onEmojiClick={onEmojiClick}
              theme={Theme.LIGHT}
              width={320}
              height={400}
              searchPlaceholder="Search emoji..."
              previewConfig={{ showPreview: false }}
            />
          </div>
        )}

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className={`p-2 hover:bg-gray-200 rounded-full transition ${showEmojiPicker ? 'bg-gray-200' : ''}`}
          >
            {showEmojiPicker ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Smile className="w-6 h-6 text-gray-600" />
            )}
          </button>

          {/* Typing Indicator */}
          {typingUsers.length > 0 && (
            <div className="px-4 pb-2">
              <div className="text-xs text-gray-500 italic flex items-center gap-2">
                <div className="flex space-x-1 items-center bg-gray-100 px-2 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-100"></span>
                  <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-200"></span>
                  <span className="ml-1 text-gray-600 font-medium">
                    {typingUsers.length === 1
                      ? "typing..."
                      : `${typingUsers.length} people typing...`}
                  </span>
                </div>
              </div>
            </div>
          )}

          <input
            type="text"
            value={text}
            onChange={(e) => handleTyping(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            onFocus={() => setShowEmojiPicker(false)}
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
