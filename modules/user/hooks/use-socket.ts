"use client";

import { useEffect, useRef, useState } from "react";
import api from "@/lib/api";
import { getSocket } from "@/lib/socket";
import { Socket } from "socket.io-client";

import { ChatMessage, ChatConnection } from "../components/chat/types";

export const useSocket = (
  chatId: string,
  selectedUser: ChatConnection | null | undefined,
  currentUserId?: string
) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState("");
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };
  const socketRef = useRef<Socket | null>(null); // ✅ store socket globally for this hook
  const joinedRoomsRef = useRef<Set<string>>(new Set());
  useEffect(() => {
    const socket = getSocket();
    socketRef.current = socket;

    if (!chatId) return;
    // const roomPayload = selectedUser?.groupId
    //   ? { groupId: chatId }
    //   : { conversationId: chatId };
    // Join the room using the same ID (conversationId or groupId)
    // socket.emit("joinRoom", roomPayload); // backend accepts it as room name
    // console.log(`Joined room: ${chatId}`,roomPayload);
    if (!selectedUser?.type || selectedUser.type !== "group") {
      const roomPayload = { conversationId: chatId };
      socket.emit("joinRoom", roomPayload);
    } else {
    }

    // Mark as read via API (persistence)
    api.post(`/messages/${chatId}/read`).catch(() => { });

    const fetchMessages = async () => {
      try {
        // This endpoint works for both! (you already have it)
        const res = await api.get(`/messages/${chatId}`);
        const fetchedMessages = res.data || [];

        // Debug: Check if senderName is included

        setMessages(fetchedMessages);
        scrollToBottom();

        // Mark all unread messages from other users as read via socket
        const unreadMessageIds = fetchedMessages
          .filter((msg: ChatMessage) => msg.senderId !== currentUserId && msg.status !== 'read')
          .map((msg: ChatMessage) => msg.id);

        if (unreadMessageIds.length > 0) {
          socket.emit('markRead', {
            conversationId: selectedUser?.type === 'group' ? undefined : chatId,
            groupId: selectedUser?.type === 'group' ? chatId : undefined,
            messageIds: unreadMessageIds
          });
        }
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      }
    };

    fetchMessages();

    const onNewMessage = (msg: ChatMessage) => {
      // Debug: Check if new message has sender info

      // Accept message if it belongs to this chat (either conversationId or groupId matches)
      if (msg.conversationId === chatId || msg.groupId === chatId) {
        setMessages((prev) =>
          prev.some((m) => m.id === msg.id) ? prev : [...prev, msg]
        );
        scrollToBottom();

        // If I am the receiver and I'm looking at this chat, mark it as read immediately
        if (msg.senderId !== currentUserId) {
          socket.emit('markRead', {
            conversationId: msg.conversationId,
            groupId: msg.groupId,
            messageIds: [msg.id]
          });
        }
      }
    };

    const onMessagesRead = (data: { messageIds: string[], conversationId: string, readerId: string }) => {
      if (data.conversationId === chatId || (selectedUser?.type === 'group' && data.conversationId /* misnamed in event? */ === chatId)) { // actually we used groupId in event too
        setMessages(prev => prev.map(m => {
          if (data.messageIds.includes(m.id)) {
            return { ...m, status: 'read' };
          }
          return m;
        }));
      }
    };

    const handleTyping = (data: { userId: string; isTyping: boolean }) => {
      setTypingUsers((prev) => {
        if (data.isTyping && data.userId !== currentUserId) {
          return [...new Set([...prev, data.userId])];
        }
        return prev.filter((id) => id !== data.userId);
      });
    };
    // socket.off("receiveMessage", onNewMessage);
    socket.on("userTyping", handleTyping);
    socket.on("receiveMessage", onNewMessage);
    socket.on("messagesRead", onMessagesRead);

    return () => {
      socket.off("receiveMessage", onNewMessage);
      socket.off("userTyping", handleTyping);
      socket.off("messagesRead", onMessagesRead);
      if (!selectedUser?.type || selectedUser.type !== "group") {
        socket.emit("leaveRoom", { conversationId: chatId });
      }
    };
  }, [chatId, currentUserId, selectedUser]);
  const handleTyping = (value: string) => {
    setText(value);

    if (!socketRef.current?.connected) return;

    const payload: { isTyping: boolean; groupId?: string; conversationId?: string } = { isTyping: value.length > 0 };
    if (selectedUser?.type === "group") {
      payload.groupId = chatId;
    } else {
      payload.conversationId = chatId;
    }

    socketRef.current.emit("typing", payload);

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    if (value.length > 0) {
      typingTimeoutRef.current = setTimeout(() => {
        socketRef.current?.emit("typing", { ...payload, isTyping: false });
      }, 2000);
    }
  };
  const scrollToBottom = () => {
    setTimeout(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 50);
  };
  const sendMessage = () => {
    if (!text.trim() || !socketRef.current?.connected) return;

    const payload: { content: string; groupId?: string; conversationId?: string } = { content: text };

    // Determine if this is a group or direct message
    if (selectedUser?.type === "group") {
      payload.groupId = chatId;
    } else {
      payload.conversationId = chatId;
    }

    // Optimistically add message? No, wait for server ack usually, but for speed we can.
    // However, existing logic waits for 'receiveMessage' from server (via broadcast or direct emit).
    socketRef.current?.emit("sendMessage", payload);
    setText("");
  };

  return {
    messages,
    text,
    setText,
    sendMessage,
    scrollRef,
    typingUsers,
    handleTyping,
  };
};
