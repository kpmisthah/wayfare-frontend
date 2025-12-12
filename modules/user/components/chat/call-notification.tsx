"use client";
import { useEffect, useRef, useState } from "react";
import { useCallStore } from "@/store/useCallStore";
import { Phone, PhoneOff, Video } from "lucide-react";
import { useAuthStore } from "@/store/Auth";
import { AnimatePresence, motion } from "framer-motion";


const createRingtone = () => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

  const playTone = (frequency: number, duration: number, delay: number) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0, audioContext.currentTime + delay);
    gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + delay + 0.01);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + delay + duration);

    oscillator.start(audioContext.currentTime + delay);
    oscillator.stop(audioContext.currentTime + delay + duration);
  };

  const playRingtone = () => {
    playTone(800, 0.2, 0);
    playTone(900, 0.2, 0.25);
    playTone(800, 0.2, 0.6);
    playTone(900, 0.2, 0.85);
  };

  return { playRingtone, stop: () => audioContext.close() };
};

export default function CallNotificationManager() {
  const { user } = useAuthStore();
  const { isIncomingCall, callerId, conversationId, callType, endCallUI, acceptCallUI } =
    useCallStore();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ringtoneRef = useRef<{ playRingtone: () => void; stop: () => void } | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [pulseAnimation, setPulseAnimation] = useState(false);

  useEffect(() => {
    if (isIncomingCall) {
      setPulseAnimation(true);
      if ('vibrate' in navigator) {
        const vibratePattern = [300, 200, 300];
        navigator.vibrate(vibratePattern);
        intervalRef.current = setInterval(() => {
          navigator.vibrate(vibratePattern);
        }, 2000);
      }

      try {

        ringtoneRef.current = createRingtone();
        ringtoneRef.current.playRingtone();
        const ringtoneInterval = setInterval(() => {
          ringtoneRef.current?.playRingtone();
        }, 1500);

        audioRef.current = new Audio("https://cdn.pixabay.com/download/audio/2021/08/09/audio_88447ea76b.mp3?filename=cell-phone-ringing-15109.mp3");
        audioRef.current.loop = true;
        audioRef.current.volume = 0.5;

        audioRef.current.play().catch(e => {
          console.log("Audio autoplay blocked, using Web Audio API only");
        });

        return () => {
          clearInterval(ringtoneInterval);
        };
      } catch (error) {
        console.error("Failed to play ringtone:", error);
      }
    } else {
      // Stop everything
      setPulseAnimation(false);

      // Stop vibration
      if ('vibrate' in navigator) {
        navigator.vibrate(0);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      // Stop Web Audio
      if (ringtoneRef.current) {
        ringtoneRef.current.stop();
        ringtoneRef.current = null;
      }
    }

    return () => {
      if ('vibrate' in navigator) {
        navigator.vibrate(0);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (ringtoneRef.current) {
        ringtoneRef.current.stop();
      }
    };
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
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="fixed top-4 right-4 z-[9999] md:top-8 md:right-8"
        >
          <div className="bg-gradient-to-br from-white via-white to-gray-50 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/40 w-80 md:w-96 overflow-hidden relative">

            {/* Animated Background Rings */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                animate={pulseAnimation ? {
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0, 0.3],
                } : {}}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-green-500 rounded-full blur-2xl"
              />
              <motion.div
                animate={pulseAnimation ? {
                  scale: [1, 1.8, 1],
                  opacity: [0.2, 0, 0.2],
                } : {}}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-blue-500 rounded-full blur-3xl"
              />
            </div>

            <div className="relative z-10 text-center">
              {/* Animated Icon */}
              <motion.div
                animate={pulseAnimation ? {
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                } : {}}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-24 h-24 mx-auto bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-5 shadow-xl relative"
              >
                {/* Ripple Effect */}
                <motion.div
                  animate={{
                    scale: [1, 1.5],
                    opacity: [0.6, 0]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                  className="absolute inset-0 bg-green-400 rounded-full"
                />

                {callType === 'video' ? (
                  <Video className="w-12 h-12 text-white relative z-10" />
                ) : (
                  <Phone className="w-12 h-12 text-white relative z-10" />
                )}
              </motion.div>

              <motion.h2
                animate={{ opacity: [1, 0.7, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2"
              >
                Incoming {callType === 'video' ? 'Video' : 'Voice'} Call
              </motion.h2>
              <p className="text-sm text-gray-500 mb-6">ID: {callerId?.slice(0, 8)}...</p>

              <div className="flex gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleReject}
                  className="flex-1 flex items-center justify-center gap-2 px-5 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  <PhoneOff className="w-5 h-5" />
                  Decline
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAccept}
                  className="flex-1 flex items-center justify-center gap-2 px-5 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl font-semibold shadow-lg shadow-green-300/50 hover:shadow-xl transition-all"
                >
                  <Phone className="w-5 h-5" />
                  Accept
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
