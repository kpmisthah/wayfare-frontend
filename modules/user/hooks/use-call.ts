// import { useRef, useEffect, useState, useCallback } from "react";
// import Peer from "simple-peer";
// import { getSocket } from "@/lib/socket";

// export const useCall = (
//   currentUserId: string | undefined,
//   partnerUserId: string | undefined,
//   conversationId: string
// ) => {
//   const [stream, setStream] = useState<MediaStream | null>(null);
//   const [receivingCall, setReceivingCall] = useState(false);
//   const [caller, setCaller] = useState("");
//   const [callerSignal, setCallerSignal] = useState<any>(null);
//   const [callAccepted, setCallAccepted] = useState(false);
//   const [callEnded, setCallEnded] = useState(false);

//   const myVideo = useRef<HTMLVideoElement>(null);
//   const partnerVideo = useRef<HTMLVideoElement>(null);
//   const peerRef = useRef<Peer.Instance | null>(null);
//   const socket = getSocket();

//   const iceServers = [
//     { urls: "stun:stun.l.google.com:19302" },
//     { urls: "stun:stun1.l.google.com:19302" },
//     {
//       urls: "turn:open-relay.metered.ca:443",
//       username: "openrelayproject",
//       credential: "openrelayproject",
//     },
//   ];

//   // Start Call
//   const startCall = async (callType: "video" | "audio") => {
//     if (!partnerUserId || !currentUserId) return;

//     try {
//       const userStream = await navigator.mediaDevices.getUserMedia({
//         video: callType === "video",
//         audio: true,
//       });
//       setStream(userStream);
//       if (myVideo.current) myVideo.current.srcObject = userStream;
//       setCallAccepted(true);
//       const peer = new Peer({
//         initiator: true,
//         trickle: false,
//         stream: userStream,
//         config: { iceServers },
//       });

//       peer.on("signal", (signal) => {
//         socket.emit("startCall", {
//           toUserId: partnerUserId,
//           conversationId,
//           callType,
//           signalData: signal,
//         });
//       });

//       peer.on("stream", (remoteStream) => {
//         console.log("REMOTE STREAM RECEIVED!");
//         if (partnerVideo.current) {
//           partnerVideo.current.srcObject = remoteStream;
//         }
//       });

//       // CRITICAL: Save peer and listen for acceptance
//       peerRef.current = peer;

//       socket.on("callAccepted", (data) => {
//         console.log("Call accepted, connecting peer...");
//         setCallAccepted(true);
//         peer.signal(data.signal);
//       });
//     } catch (err: any) {
//       console.error("Media error:", err);
//       alert("Camera/Mic blocked: " + err.message);
//     }
//   };

//   // Accept Call
//   const acceptCall = async () => {
//     if (!callerSignal) {
//       alert("Call data missing!");
//       return;
//     }

//     setCallAccepted(true);

//     try {
//       const hasVideo = callerSignal.callType === "video";
//       console.log("Accepting call with video:", hasVideo);

//       const userStream = await navigator.mediaDevices.getUserMedia({
//         video: hasVideo,
//         audio: true,
//       });

//       setStream(userStream);
//       if (myVideo.current) {
//         myVideo.current.srcObject = userStream;
//       }

//       const peer = new Peer({
//         initiator: false,
//         trickle: false,
//         stream: userStream,
//         config: { iceServers },
//       });

//       peer.on("signal", (signal) => {
//         socket.emit("acceptCall", {
//           callerId: caller,
//           signal,
//         });
//       });

//       peer.on("stream", (remoteStream) => {
//         console.log("PARTNER VIDEO RECEIVED!");
//         if (partnerVideo.current) {
//           partnerVideo.current.srcObject = remoteStream;
//         }
//       });

//       // THIS IS THE MOST IMPORTANT LINE
//       peer.signal(callerSignal.signalData);

//       peerRef.current = peer;
//     } catch (err: any) {
//       console.error("Camera/Mic Error:", err);
//       alert(`Please allow camera & mic: ${err.message}`);
//     }
//   };

