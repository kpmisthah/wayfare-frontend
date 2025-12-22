
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
    });

    socket.on("disconnect", () => {
    });
  }else{
  }
  return socket;
};
