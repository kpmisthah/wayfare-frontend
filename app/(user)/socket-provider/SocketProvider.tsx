// components/SocketProvider.tsx (client component)
// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { getSocket } from "@/lib/socket";

// export function SocketProvider({ children }: { children: React.ReactNode }) {
//   const router = useRouter();
//   // const socket = getSocket();
//   const [notifications, setNotifications] = useState<any[]>([]);
//   const [unreadMap, setUnreadMap] = useState<Record<string, number>>({});

//   useEffect(() => {
//     socket.on("connect", () => console.log("socket connected", socket.id));

//     socket.on("connectionAcceptedNotification", (payload) => {
//       // DON'T redirect. Show toast / add notification to list
//       setNotifications((prev) => [...prev, { type: "accepted", ...payload }]);
//       // Optionally add chat to UI list (so user sees a chat entry)
//       // Optionally mark unread 0 (no messages yet)
//     });

//     socket.on("newMessageNotification", (payload) => {
//       // payload: { conversationId, messagePreview, from }
//       setUnreadMap((prev) => ({
//         ...prev,
//         [payload.conversationId]: (prev[payload.conversationId] || 0) + 1,
//       }));
//       // optionally show toast
//     });
//     console.log("Global listeners:", {
//       connectionAccepted: socket.listeners("connectionAcceptedNotification")
//         .length,
//       newMessage: socket.listeners("newMessageNotification").length,
//     });

//     return () => {
//       socket.off("connectionAcceptedNotification");
//       socket.off("newMessageNotification");
//     };
//   }, []);

//   return <>{children}</>;
// }
