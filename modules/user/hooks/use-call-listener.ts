// src/hooks/use-call-listeners.ts

import { useEffect, useCallback } from "react";
import { getSocket } from "@/lib/socket";
import { useCallStore } from "@/store/useCallStore";

export const useCallListeners = (currentUserId: string | undefined) => {
  const socket = getSocket();
  const endCallUI = useCallStore.getState().endCallUI;


  // We need a stable function to handle call end, as it's a global socket event
  const handleCallEnded = useCallback(() => {
    // This calls the store action to reset the state
    endCallUI();
  }, [endCallUI]); // Dependency on stable store action

  useEffect(() => {
    if (!currentUserId) return; // Wait for user to be authenticated

    const handleIncomingCall = (data: { from: string; conversationId: string; callType: 'video' | 'audio'; signalData: unknown }) => {
      // Safety check: Don't notify if the caller is me
      if (data.from === currentUserId) {
        return;
      }

      // CRITICAL: Update global store to show the notification
      useCallStore.getState().setIncomingCall({
        callerId: data.from,
        conversationId: data.conversationId,
        callType: data.callType,
        signalData: data.signalData,
      });
    };

    // Register GLOBAL listeners
    socket.on("incomingCall", handleIncomingCall);
    socket.on("callEnded", handleCallEnded); // Re-use stable endCall logic

    return () => {
      // Clean up GLOBAL listeners when the component unmounts
      socket.off("incomingCall", handleIncomingCall);
      socket.off("callEnded", handleCallEnded);
      socket.off("callRejected", handleCallEnded); // Reuse end logic
    };
  }, [socket, currentUserId, handleCallEnded]);

  useEffect(() => {
    socket.on("callRejected", handleCallEnded);
    return () => {
      socket.off("callRejected", handleCallEnded);
    }
  }, [socket, handleCallEnded])
}