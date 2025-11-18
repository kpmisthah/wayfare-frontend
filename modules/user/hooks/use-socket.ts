// "use client";
// import { useEffect, useRef, useState } from "react";
// import api from "@/lib/api";
// import io, { Socket } from "socket.io-client";
// import { getSocket } from "@/lib/socket";

// type Message = {
//   id?: string;
//   conversationId: string;
//   senderId: string|undefined;
//   content: string;
//   createdAt?: string;
// };
// export const useSocket = (conversationId: string, currentUserId: string|undefined) => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [text, setText] = useState("");
//   const socketRef = useRef<Socket | null>(null);
//   const scrollRef = useRef<HTMLDivElement | null>(null);
//   const socket = getSocket();
//   useEffect(() => {
//     // Fetch history
//     const fetchMessages = async () => {
//       const res = await api.get(`/messages/${conversationId}`);
//       console.log(res.data,'in fetch userSocket hook')
//       setMessages(res.data || []);
//       scrollToBottom();
//     };
//     fetchMessages();

    // Connect socket
    // const socket = io(
    //   process.env.NEXT_PUBLIC_WS_URL || "http://localhost:3005",
    //   {
    //     path: "/ws",
    //     withCredentials:true
    //   }
    // );
    // socketRef.current = socket;

    // socket.on("connect", () => {
    //   socket.emit("joinRoom", { conversationId });
    // });

    // socket.on("receiveMessage", (msg: Message) => {
    //   setMessages((prev) => [...prev, msg]);
    //   scrollToBottom();
    // });

    // socket.on("joined", () => {
    //   // joined room ack
    // });
    // socket.off("receiveMessage");
  //   socket.emit("joinRoom", { conversationId });
  //   const onNewMessage = (msg: Message) => {
  //     setMessages((prev) => [...prev, msg]);
  //     scrollToBottom();
  //   };
  //   socket.on("receiveMessage", onNewMessage);
  //   return () => {
  //     socket.emit("leaveRoom", { conversationId });
  //     socket.off("receiveMessage", onNewMessage);
  //   };
  // }, [conversationId]);

  // const scrollToBottom = () => {
  //   setTimeout(() => {
  //     scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  //   }, 50);
  // };

  // const sendMessage = async () => {
  //   if (!text.trim()) return;

    // const tempMsg: Message = {
    //   conversationId,
    //   senderId: currentUserId,
    //   content: text,
    //   createdAt: new Date().toISOString(),
    // };

    // Optimistic UI
    // setMessages((prev) => [...prev, tempMsg]);
    // setText("");
    // scrollToBottom();

    // Send via socket
    // socketRef.current?.emit("sendMessage", tempMsg);
    // socket.emit("sendMessage", { conversationId, content: tempMsg.content });
    // socket.emit("sendMessage", { conversationId, content: text });
    // setText("");
    // Note: server will broadcast saved message with id/createdAt; you might want to replace the optimistic message
  // };

//   return {
//     messages,
//     text,
//     scrollRef,
//     setText,
//     setMessages,
//     sendMessage,
//   };
// };
// hooks/useSocket.ts
// useSocket.ts
//.............
"use client";

import { useEffect, useRef, useState } from "react";
import api from "@/lib/api";
import { getSocket } from "@/lib/socket";

type Message = {
  id?: string;
  conversationId: string;
  senderId?: string;
  content: string;
  createdAt?: string;
};

export const useSocket = (conversationId: string, currentUserId?: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);
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
useEffect(() => {
  console.log("useeffect ethre");
  
  const socket = getSocket();
  if (!socketRef.current) {
    socketRef.current = socket;
  }

  if (!conversationId) return;

  // ✅ Avoid duplicate listener setup
  const onNewMessage = (msg: Message) => {
    console.log('[Socket] onNewMessage received:', msg); 
    if (msg.conversationId === conversationId) {
      setMessages((prev) =>
        prev.find((m) => m.id === msg.id) ? prev : [...prev, msg]
      );
      scrollToBottom();
    }
  };
  socket.on("receiveMessage", onNewMessage);
  const fetchMessages = async () => {
    try {
      const res = await api.get(`/messages/${conversationId}`);
      setMessages(res.data || []);
      scrollToBottom();
      socket.emit("joinRoom", { conversationId });
      console.log(`[Socket] Joined room: ${conversationId}`)
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    }
  };

  fetchMessages();

  // ✅ Join room only once
  
  console.log("Listeners count:", socket.listeners("receiveMessage").length);

  return () => {
    socket.off("receiveMessage",onNewMessage);
    socket.emit("leaveRoom", { conversationId });
    socket.off("receiveMessage", onNewMessage);
    console.log(`[Socket] Left room: ${conversationId}`);
  };
}, [conversationId]);

  // 🔹 Scroll helper
  const scrollToBottom = () => {
    setTimeout(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 50);
  };

  // 🔹 Send message safely
  const sendMessage = () => {
    if (!text.trim()) return;

    // const socket = socketRef.current; // ✅ use socket from ref

    // if (!socket) {
    //   console.error("Socket not connected yet");
    //   return;
    // }
    if (!socketRef.current?.connected) return;
    console.log(`[Socket] Sending message:`, text);
    // socket.emit("sendMessage", { conversationId, content: text });
    socketRef.current.emit("sendMessage", { conversationId, content: text });
    setText("");
  };

  return { messages, text, setText, sendMessage, scrollRef };
};
