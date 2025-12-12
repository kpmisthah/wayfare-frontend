"use client";
import { useCallStore } from "@/store/useCallStore";
import { useAuthStore } from "@/store/Auth";
import { useCall } from "../../hooks/use-call";
import { PhoneOff, Mic, MicOff, Video, VideoOff, Maximize2, Minimize2 } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function ActiveCallContent() {
  const { user } = useAuthStore();
  const { isCallActive, callerId, conversationId, callType, callerSignalData, recipientId } = useCallStore();
  const [isMinimized, setIsMinimized] = useState(false);

  const partnerUserId = user?.id === callerId ? recipientId : callerId;

  const call = useCall(
    user?.id,
    partnerUserId!,
    conversationId || "placeholder"
  );

  useEffect(() => {
    if (isCallActive && user?.id === callerId && !call.callAccepted) {
      call.startCall(callType || "video");
    }
  }, [isCallActive, callerId, user?.id, callType]);

  useEffect(() => {
    if (isCallActive && callerSignalData && !call.callAccepted) {
      call.acceptCall();
    }
  }, [isCallActive, callerSignalData]);

  return (
    <div className="fixed inset-0 bg-gray-900 z-[100] flex flex-col items-center justify-center overflow-hidden">

      {/* 1. Main Partner Video Area */}
      <div className="absolute inset-0 flex items-center justify-center bg-zinc-900">
        <video
          ref={call.partnerVideo}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />
      </div>

      <motion.div
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        className={`absolute top-4 right-4 z-20 rounded-xl overflow-hidden shadow-2xl border-2 border-white/20 transition-all duration-300 ${isMinimized ? 'w-24 h-32' : 'w-48 h-64 md:w-64 md:h-48'}`}
      >
        <video
          ref={call.myVideo}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover bg-black"
        />
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full hover:bg-black/70"
        >
          {isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
        </button>
      </motion.div>

      <div className="absolute bottom-8 z-30 flex items-center gap-6 bg-gray-900/80 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/10 shadow-2xl animate-in slide-in-from-bottom-10 fade-in duration-500">

        <button
          onClick={call.toggleMic}
          className={`p-4 rounded-full transition-all duration-200 ${call.isMicMuted
              ? "bg-red-500/20 text-red-500 hover:bg-red-500/30"
              : "bg-gray-700/50 text-white hover:bg-gray-600/50"
            }`}
          title={call.isMicMuted ? "Unmute" : "Mute"}
        >
          {call.isMicMuted ? <MicOff size={24} /> : <Mic size={24} />}
          <span className="sr-only">Mic</span>
        </button>

        <button
          onClick={call.toggleVideo}
          disabled={callType === "audio" && call.isVideoOff}
          className={`p-4 rounded-full transition-all duration-200 ${call.isVideoOff
              ? "bg-red-500/20 text-red-500 hover:bg-red-500/30"
              : "bg-gray-700/50 text-white hover:bg-gray-600/50"
            }`}
          title={call.isVideoOff ? "Turn On Video" : "Stop Video"}
        >
          {call.isVideoOff ? <VideoOff size={24} /> : <Video size={24} />}
          <span className="sr-only">Video</span>
        </button>

        <button
          onClick={call.endCall}
          className="p-4 bg-red-600 text-white rounded-full hover:bg-red-700 hover:scale-105 transition-all shadow-lg shadow-red-900/20"
          title="End Call"
        >
          <PhoneOff size={28} fill="currentColor" />
          <span className="sr-only">End Call</span>
        </button>
      </div>

      <div className="absolute top-4 left-4 z-20 px-4 py-2 bg-black/40 backdrop-blur-sm rounded-lg border border-white/5 text-white/80 text-sm font-medium">
        {call.callAccepted ? (
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Connected
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
            Calling...
          </span>
        )}
      </div>
    </div>
  );
}

export default function ActiveCallScreen() {
  const isCallActive = useCallStore((state) => state.isCallActive);

  if (!isCallActive) return null;

  return <ActiveCallContent />;
}