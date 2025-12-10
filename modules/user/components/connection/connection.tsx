"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  MapPin,
  Calendar,
  Heart,
  X,
  Info,
  ArrowLeft,
  RefreshCw,
  Loader2,
  Users,
  Sparkles,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { Header } from "@/shared/components/layout/Header";
import { useMatchedTravellers } from "../../hooks/use-connection";
import { sendConnectionRequest } from "../../services/connection.api";
import { Travellers } from "../../types/Ai-trip-plan.type";

// Toast notification component
const Toast = ({
  message,
  type,
  onClose
}: {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColors = {
    success: 'bg-gradient-to-r from-green-500 to-emerald-600',
    error: 'bg-gradient-to-r from-red-500 to-rose-600',
    info: 'bg-gradient-to-r from-blue-500 to-indigo-600',
  };

  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <AlertCircle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />,
  };

  return (
    <div className={`fixed top-20 right-4 z-50 ${bgColors[type]} text-white px-5 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-slide-in backdrop-blur-sm`}>
      {icons[type]}
      <span className="font-medium">{message}</span>
      <button
        onClick={onClose}
        className="ml-2 hover:bg-white/20 p-1 rounded-full transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

// Loading skeleton component
const CardSkeleton = () => (
  <div className="absolute inset-x-4 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden" style={{ top: "20px" }}>
    <div className="aspect-[3/4] bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse">
      <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
        <div className="h-8 bg-gray-300/50 rounded-lg w-3/4" />
        <div className="h-4 bg-gray-300/50 rounded-lg w-1/2" />
        <div className="h-16 bg-gray-300/50 rounded-xl w-full" />
      </div>
    </div>
  </div>
);

// Empty state component
const EmptyState = ({ onRefresh }: { onRefresh: () => void }) => (
  <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
    <div className="relative mb-8">
      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
        <Users className="w-14 h-14 text-purple-400" />
      </div>
      <div className="absolute -top-2 -right-2 w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center animate-bounce">
        <Sparkles className="w-6 h-6 text-white" />
      </div>
    </div>
    <h2 className="text-2xl font-bold text-gray-800 mb-3">
      No Travelers Found
    </h2>
    <p className="text-gray-500 mb-6 max-w-sm">
      Create a trip plan to find travelers heading to the same destination as you!
    </p>
    <button
      onClick={onRefresh}
      className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-6 py-3 rounded-full font-semibold transition-all flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105"
    >
      <RefreshCw className="w-5 h-5" />
      Refresh
    </button>
  </div>
);

// Error state component
const ErrorState = ({ error, onRetry }: { error: string; onRetry: () => void }) => (
  <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-red-100 to-orange-100 flex items-center justify-center mb-8">
      <AlertCircle className="w-14 h-14 text-red-400" />
    </div>
    <h2 className="text-2xl font-bold text-gray-800 mb-3">
      Oops! Something went wrong
    </h2>
    <p className="text-gray-500 mb-6 max-w-sm">
      {error}
    </p>
    <button
      onClick={onRetry}
      className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-6 py-3 rounded-full font-semibold transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
    >
      <RefreshCw className="w-5 h-5" />
      Try Again
    </button>
  </div>
);

// All done state component
const AllDoneState = ({
  connectionsCount,
  onReset
}: {
  connectionsCount: number;
  onReset: () => void;
}) => (
  <div className="flex items-center justify-center min-h-[80vh] px-4">
    <div className="text-center max-w-md">
      <div className="relative inline-block mb-8">
        <div className="w-36 h-36 mx-auto rounded-full bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 flex items-center justify-center shadow-2xl">
          <Heart className="w-18 h-18 text-white fill-white animate-pulse" style={{ width: '72px', height: '72px' }} />
        </div>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white px-4 py-1 rounded-full shadow-lg">
          <span className="text-lg font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            {connectionsCount} {connectionsCount === 1 ? 'Connection' : 'Connections'}! 🎉
          </span>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        You're All Caught Up!
      </h2>
      <p className="text-gray-500 mb-8 text-lg">
        You've seen all available travel buddies heading to your destinations.
      </p>

      <button
        onClick={onReset}
        className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-700 text-white px-8 py-4 rounded-full font-semibold transition-all flex items-center gap-3 mx-auto shadow-xl hover:shadow-2xl hover:scale-105"
      >
        <RefreshCw className="w-5 h-5" />
        Start Over
      </button>
    </div>
  </div>
);

// Traveler Card Component
const TravelerCard = ({
  traveler,
  dragOffset,
  rotation,
  opacity,
  isDragging,
  onDragStart,
  onInfoClick,
}: {
  traveler: Travellers;
  dragOffset: { x: number; y: number };
  rotation: number;
  opacity: number;
  isDragging: boolean;
  onDragStart: (e: React.MouseEvent | React.TouchEvent) => void;
  onInfoClick: () => void;
}) => {
  const placeholderImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(traveler.name || 'User')}&background=random&size=400&bold=true`;

  return (
    <div
      className="absolute inset-x-4 bg-white rounded-3xl shadow-2xl cursor-grab active:cursor-grabbing select-none"
      style={{
        top: "20px",
        transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${rotation}deg)`,
        transition: isDragging ? "none" : "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        opacity: opacity,
        zIndex: 20,
      }}
      onMouseDown={onDragStart}
      onTouchStart={onDragStart}
    >
      {/* Like/Nope Indicators */}
      <div
        className={`absolute top-8 right-8 bg-gradient-to-r from-green-400 to-emerald-500 text-white px-6 py-3 rounded-2xl font-bold text-2xl rotate-12 z-30 border-4 border-white shadow-xl transition-opacity duration-200 ${dragOffset.x > 50 ? 'opacity-100' : 'opacity-0'}`}
      >
        LIKE 
      </div>
      <div
        className={`absolute top-8 left-8 bg-gradient-to-r from-red-400 to-rose-500 text-white px-6 py-3 rounded-2xl font-bold text-2xl -rotate-12 z-30 border-4 border-white shadow-xl transition-opacity duration-200 ${dragOffset.x < -50 ? 'opacity-100' : 'opacity-0'}`}
      >
        NOPE 
      </div>

      {/* Card Image */}
      <div className="relative aspect-[3/4] rounded-3xl overflow-hidden">
        <img
          src={
            traveler.profileImage && traveler.profileImage.trim() !== ""
              ? traveler.profileImage
              : placeholderImage
          }
          alt={traveler.name || "Traveler"}
          className="w-full h-full object-cover"
          draggable="false"
          onError={(e) => {
            (e.target as HTMLImageElement).src = placeholderImage;
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        {/* Info Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onInfoClick();
          }}
          className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-full hover:bg-white hover:scale-110 transition-all z-20 shadow-lg"
        >
          <Info className="w-5 h-5 text-gray-700" />
        </button>

        {/* User Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h2 className="text-3xl font-bold mb-2 drop-shadow-lg">
            {traveler.name || 'Anonymous Traveler'}
          </h2>

          {traveler.location && (
            <div className="flex items-center gap-2 text-sm mb-4 opacity-90">
              <MapPin className="w-4 h-4" />
              <span>{traveler.location}</span>
            </div>
          )}

          {/* Destination Badge */}
          <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-2xl p-4 backdrop-blur-sm shadow-xl">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4" />
              <span className="font-semibold text-lg">
                {traveler.destination || 'Unknown Destination'}
              </span>
            </div>
            {traveler.startDate && (
              <div className="flex items-center gap-2 text-sm opacity-90">
                <Calendar className="w-4 h-4" />
                <span>{new Date(traveler.startDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Component
export default function TravelConnections() {
  const { travelers, isLoading, error, refetch } = useMatchedTravellers();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [showDetail, setShowDetail] = useState(false);
  const [connections, setConnections] = useState<string[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const startPos = useRef({ x: 0, y: 0 });

  const currentTraveler = travelers[currentIndex];

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type });
  }, []);

  const handleDragStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (isConnecting) return;

    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    startPos.current = { x: clientX, y: clientY };
  }, [isConnecting]);

  const handleDragMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const deltaX = clientX - startPos.current.x;
    const deltaY = clientY - startPos.current.y;

    setDragOffset({ x: deltaX, y: deltaY });
  }, [isDragging]);

  const animateCardOut = useCallback((direction: 'left' | 'right') => {
    const exitX = direction === "right" ? 1000 : -1000;
    setDragOffset({ x: exitX, y: 0 });

    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setDragOffset({ x: 0, y: 0 });
    }, 300);
  }, []);

  const handleLike = useCallback(async () => {
    if (!currentTraveler || isConnecting) return;

    setIsConnecting(true);

    try {
      const response = await sendConnectionRequest(currentTraveler.id);
      if (response) {
        setConnections(prev => [...prev, currentTraveler.id]);
        showToast(`Connection request sent to ${currentTraveler.name}! 🎉`, 'success');
        animateCardOut("right");
      }
    } catch (err: any) {
      showToast(err.message || 'Failed to send connection request', 'error');
      setDragOffset({ x: 0, y: 0 });
    } finally {
      setIsConnecting(false);
    }
  }, [currentTraveler, isConnecting, animateCardOut, showToast]);

  const handleSkip = useCallback(() => {
    if (!currentTraveler || isConnecting) return;
    animateCardOut("left");
  }, [currentTraveler, isConnecting, animateCardOut]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);

    const threshold = 120;

    if (Math.abs(dragOffset.x) > threshold) {
      if (dragOffset.x > 0) {
        handleLike();
      } else {
        handleSkip();
      }
    } else {
      setDragOffset({ x: 0, y: 0 });
    }
  }, [dragOffset.x, handleLike, handleSkip]);

  const handleReset = useCallback(() => {
    setCurrentIndex(0);
    setConnections([]);
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleDragMove);
      window.addEventListener("mouseup", handleDragEnd);
      window.addEventListener("touchmove", handleDragMove, { passive: false });
      window.addEventListener("touchend", handleDragEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleDragMove);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchmove", handleDragMove);
      window.removeEventListener("touchend", handleDragEnd);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);

  const rotation = dragOffset.x / 20;
  const opacity = Math.max(0.4, 1 - Math.abs(dragOffset.x) / 400);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                Travel Buddies
              </h1>
              <p className="text-sm text-gray-500">
                Finding your perfect travel companions...
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-md mx-auto px-4 py-8 relative" style={{ height: "600px" }}>
          <CardSkeleton />
        </div>
        <div className="flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
        <Header />
        <ErrorState error={error} onRetry={refetch} />
      </div>
    );
  }

  // Show empty state
  if (travelers.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
        <Header />
        <EmptyState onRefresh={refetch} />
      </div>
    );
  }

  // Show all done state
  if (currentIndex >= travelers.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
        <Header />
        <AllDoneState connectionsCount={connections.length} onReset={handleReset} />
      </div>
    );
  }

  // Main render
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <Header />

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Header Info */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 bg-clip-text text-transparent">
              Travel Buddies
            </h1>
            <p className="text-sm text-gray-500">
              Swipe right to connect, left to pass
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-white/80 backdrop-blur-sm text-gray-700 px-4 py-2 rounded-full text-sm font-semibold shadow-md flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-500" />
              {currentIndex + 1} / {travelers.length}
            </div>
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md flex items-center gap-2">
              <Heart className="w-4 h-4 fill-white" />
              {connections.length}
            </div>
          </div>
        </div>
      </div>

      {/* Card Stack Container */}
      <div className="max-w-md mx-auto px-4 py-6 relative" style={{ height: "550px" }}>
        {/* Background cards */}
        {travelers
          .slice(currentIndex + 1, currentIndex + 3)
          .map((traveler, idx) => (
            <div
              key={traveler.id}
              className="absolute inset-x-4 bg-white/60 backdrop-blur-sm rounded-3xl shadow-lg"
              style={{
                top: `${20 + (idx + 1) * 12}px`,
                transform: `scale(${1 - (idx + 1) * 0.04})`,
                zIndex: 10 - idx,
                opacity: 0.6 - idx * 0.2,
              }}
            >
              <div className="aspect-[3/4]" />
            </div>
          ))}

        {/* Main Card */}
        {currentTraveler && (
          <TravelerCard
            traveler={currentTraveler}
            dragOffset={dragOffset}
            rotation={rotation}
            opacity={opacity}
            isDragging={isDragging}
            onDragStart={handleDragStart}
            onInfoClick={() => setShowDetail(true)}
          />
        )}
      </div>

      {/* Action Buttons */}
      <div className="max-w-md mx-auto px-4 pb-8">
        <div className="flex items-center justify-center gap-8">
          <button
            onClick={handleSkip}
            disabled={isConnecting}
            className="w-16 h-16 rounded-full bg-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center group hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-gray-100"
          >
            <X className="w-8 h-8 text-red-400 group-hover:text-red-500 group-hover:scale-110 transition-all" />
          </button>

          <button
            onClick={handleLike}
            disabled={isConnecting}
            className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 shadow-lg hover:shadow-2xl transition-all flex items-center justify-center group hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isConnecting ? (
              <Loader2 className="w-10 h-10 text-white animate-spin" />
            ) : (
              <Heart className="w-10 h-10 text-white fill-white group-hover:scale-110 transition-transform" />
            )}
          </button>
        </div>
      </div>

      {/* Detail Modal */}
      {showDetail && currentTraveler && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowDetail(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={
                  currentTraveler.profileImage && currentTraveler.profileImage.trim() !== ""
                    ? currentTraveler.profileImage
                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(currentTraveler.name || 'User')}&background=random&size=400&bold=true`
                }
                alt={currentTraveler.name}
                className="w-full h-80 object-cover rounded-t-3xl"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(currentTraveler.name || 'User')}&background=random&size=400&bold=true`;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-3xl" />
              <button
                onClick={() => setShowDetail(false)}
                className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all shadow-lg hover:scale-110"
              >
                <ArrowLeft className="w-6 h-6 text-gray-700" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    {currentTraveler.name || 'Anonymous Traveler'}
                  </h2>
                  {currentTraveler.location && (
                    <p className="text-gray-500 flex items-center gap-2 mt-2">
                      <MapPin className="w-4 h-4" />
                      {currentTraveler.location}
                    </p>
                  )}
                </div>
              </div>

              <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 rounded-2xl p-5 text-white mb-6 shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                  <Sparkles className="w-6 h-6" />
                  <span className="font-bold text-xl">
                    {currentTraveler.destination || 'Unknown Destination'}
                  </span>
                </div>
                {currentTraveler.startDate && (
                  <div className="flex items-center gap-2 text-sm opacity-90">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(currentTraveler.startDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setShowDetail(false);
                    handleSkip();
                  }}
                  disabled={isConnecting}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-4 rounded-2xl font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <X className="w-5 h-5" />
                  Pass
                </button>
                <button
                  onClick={() => {
                    setShowDetail(false);
                    handleLike();
                  }}
                  disabled={isConnecting}
                  className="flex-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-700 text-white py-4 rounded-2xl font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg"
                >
                  {isConnecting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Heart className="w-5 h-5" />
                  )}
                  Connect
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
