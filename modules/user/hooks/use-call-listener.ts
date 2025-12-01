// src/hooks/use-call-listeners.ts

import { useEffect, useCallback } from "react";
import { getSocket } from "@/lib/socket";
import { useCallStore } from "@/store/useCallStore";

export const useCallListeners = (currentUserId: string | undefined) => {
  const socket = getSocket();
  const endCallUI = useCallStore.getState().endCallUI;
  console.log(socket,'sockertttttttt')
  console.log(endCallUI,'endCallluiiii')
  // We need a stable function to handle call end, as it's a global socket event
  const handleCallEnded = useCallback(() => {
    console.log("Global: Call ended by partner or locally.");
    // This calls the store action to reset the state
    endCallUI(); 
  }, [endCallUI]); // Dependency on stable store action

  useEffect(() => {
    console.log(currentUserId,'------------currentUserId------------------------')
    if (!currentUserId) return; // Wait for user to be authenticated
    console.log('==========================handlkngnIncoming calll nte munnye=============');
    
    const handleIncomingCall = (data: any) => {
      console.log("Global: Incoming call event received:", data);
      console.log(data.from,'***********data fromm.....and ',currentUserId,'cucusudfcsdf**********')
      // Safety check: Don't notify if the caller is me
      if (data.from === currentUserId) {
        console.log("Global: Ignoring my own incoming call event.");
        return;
      }
      console.log("============if condition kahinj verunod myraaaaa=============")
      
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
    };
  }, [socket, currentUserId, handleCallEnded]);
}