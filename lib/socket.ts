// lib/socket.ts
// import { io, Socket } from "socket.io-client";

// let socket: Socket | null = null;
// export function getSocket() {
//   if (socket && socket.connected) return socket;
//   if (!socket) {
//     socket = io(process.env.NEXT_PUBLIC_WS_URL || "http://localhost:3005", {
//       path: "/ws",
//       withCredentials: true, 
//       autoConnect: true,
//     });
//       socket.on("connect", () => {
//       console.log("[lib/socket] Connected:", socket?.id);
//     });

//     socket.on("disconnect", () => {
//       console.log("[lib/socket] Disconnected");
//     });
//   }
//   console.log("Socket created or reused:", !!socket, socket?.id);
  
//   return socket;
// }

//;....
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const getSocket = (): Socket => {
  if (!socket || !socket.connected) {
    socket = io(process.env.NEXT_PUBLIC_WS_URL!, {
      path: "/ws",
      withCredentials:true,
      transports:['websocket'],
      autoConnect:true
    });

    socket.on("connect", () => {
      console.log("Socket connected:", socket?.id);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });
  }else{
    console.log("Reusing existing socket:", socket.id);
  }
  return socket;
};