//   // End Call
//   // const endCall = () => {
//   //   // DESTROY PEER
//   //   if (peerRef.current) {
//   //     peerRef.current.destroy();
//   //     peerRef.current = null;
//   //   }
//   //   if (myVideo.current) {
//   //     myVideo.current.srcObject = null;
//   //   }
//   //   if (partnerVideo.current) {
//   //     partnerVideo.current.srcObject = null;
//   //   }
//   //   // STOP ALL CAMERA & MIC TRACKS (THIS KILLS THE LIGHT!)
//   //   if (stream) {
//   //     stream.getTracks().forEach((track) => {
//   //       track.stop(); // ← THIS TURNS OFF CAMERA LIGHT
//   //       console.log("Track stopped:", track.kind);
//   //     });
//   //     setStream(null);
//   //   }

//   //   // Reset states
//   //   setCallEnded(true);
//   //   setCallAccepted(false);
//   //   setReceivingCall(false);

//   //   // Tell other user
//   //   socket.emit("endCall", { toUserId: caller || partnerUserId });
//   // };

//   // use-call.ts: Replace the existing endCall function with this:
// const endCall = useCallback(() => {
//   // DESTROY PEER
//   if (peerRef.current) {
//     peerRef.current.destroy();
//     peerRef.current = null;
//   }

//   // Clear video sources
//   if (myVideo.current) {
//     myVideo.current.srcObject = null;
//   }
//   if (partnerVideo.current) {
//     partnerVideo.current.srcObject = null;
//   }

//   // STOP ALL CAMERA & MIC TRACKS (THIS KILLS THE LIGHT!)
//   if (stream) {
//     stream.getTracks().forEach((track) => {
//       track.stop(); // ← THIS TURNS OFF CAMERA LIGHT
//       console.log("Track stopped:", track.kind);
//     });
//     setStream(null);
//   }

//   // Reset states
//   setCallEnded(true);
//   setCallAccepted(false);
//   setReceivingCall(false);

//   // Tell other user
//   // Note: use the current value of 'caller' and 'partnerUserId'
//   socket.emit("endCall", { toUserId: caller || partnerUserId });
// }, [stream, caller, partnerUserId, socket]); // Add dependencies
//   // Listen for incoming calls
//   useEffect(() => {
//     socket.on("incomingCall", (data) => {
//       console.log("Incoming call from:", data);
//       setReceivingCall(true);
//       setCaller(data.from);
//       setCallerSignal(data);
//     });

//     // socket.on("callEnded", () => {
//     //   endCall();
//     // });
// socket.on("callEnded", endCall);
//     return () => {
//       socket.off("incomingCall");
//       socket.off("callAccepted");
//       socket.off("callEnded");
//     };
//   }, [socket,endCall]);

//   return {
//     myVideo,
//     partnerVideo,
//     startCall,
//     acceptCall,
//     endCall,
//     receivingCall,
//     caller,
//     callAccepted,
//     callEnded,
//     callerSignal,
//   };
// };
//Last implement aakkyeee
//................
// hooks/useCall.ts — FINAL 100% WORKING VERSION
// import { useRef, useEffect, useState, useCallback } from "react";
// import Peer from "simple-peer";
// import { getSocket } from "@/lib/socket";

// export const useCall = (
//   currentUserId: string | undefined,
//   partnerUserId: string | undefined,
//   conversationId: string
// ) => {
//   const [stream, setStream] = useState<MediaStream | null>(null);
//   const [receivingCall, setReceivingCall] = useState(false);
//   const [caller, setCaller] = useState("");
//   const [callerSignal, setCallerSignal] = useState<any>(null);
//   const [callAccepted, setCallAccepted] = useState(false);
//   const [callEnded, setCallEnded] = useState(false);

//   const myVideo = useRef<HTMLVideoElement>(null);
//   const partnerVideo = useRef<HTMLVideoElement>(null);
//   const peerRef = useRef<Peer.Instance | null>(null);
//   const socket = getSocket();

//   const iceServers = [
//     { urls: "stun:stun.l.google.com:19302" },
//     { urls: "stun:stun1.l.google.com:19302" },
//     {
//       urls: "turn:open-relay.metered.ca:443",
//       username: "openrelayproject",
//       credential: "openrelayproject",
//     },
//   ];

//   // CLEANUP: Destroy old peer + stop tracks
//   const destroyPeer = useCallback(() => {
//     if (peerRef.current) {
//       peerRef.current.destroy();
//       peerRef.current = null;
//     }
//     if (stream) {
//       stream.getTracks().forEach(t => t.stop());
//       setStream(null);
//     }
//   }, [stream]);

