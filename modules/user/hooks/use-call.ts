
import { useRef, useEffect, useState, useCallback } from "react";
import Peer from "simple-peer";
import { getSocket } from "@/lib/socket";
import { useCallStore } from "@/store/useCallStore";

export const useCall = (
  currentUserId: string | undefined,
  partnerUserId: string | undefined,
  conversationId: string
) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [localCallAccepted, setLocalCallAccepted] = useState(false);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const myVideo = useRef<HTMLVideoElement>(null);
  const partnerVideo = useRef<HTMLVideoElement>(null);
  const peerRef = useRef<Peer.Instance | null>(null);
  const socket = getSocket();

  const iceServers = [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
    {
      urls: "turn:open-relay.metered.ca:443",
      username: "openrelayproject",
      credential: "openrelayproject",
    },
  ];

  // use-call.ts (Place this before the endCall function)

  const toggleMic = useCallback(() => {
    if (!stream) return;

    // Find the audio track and toggle its 'enabled' property
    const audioTrack = stream.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      setIsMicMuted(!audioTrack.enabled); // Update state based on new status
    }
  }, [stream]);

  const toggleVideo = useCallback(() => {
    if (!stream) return;

    // Find the video track and toggle its 'enabled' property
    const videoTrack = stream.getVideoTracks()[0];
    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled;
      setIsVideoOff(!videoTrack.enabled); // Update state based on new status
    }
  }, [stream]);

  // =========================================================================
  // End Call Logic (Wrapped in useCallback)
  // =========================================================================
  // const endCall = useCallback(() => {
  //   console.log("Ending call...");
  //   const { callerId: storeCallerId } = useCallStore.getState()
  //   const recipientId = storeCallerId || partnerUserId;
  //   if (recipientId) {
  //       // 5. Tell other user (if known)
  //       socket.emit("endCall", { toUserId: recipientId });
  //   }
  //   // 1. Destroy Peer connection
  //   if (peerRef.current) {
  //     peerRef.current.destroy();
  //     peerRef.current = null;
  //   }

  //   // 2. Clear video sources (Crucial for releasing hardware)
  //   if (myVideo.current) {
  //     myVideo.current.srcObject = null;
  //   }
  //   if (partnerVideo.current) {
  //     partnerVideo.current.srcObject = null;
  //   }

  //   // 3. Stop all media tracks (Turns off camera/mic light)
  //   if (stream) {
  //     stream.getTracks().forEach((track) => {
  //       track.stop();
  //       console.log("Track stopped:", track.kind);
  //     });
  //     setStream(null);
  //   }

  //   // 4. Reset states
  //   setCallEnded(true);
  //   setLocalCallAccepted(false);
  //   // setReceivingCall(false);
  //   // setCaller("");
  //   // setLocalCaller('')
  //   // setLocalCallerSignal(null)
  //   // setCallerSignal(null);
  //   useCallStore.getState().endCallUI()
  //   // 5. Tell other user (if known)
  //   socket.emit("endCall", { toUserId: localCaller || partnerUserId });
  // }, [stream,partnerUserId, socket]);
  // use-call.ts (inside hook)
  const endCall = useCallback(() => {
    // const {callerId,recipientId} = useCallStore()
    const callerId = useCallStore.getState().callerId;
    const recipientId = useCallStore.getState().recipientId;
    const partnerId = currentUserId === callerId ? recipientId : callerId;
    // const partnerId = currentUserId === callerId ? recipientId : callerId;
    // Determine who the other person is
    // let recipientId: string | undefined;

    // if (currentUserId && partnerUserId) {
    //   // Simple: the other person is the partnerUserId passed to this hook
    //   recipientId = partnerUserId;
    // }

    // // Signal end to the other user
    // if (recipientId) {
    //   socket.emit("endCall", { toUserId: recipientId });
    // }
    if (partnerId) {
      socket.emit("endCall", { toUserId: partnerId });
    }
    // Cleanup peer and streams
    if (peerRef.current) {
      peerRef.current.destroy();
      peerRef.current = null;
    }

    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }

    if (myVideo.current) myVideo.current.srcObject = null;
    if (partnerVideo.current) partnerVideo.current.srcObject = null;

    setCallAccepted(false)
    setCallEnded(true);
    setLocalCallAccepted(false);

    // Reset global UI
    useCallStore.getState().endCallUI();
  }, [currentUserId, socket, stream]);
  // END useCallback(endCall)
  // =========================================================================
  // NEW: Dedicated Effect for Local Video Display
  // =========================================================================

  useEffect(() => {
    // This runs whenever 'stream' is set (in startCall or acceptCall)
    // and ensures the video element is ready.
    if (myVideo.current && stream) {
      myVideo.current.srcObject = stream;
    }
  }, [stream, myVideo]); // Dependency on stream (and myVideo, though it's a stable ref)
  // =========================================================================

  // Start Call
  const startCall = async (callType: "video" | "audio") => {
    if (!partnerUserId || !currentUserId) {
      console.warn("Missing user IDs for call initiation.");
      return;
    }

    try {
      let userStream;
      try {
        userStream = await navigator.mediaDevices.getUserMedia({
          video: callType === "video",
          audio: true,
        });
      } catch (videoError) {
        console.warn("Failed to get video/audio stream, trying audio only", videoError);
        if (callType === "video") {
          userStream = await navigator.mediaDevices.getUserMedia({
            video: false,
            audio: true
          });
          alert("Video access failed. Switching to audio-only call.");
        } else {
          throw videoError;
        }
      }
      setStream(userStream);
      // setLocalCallAccepted(true)
      // useCallStore.getState().acceptCallUI(conversationId, currentUserId, callType);
      // ✅ FIX 1: Display local video immediately for the initiator
      if (myVideo.current) myVideo.current.srcObject = userStream;
      // setCallAccepted(true);

      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream: userStream,
        config: { iceServers },
      });

      peer.on("signal", (signal) => {
        socket.emit("startCall", {
          toUserId: partnerUserId,
          conversationId,
          callType,
          signalData: signal,
        });
      });

      // ✅ FIX 2: Ensure remote stream is correctly added
      peer.on("stream", (remoteStream) => {
        if (partnerVideo.current) {
          partnerVideo.current.srcObject = remoteStream;
        }
      });

      // CRITICAL: Save peer and listen for acceptance
      peerRef.current = peer;

      // Listen for acceptance (This listener is tied to this specific Peer instance)
      const handleCallAccepted = (data: { signal: Peer.SignalData }) => {
        // CallAccepted is already true from the initial setCallAccepted(true) above
        // setCallAccepted(true); // Don't need to set again
        setLocalCallAccepted(true)
        peer.signal(data.signal);
        socket.off("callAccepted", handleCallAccepted); // Remove listener after use
      };

      // We must listen on the global socket for the response
      socket.on("callAccepted", handleCallAccepted);
    } catch (err) {
      const error = err as Error;
      console.error("Media error:", error);
      // Reset call state if media access fails
      setCallAccepted(false);
      alert("Camera/Mic blocked: " + error.message);
    }
  }
  // Accept Call
  const acceptCall = async () => {
    const { callerId, callType, conversationId: storeConvoId, callerSignalData: currentSignalData } = useCallStore.getState();
    // const currentSignal = localCallerSignal;
    // if (!callerSignal) {
    //   alert("Call data missing!");
    //   return;
    // }
    if (!currentSignalData || !callerId || !callType || !storeConvoId) {
      alert("Call data missing from store or signal!");
      return;
    }
    setLocalCallAccepted(true);

    try {
      const hasVideo = callType === "video";

      let userStream;
      try {
        userStream = await navigator.mediaDevices.getUserMedia({
          video: hasVideo,
          audio: true,
        });
      } catch (videoError) {
        const vErr = videoError as DOMException;
        console.warn("Failed to get video/audio stream", vErr);

        // Handle specific errors
        if (vErr.name === 'NotReadableError') {
          alert("Camera/Mic is already in use by another application (or this one). Please close other apps and try again.");
        } else if (vErr.name === 'NotAllowedError') {
          alert("Camera/Mic permission denied. Please allow access in browser settings.");
        } else if (vErr.name === 'NotFoundError') {
          alert("No camera/mic found on this device.");
        }

        if (hasVideo) {
          try {
            // Fallback to audio only
            userStream = await navigator.mediaDevices.getUserMedia({
              video: false,
              audio: true
            });
            alert(`Video access failed (${vErr.name}). Switching to audio-only call.`);
          } catch (audioError) {
            const aErr = audioError as Error;
            console.error("Audio fallback also failed", aErr);
            throw videoError; // Throw original error if fallback fails
          }
        } else {
          throw videoError;
        }
      }

      setStream(userStream);
      if (myVideo.current) {
        myVideo.current.srcObject = userStream;
      }

      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream: userStream,
        config: { iceServers },
      });

      peer.on("signal", (signal) => {
        if (partnerUserId === currentUserId) return; // safety
        socket.emit("acceptCall", {
          callerId: callerId,
          signal,
        });
      });

      // ✅ FIX 2: Ensure remote stream is correctly added
      peer.on("stream", (remoteStream) => {
        if (partnerVideo.current) {
          partnerVideo.current.srcObject = remoteStream;
        }
      });

      peer.signal(currentSignalData as Peer.SignalData);

      peerRef.current = peer;
      useCallStore.getState().acceptCallUI(storeConvoId, callerId, callType);
    } catch (err) {
      const error = err as Error;
      console.error("Camera/Mic Error:", error);
      // Reset call state if media access fails
      setCallAccepted(false);
      alert(`Please allow camera & mic: ${error.message}`);
    }
  };

  // =========================================================================
  // Socket Listeners (Using stable endCall)
  // =========================================================================
  // useEffect(() => {
  //     const handleIncomingCall = (data: any) => {
  //       console.log("Incoming call from:", data);

  //       // 🚨 NEW: Store signal data locally for 'acceptCall' reference
  //       // setLocalCaller(data.from);
  //       // setLocalCallerSignal(data);
  //       if (data.from === currentUserId) {
  //       console.log("Ignoring my own incoming call event");
  //       return;
  //     }
  //       // 🚨 NEW: Update global store (triggers CallNotificationManager UI)
  //       useCallStore.getState().setIncomingCall({
  //         callerId: data.from,
  //         conversationId: data.conversationId,
  //         callType: data.callType,
  //         signalData: data.signalData,
  //       });
  //     };

  //     socket.on("incomingCall", handleIncomingCall);
  //     socket.on("callEnded", endCall);

  //     return () => {
  //       socket.off("incomingCall", handleIncomingCall);
  //       socket.off("callAccepted");
  //       socket.off("callEnded", endCall);
  //     };
  //   }, [socket, endCall]);
  // ADD THIS INSIDE useCall hook — this is the ONLY thing that was missing
  useEffect(() => {
    const handleRemoteEnd = () => {
      endCall(); // ← This stops camera, destroys peer, clears video
    };

    socket.on("callEnded", handleRemoteEnd);

    return () => {
      socket.off("callEnded", handleRemoteEnd);
    };
  }, [socket, endCall]);

  // Cleanup media on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);
  return {
    myVideo,
    partnerVideo,
    startCall,
    acceptCall,
    endCall,
    // receivingCall,
    // caller,
    callAccepted: localCallAccepted,
    callEnded,
    // callerSignal,
    isMicMuted,
    isVideoOff,
    toggleMic,
    toggleVideo,
  };
};
