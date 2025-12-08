"use client";
import { useEffect, useRef } from "react";
import { useCallStore } from "@/store/useCallStore";
import { Phone, PhoneOff, Video } from "lucide-react";
import { useAuthStore } from "@/store/Auth";
import { AnimatePresence, motion } from "framer-motion";

export default function CallNotificationManager() {
  const { user } = useAuthStore();
  const { isIncomingCall, callerId, conversationId, callType, endCallUI, acceptCallUI } =
    useCallStore();

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isIncomingCall) {
      // Play ringtone
      audioRef.current = new Audio("https://cdn.pixabay.com/download/audio/2021/08/09/audio_88447ea76b.mp3?filename=cell-phone-ringing-15109.mp3");
      audioRef.current.loop = true;
      audioRef.current.play().catch(e => console.error("Audio play failed", e));
    } else {
      // Stop ringtone
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    }
  }, [isIncomingCall]);

  const handleAccept = () => {
    if (conversationId && callerId && callType) {
      acceptCallUI(conversationId, callerId, callType);
    }
  };

  const handleReject = () => {
    const socket = require("@/lib/socket").getSocket();
    if (socket && callerId) {
      socket.emit("rejectCall", { callerId });
    }
    endCallUI();
  };

  return (
    <AnimatePresence>
      {isIncomingCall && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-4 right-4 z-[9999] md:top-8 md:right-8"
        >
          <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-white/20 w-80 md:w-96 overflow-hidden relative">

            {/* Background Glow */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-400/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-400/30 rounded-full blur-3xl animate-pulse delay-700"></div>

            <div className="relative z-10 text-center">
              <div className="w-20 h-20 mx-auto bg-gradient-to-tr from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-4 shadow-inner">
                {callType === 'video' ? (
                  <Video className="w-10 h-10 text-gray-600 animate-bounce" />
                ) : (
                  <Phone className="w-10 h-10 text-gray-600 animate-bounce" />
                )}
              </div>

              <h2 className="text-xl font-bold text-gray-800 mb-1">Incoming {callType} Call</h2>
              <p className="text-sm text-gray-500 mb-6">User ID: {callerId?.slice(0, 8)}...</p>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleReject}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-100 text-red-600 rounded-xl font-semibold hover:bg-red-200 transition-colors"
                >
                  <PhoneOff className="w-5 h-5" />
                  Decline
                </button>
                <button
                  onClick={handleAccept}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 shadow-lg shadow-green-200 transition-all hover:scale-105"
                >
                  <Phone className="w-5 h-5" />
                  Accept
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