//   // END CALL — FULL CLEANUP
//   const endCall = useCallback(() => {
//     destroyPeer();
//     setCallAccepted(false);
//     setCallEnded(true);
//     setReceivingCall(false);
//     setCaller("");
//     setCallerSignal(null);
//     socket.emit("endCall", { toUserId: partnerUserId });
//   }, [destroyPeer, socket, partnerUserId]);

//   // START CALL
//   const startCall = async (callType: "video" | "audio") => {
//     if (!partnerUserId || !currentUserId) return;

//     destroyPeer(); // Kill any old call

//     try {
//       const userStream = await navigator.mediaDevices.getUserMedia({
//         video: callType === "video" ? { width: 640, height: 480 } : false,
//         audio: true,
//       });

//       setStream(userStream);
//       if (myVideo.current) myVideo.current.srcObject = userStream;

//       const peer = new Peer({
//         initiator: true,
//         trickle: false,
//         stream: userStream,
//         config: { iceServers },
//       });

//       peer.on("signal", (signal) => {
//         socket.emit("startCall", {
//           toUserId: partnerUserId,
//           conversationId,
//           callType,
//           signalData: signal,
//         });
//       });

//       peer.on("stream", (remoteStream) => {
//         if (partnerVideo.current) {
//           partnerVideo.current.srcObject = remoteStream;
//         }
//       });

//       socket.once("callAccepted", ({ signal }) => {
//         setCallAccepted(true);
//         peer.signal(signal);
//       });

//       peerRef.current = peer;
//     } catch (err: any) {
//       alert("Camera/Mic error: " + err.message);
//     }
//   };

//   // ACCEPT CALL
//   const acceptCall = async () => {
//     if (!callerSignal) return;

//     setCallAccepted(true);
//     destroyPeer();

//     try {
//       const hasVideo = callerSignal.callType === "video";
//       const userStream = await navigator.mediaDevices.getUserMedia({
//         video: hasVideo ? { width: 640, height: 480 } : false,
//         audio: true,
//       });

//       setStream(userStream);
//       if (myVideo.current) myVideo.current.srcObject = userStream;

//       const peer = new Peer({
//         initiator: false,
//         trickle: false,
//         stream: userStream,
//         config: { iceServers },
//       });

//       peer.on("signal", (signal) => {
//         socket.emit("acceptCall", { callerId: caller, signal });
//       });

//       peer.on("stream", (remoteStream) => {
//         if (partnerVideo.current) {
//           partnerVideo.current.srcObject = remoteStream;
//         }
//       });

//       peer.signal(callerSignal.signalData);
//       peerRef.current = peer;
//     } catch (err: any) {
//       alert("Error: " + err.message);
//     }
//   };

//   // LISTEN FOR CALLS
//   useEffect(() => {
//     socket.on("incomingCall", (data) => {
//       setReceivingCall(true);
//       setCaller(data.from);
//       setCallerSignal(data);
//     });

//     socket.on("callEnded", endCall);

//     return () => {
//       socket.off("incomingCall");
//       socket.off("callAccepted");
//       socket.off("callEnded");
//       destroyPeer();
//     };
//   }, [socket, endCall, destroyPeer]);

//   // AUTO ASSIGN STREAM TO MY VIDEO WHEN IT CHANGES
//   useEffect(() => {
//     if (myVideo.current && stream) {
//       myVideo.current.srcObject = stream;
//     }
//   }, [stream]);

//   return {
//     myVideo,
//     partnerVideo,
//     startCall,
//     acceptCall,
//     endCall,
//     receivingCall,
//     caller,
//     callerSignal,
//     callAccepted,
//     callEnded,
//     stream
//   };
// };
///..........................athinte munne aakyee.....

import { useRef, useEffect, useState, useCallback } from "react";
import Peer from "simple-peer";
import { getSocket } from "@/lib/socket";
import { useCallStore } from "@/store/useCallStore";

