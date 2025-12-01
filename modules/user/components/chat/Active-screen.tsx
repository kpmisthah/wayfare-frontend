
"use client";
import { useCallStore } from "@/store/useCallStore";
import { useAuthStore } from "@/store/Auth";
import { useCall } from "../../hooks/use-call";
import { PhoneOff, Mic, MicOff, Video, VideoOff } from "lucide-react";
import { useEffect } from "react";
export default function ActiveCallScreen() {
  const { user } = useAuthStore();
  const { isCallActive, callerId, conversationId, callType ,callerSignalData,recipientId} = useCallStore();
  console.log(isCallActive,'isCallactiveee')
  console.log(callerId,'calleridddddd in videooo')
  console.log(conversationId,'in caller iddd');
  console.log(callType,'calllllttyppeee in actiev sctreeee')
  console.log(callerSignalData,'calllerrrsignaallldata-------------->');
  console.log(recipientId,'reciepinetIdddd==============');

const partnerUserId = user?.id === callerId ? recipientId : callerId;
  console.log(partnerUserId, "actual partner didd---------------------------");
  const call = useCall(
    user?.id,
    partnerUserId!,
    conversationId || "placeholder"
  );
  useEffect(() => {
  if (isCallActive && user?.id === callerId && !call.callAccepted) {
    console.log("I am the caller → starting call...");
    call.startCall(callType || "video");
  }
}, [isCallActive, callerId, user?.id, callType]);
useEffect(() => {
    if (isCallActive && callerSignalData && !call.callAccepted) {
      console.log("User accepted call → connecting WebRTC...");
      call.acceptCall(); // This creates peer + shows video
    }
  }, [isCallActive, callerSignalData]);
  // --- 2. CONDITIONAL RENDERING ---
  // We use the store state to decide whether to render the UI, not whether to call the hook.
  if (!isCallActive) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col">
      <div className="flex-1 relative">
        {/* Partner Video */}
        <video
          ref={call.partnerVideo}
          autoPlay
          playsInline
          className="w-full h-full object-cover border-4 border-red-500"
        />
        {/* My Video */}
        <video
          ref={call.myVideo}
          autoPlay
          muted
          playsInline
          className="absolute bottom-8 right-8 w-64 h-48 rounded-lg border-4 border-blue-500 shadow-2xl"
        />
      </div>
      <div className="p-8 flex justify-center gap-8 bg-black">
        {/* 🎤 MIC TOGGLE BUTTON */}
        <button
          onClick={call.toggleMic}
          className={`p-6 rounded-full transition ${
            call.isMicMuted
              ? "bg-gray-700 hover:bg-gray-600"
              : "bg-white hover:bg-gray-100"
          }`}
        >
          {call.isMicMuted ? (
            <MicOff className="w-8 h-8 text-red-500" />
          ) : (
            <Mic className="w-8 h-8 text-green-600" />
          )}
        </button>
        {/* 📸 VIDEO TOGGLE BUTTON */}
        <button
          onClick={call.toggleVideo}
          // Assuming you have access to the active call type for disabling logic
          disabled={callType === "audio" && call.isVideoOff}
          className={`p-6 rounded-full transition ${
            call.isVideoOff
              ? "bg-gray-700 hover:bg-gray-600"
              : "bg-white hover:bg-gray-100"
          }`}
        >
          {call.isVideoOff ? (
            <VideoOff className="w-8 h-8 text-red-500" />
          ) : (
            <Video className="w-8 h-8 text-blue-600" />
          )}
        </button>
        <button
          onClick={call.endCall}
          className="p-6 bg-red-600 hover:bg-red-700 rounded-full transition"
        >
          <PhoneOff className="w-10 h-10 text-white" />
        </button>
      </div>
    </div>
  );
}