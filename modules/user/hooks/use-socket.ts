"use client";

import { useEffect, useRef, useState } from "react";
import api from "@/lib/api";
import { getSocket } from "@/lib/socket";

type Message = {
  id: string;
  content: string;
  conversationId: string | null;
  groupId: string | null;
  senderId: string;
  createdAt: string;
};

export const useSocket = (
  chatId: string,
  selectedUser: any,
  currentUserId?: string
) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const formatTime = (date: any) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };
  const socketRef = useRef<any>(null); // ✅ store socket globally for this hook
  const joinedRoomsRef = useRef<Set<string>>(new Set());
  // 🔹 Fetch old messages and join the room
  // useEffect(() => {
  //   const socket = getSocket();
  //   socketRef.current = socket; // ✅ assign it here

  //   if (!conversationId) {
  //     console.log("conversation id is not created yet");
  //     return;
  //   }

  //   const fetchMessages = async () => {
  //     try {
  //       const res = await api.get(`/messages/${conversationId}`);
  //         setMessages(res.data || []);
  //         scrollToBottom();
  //     } catch (err) {
  //       console.error("Failed to fetch messages:", err);
  //     }
  //   };

  //   fetchMessages();

  //   // 🔹 Join the specific chat room
  //   socket.emit("joinRoom", { conversationId });
  //   console.log(`[Socket] Joined room: ${conversationId}`);

  //   // 🔹 Define the message listener
  //   const onNewMessage = (msg: Message) => {
  //     if (msg.conversationId === conversationId) {
  //       setMessages((prev) =>
  //         prev.find((m) => m.id === msg.id) ? prev : [...prev, msg]
  //       );
  //       scrollToBottom();
  //     }
  //   };

  //   socket.off("receiveMessage", onNewMessage);
  //   socket.on("receiveMessage", onNewMessage);

  //   console.log("Listeners count:", socket.listeners("receiveMessage").length);

  //   return () => {
  //     socket.emit("leaveRoom", { conversationId });
  //     socket.off("receiveMessage", onNewMessage);
  //     console.log(`[Socket] Left room: ${conversationId}`);
  //   };
  // }, [conversationId]);
  //..........................useEffect.......
  // useEffect(() => {
  //   console.log("useeffect ethre");

  //   const socket = getSocket();
  //   if (!socketRef.current) {
  //     socketRef.current = socket;
  //   }

  //   if (!conversationId) return;

  //   // Avoid duplicate listener setup
  //   const onNewMessage = (msg: Message) => {
  //     console.log('[Socket] onNewMessage received:', msg);
  //     if (msg.conversationId === conversationId) {
  //       setMessages((prev) =>
  //         prev.find((m) => m.id === msg.id) ? prev : [...prev, msg]
  //       );
  //       scrollToBottom();
  //     }
  //   };
  //   socket.on("receiveMessage", onNewMessage);
  //   const fetchMessages = async () => {
  //     try {
  //       const res = await api.get(`/messages/${conversationId}`);
  //       setMessages(res.data || []);
  //       scrollToBottom();
  //       socket.emit("joinRoom", { conversationId });
  //       console.log(`[Socket] Joined room: ${conversationId}`)
  //     } catch (err) {
  //       console.error("Failed to fetch messages:", err);
  //     }
  //   };

  //   fetchMessages();

  //   // ✅ Join room only once

  //   console.log("Listeners count:", socket.listeners("receiveMessage").length);

  //   return () => {
  //     socket.off("receiveMessage",onNewMessage);
  //     socket.emit("leaveRoom", { conversationId });
  //     socket.off("receiveMessage", onNewMessage);
  //     console.log(`[Socket] Left room: ${conversationId}`);
  //   };
  // }, [conversationId]);
  //.............................
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
      console.log(`[Client] Joined direct chat: ${chatId}`);
    } else {
      console.log(`[Client] Group chat ${chatId} → already joined server-side`);
    }
    const fetchMessages = async () => {
      try {
        // This endpoint works for both! (you already have it)
        const res = await api.get(`/messages/${chatId}`);
        setMessages(res.data || []);
        scrollToBottom();
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      }
    };

    fetchMessages();

    const onNewMessage = (msg: Message) => {
      // Accept message if it belongs to this chat (either conversationId or groupId matches)
      if (msg.conversationId === chatId || msg.groupId === chatId) {
        setMessages((prev) =>
          prev.some((m) => m.id === msg.id) ? prev : [...prev, msg]
        );
        scrollToBottom();
      }
    };
    // socket.off("receiveMessage", onNewMessage);
    socket.on("receiveMessage", onNewMessage);

    return () => {
       socket.off("receiveMessage", onNewMessage);
      if (!selectedUser?.type || selectedUser.type !== "group") {
      socket.emit("leaveRoom", { conversationId: chatId });
    }
    };
  }, [chatId]);
  // 🔹 Scroll helper
  const scrollToBottom = () => {
    setTimeout(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 50);
  };

  // 🔹 Send message safely
  // const sendMessage = () => {
  //   if (!text.trim()) return;

  //   // const socket = socketRef.current; // ✅ use socket from ref

  //   // if (!socket) {
  //   //   console.error("Socket not connected yet");
  //   //   return;
  //   // }
  //   if (!socketRef.current?.connected) return;
  //   console.log(`[Socket] Sending message:`, text);
  //   // socket.emit("sendMessage", { conversationId, content: text });
  //   socketRef.current.emit("sendMessage", { conversationId, content: text });
  //   setText("");
  // };
  const sendMessage = () => {
    if (!text.trim() || !socketRef.current?.connected) return;

    const payload: any = { content: text };

    // Determine if this is a group or direct message
    if (selectedUser?.type === "group") {
      payload.groupId = chatId;
    } else {
      payload.conversationId = chatId;
    }

    socketRef.current.emit("sendMessage", payload);
    setText("");
  };

  return { messages, text, setText, sendMessage, scrollRef };
};