export const useCall = (
  currentUserId: string | undefined,
  partnerUserId: string | undefined,
  conversationId: string
) => {
  console.log('-----------------------<>',currentUserId,'currentuserId in uswe-call','partnerUserId',conversationId,'conversationId------------------------------------------->')
  const [stream, setStream] = useState<MediaStream | null>(null);
  // const [receivingCall, setReceivingCall] = useState(false);
  // const [caller, setCaller] = useState("");
  // const [callerSignal, setCallerSignal] = useState<any>(null);
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  // We keep these states local to this specific hook instance:
  // const [localCaller, setLocalCaller] = useState("");
  // const [localCallerSignal, setLocalCallerSignal] = useState<any>(null);
  const [localCallAccepted, setLocalCallAccepted] = useState(false); // Used internally for peer logic
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
  console.log("Ending call locally...");
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
}, [currentUserId,socket, stream]);
  // END useCallback(endCall)
  // =========================================================================
  // NEW: Dedicated Effect for Local Video Display
  // =========================================================================

  useEffect(() => {
    // This runs whenever 'stream' is set (in startCall or acceptCall)
    // and ensures the video element is ready.
    if (myVideo.current && stream) {
      console.log("Setting local video srcObject.");
      myVideo.current.srcObject = stream;
    }
  }, [stream, myVideo]); // Dependency on stream (and myVideo, though it's a stable ref)
  // =========================================================================

  // Start Call
  const startCall = async (callType: "video" | "audio") => {
    console.log(partnerUserId,'.........parntnerUserId.........',currentUserId,'....currentUserIddddddd in use-call.ts......')
    if (!partnerUserId || !currentUserId) {
      console.warn("Missing user IDs for call initiation.");
      return;
    }

    try {
      const userStream = await navigator.mediaDevices.getUserMedia({
        video: callType === "video",
        audio: true,
      });
      console.log(userStream,'==============userStreaammmmmm=====');
      setStream(userStream);
      // setLocalCallAccepted(true)
      useCallStore.getState().acceptCallUI(conversationId, currentUserId, callType);
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
        console.log("REMOTE STREAM RECEIVED!");
        if (partnerVideo.current) {
          partnerVideo.current.srcObject = remoteStream;
        }
      });

      // CRITICAL: Save peer and listen for acceptance
      peerRef.current = peer;

      // Listen for acceptance (This listener is tied to this specific Peer instance)
      const handleCallAccepted = (data: { signal: any }) => {
        console.log("Call accepted, connecting peer...");
        // CallAccepted is already true from the initial setCallAccepted(true) above
        // setCallAccepted(true); // Don't need to set again
        setLocalCallAccepted(true)
        peer.signal(data.signal);
        socket.off("callAccepted", handleCallAccepted); // Remove listener after use
      };

      // We must listen on the global socket for the response
      socket.on("callAccepted", handleCallAccepted);
    } catch (err: any) {
      console.error("Media error:", err);
      // Reset call state if media access fails
      setCallAccepted(false);
      alert("Camera/Mic blocked: " + err.message);
    }
  }
  // Accept Call
  const acceptCall = async () => {
    const { callerId, callType, conversationId: storeConvoId,callerSignalData:currentSignalData } = useCallStore.getState();
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
      console.log("Accepting call with video:", hasVideo);

      const userStream = await navigator.mediaDevices.getUserMedia({
        video: hasVideo,
        audio: true,
      });

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
        console.log("PARTNER VIDEO RECEIVED!");
        if (partnerVideo.current) {
          partnerVideo.current.srcObject = remoteStream;
        }
      });

      peer.signal(currentSignalData);

      peerRef.current = peer;
      useCallStore.getState().acceptCallUI(storeConvoId, callerId, callType);
    } catch (err: any) {
      console.error("Camera/Mic Error:", err);
      // Reset call state if media access fails
      setCallAccepted(false);
      alert(`Please allow camera & mic: ${err.message}`);
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
    console.log("Partner ended the call → FULL CLEANUP on MY side");
    endCall(); // ← This stops camera, destroys peer, clears video
  };

  socket.on("callEnded", handleRemoteEnd);

  return () => {
    socket.off("callEnded", handleRemoteEnd);
  };
}, [socket, endCall]);
  return {
    myVideo,
    partnerVideo,
    startCall,
    acceptCall,
    endCall,
    // receivingCall,
    // caller,
    callAccepted:localCallAccepted,
    callEnded,
    // callerSignal,
    isMicMuted,
    isVideoOff,
    toggleMic,
    toggleVideo,
  };
};
