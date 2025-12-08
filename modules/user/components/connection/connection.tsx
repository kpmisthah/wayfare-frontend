// "use client";
// import React, { useState } from "react";
// import {
//   MapPin,
//   Calendar,
//   Heart,
//   X,
//   ArrowLeft,
// } from "lucide-react";
// import { Header } from "@/shared/components/layout/Header";
// import { useMatchedTravellers } from "../../hooks/use-connection";
// import { Travellers } from "../../types/Ai-trip-plan.type";
// import { sendConnectionRequest } from "../../services/connection.api";

// export default function TravelConnections() {

//   const { travelers } = useMatchedTravellers();

//   const [selectedUser, setSelectedUser] = useState<Travellers | null>(null);
//   const [likedUsers, setLikedUsers] = useState<string[]>([]);

//   const handleLike = (userId:string) => {
//     setLikedUsers([...likedUsers, userId]);
//   };

//   const handleSkip = (userId:string) => {
//     // Skip logic
//   };
//   const handleConnect = async (userId: string) => {
//   const response = await sendConnectionRequest(userId);
//   console.log(response,'in connection')
//   if (response) {
//     setLikedUsers((prev) => [...prev, userId]);
//     alert("Connection request sent!");
//   }
// };

// return (
//   <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
//     {/* Header */}
//     <Header />
//       <div className="max-w-7xl mx-auto px-4 py-4">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-cyan-600 bg-clip-text text-transparent">
//               Travel Buddies
//             </h1>
//             <p className="text-sm text-gray-500">
//               Find your perfect travel companion
//             </p>
//           </div>
//           <div className="flex items-center gap-2">
//             <div className="bg-cyan-100 text-cyan-600 px-4 py-2 rounded-full text-sm font-semibold">
//               {travelers.length} travelers
//             </div>
//           </div>
//         </div>
//       </div>

//     {/* User Detail Modal */}
//     {selectedUser && (
//       <div
//         className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
//         onClick={() => setSelectedUser(null)}
//       >
//         <div
//           className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
//           onClick={(e) => e.stopPropagation()}
//         >
//           {/* User Image */}
//           <div className="relative">
//             <img
//               src={selectedUser.profileImage}
//               alt={selectedUser.name}
//               className="w-full h-96 object-cover rounded-t-3xl"
//             />
//             <button
//               onClick={() => setSelectedUser(null)}
//               className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
//             >
//               <ArrowLeft className="w-6 h-6 text-gray-700" />
//             </button>
//             {/* {selectedUser.verified && (
//               <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
//                 <Star className="w-4 h-4 fill-white" />
//                 Verified
//               </div>
//             )} */}
//           </div>

//           {/* User Details */}
//           <div className="p-6">
//             <div className="flex items-start justify-between mb-4">
//               <div>
//                 <h2 className="text-3xl font-bold text-gray-900">
//                   {selectedUser.name},
//                 </h2>
//                 <p className="text-gray-500 flex items-center gap-1 mt-1">
//                   <MapPin className="w-4 h-4" />
//                   {selectedUser.location}
//                 </p>
//               </div>
//             </div>

//             {/* Destination Info */}
//             <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-4 text-white mb-4">
//               <div className="flex items-center gap-2 mb-2">
//                 <MapPin className="w-5 h-5" />
//                 <span className="font-semibold text-lg">
//                   Traveling to {selectedUser.destination}
//                 </span>
//               </div>
//               <div className="flex items-center gap-2 text-sm opacity-90">
//                 <Calendar className="w-4 h-4" />
//                 <span>{selectedUser.startDate}</span>
//               </div>
//             </div>

//             {/* Bio */}
//             {/* <div className="mb-4">
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">About</h3>
//               <p className="text-gray-600 leading-relaxed">{selectedUser.bio}</p>
//             </div> */}

//             {/* Interests */}
//             {/* <div className="mb-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-3">Interests</h3>
//               <div className="flex flex-wrap gap-2">
//                 {selectedUser.interests.map((interest, idx) => (
//                   <span key={idx} className="bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm font-medium">
//                     {interest}
//                   </span>
//                 ))}
//               </div>
//             </div> */}

//             {/* Action Buttons */}
//             <div className="flex gap-3">
//               <button
//                 onClick={() => setSelectedUser(null)}
//                 className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-4 rounded-2xl font-semibold transition-colors flex items-center justify-center gap-2"
//               >
//                 <X className="w-5 h-5" />
//                 Skip
//               </button>
//               <button
//               disabled={likedUsers.includes(selectedUser.id)}
//                 onClick={() => {
//                   handleConnect(selectedUser.id)
//                 }}
//                 className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-4 rounded-2xl font-semibold transition-colors flex items-center justify-center gap-2"
//               >
//                 <Heart className="w-5 h-5" />
//                 Connect
//               </button>
//             </div>

//             {/* {likedUsers.includes(selectedUser.id) && ( */}
//               {/* <div className="mt-3 flex gap-3">
//                 <button className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-2xl font-semibold transition-colors flex items-center justify-center gap-2">
//                   <MessageCircle className="w-5 h-5" />
//                   Chat
//                 </button>
//                 <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-2xl font-semibold transition-colors flex items-center justify-center gap-2">
//                   <Video className="w-5 h-5" />
//                   Video Call
//                 </button>
//               </div> */}
//             {/* )} */}
//           </div>
//         </div>
//       </div>
//     )}

//     {/* Travelers Grid */}
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {travelers.map((traveler) => (
//           <div
//             key={traveler.id}
//             onClick={() => setSelectedUser(traveler)}
//             className="relative rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
//           >
//             {/* User Image */}
//             <div className="aspect-[3/4] relative">
//               <img
//                 src={traveler.profileImage}
//                 alt={traveler.name}
//                 className="w-full h-full object-cover"
//               />

//               {/* Gradient Overlay */}
//               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

//               {/* Verified Badge */}
//               {/* {traveler.verified && ( */}
//               {/* // <div className="absolute top-3 right-3 bg-blue-500 p-1.5 rounded-full"> */}
//               {/* <Star className="w-4 h-4 text-white fill-white" /> */}
//               {/* </div> */}
//               {/* )} */}

//               {/* User Info */}
//               <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
//                 <h3 className="text-lg font-bold mb-1">{traveler.name}</h3>
//                 <div className="flex items-center gap-1 text-sm mb-2 opacity-90">
//                   <MapPin className="w-3 h-3" />
//                   <span>{traveler.destination}</span>
//                 </div>
//                 <div className="flex items-center gap-1 text-xs opacity-75">
//                   <Calendar className="w-3 h-3" />
//                   <span>{traveler.startDate}</span>
//                 </div>
//               </div>

//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   </div>
// );
// }

//.............................................................

//2nd connection UI

"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  MapPin,
  Calendar,
  Heart,
  X,
  Info,
  ArrowLeft,
  RefreshCw,
} from "lucide-react";
import { Header } from "@/shared/components/layout/Header";
import { useMatchedTravellers } from "../../hooks/use-connection";
import { sendConnectionRequest } from "../../services/connection.api";

export default function TravelConnections() {
  const { travelers } = useMatchedTravellers();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [showDetail, setShowDetail] = useState(false);
  const [connections, setConnections] = useState<string[]>([]);
  const cardRef = useRef(null);
  const startPos = useRef({ x: 0, y: 0 });

  const currentTraveler = travelers[currentIndex];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragStart = (e: any) => {
    setIsDragging(true);
    const clientX = e.type === "mousedown" ? e.clientX : e.touches[0].clientX;
    const clientY = e.type === "mousedown" ? e.clientY : e.touches[0].clientY;
    startPos.current = { x: clientX, y: clientY };
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragMove = (e: any) => {
    if (!isDragging) return;

    const clientX = e.type === "mousemove" ? e.clientX : e.touches[0].clientX;
    const clientY = e.type === "mousemove" ? e.clientY : e.touches[0].clientY;

    const deltaX = clientX - startPos.current.x;
    const deltaY = clientY - startPos.current.y;

    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleDragEnd = () => {
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
  };

  const handleLike = async () => {
    if (!currentTraveler) return;

    const response = await sendConnectionRequest(currentTraveler.id);
    console.log(response, "in connection");
    if (response) {
      setConnections([...connections, currentTraveler.id]);
      animateCardOut("right");
    }
  };

  const handleSkip = () => {
    if (!currentTraveler) return;
    animateCardOut("left");
  };

  const animateCardOut = (direction: string) => {
    const exitX = direction === "right" ? 1000 : -1000;
    setDragOffset({ x: exitX, y: 0 });

    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setDragOffset({ x: 0, y: 0 });
    }, 300);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setConnections([]);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleDragMove);
      window.addEventListener("mouseup", handleDragEnd);
      window.addEventListener("touchmove", handleDragMove);
      window.addEventListener("touchend", handleDragEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleDragMove);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchmove", handleDragMove);
      window.removeEventListener("touchend", handleDragEnd);
    };
  }, [isDragging, dragOffset]);

  const rotation = dragOffset.x / 20;
  const opacity = 1 - Math.abs(dragOffset.x) / 300;

  if (currentIndex >= travelers.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        <Header />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-pink-400 to-purple-600 flex items-center justify-center">
              <Heart className="w-16 h-16 text-white fill-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              No More Travelers!
            </h2>
            <p className="text-gray-600 mb-6">
              You've seen all available travel buddies
            </p>
            <p className="text-lg text-gray-700 mb-8">
              You made {connections.length} connection
              {connections.length !== 1 ? "s" : ""}! 🎉
            </p>
            <button
              onClick={handleReset}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold transition-all flex items-center gap-2 mx-auto"
            >
              <RefreshCw className="w-5 h-5" />
              Start Over
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentTraveler) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        <Header />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <p className="text-gray-600">Loading travelers...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <Header />

      {/* Header Info */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-cyan-600 bg-clip-text text-transparent">
              Travel Buddies
            </h1>
            <p className="text-sm text-gray-500">
              Swipe right to connect, left to skip
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-cyan-100 text-cyan-600 px-4 py-2 rounded-full text-sm font-semibold">
              {currentIndex + 1} / {travelers.length}
            </div>
            <div className="bg-pink-100 text-pink-600 px-4 py-2 rounded-full text-sm font-semibold">
              {connections.length} ❤️
            </div>
          </div>
        </div>
      </div>

      {/* Card Stack Container */}
      <div
        className="max-w-md mx-auto px-4 py-8 relative"
        style={{ height: "600px" }}
      >
        {/* Background cards */}
        {travelers
          .slice(currentIndex + 1, currentIndex + 3)
          .map((traveler, idx) => (
            <div
              key={traveler.id}
              className="absolute inset-x-4 bg-white rounded-3xl shadow-xl"
              style={{
                top: `${20 + idx * 10}px`,
                transform: `scale(${1 - (idx + 1) * 0.05})`,
                zIndex: 10 - idx,
                opacity: 0.5 + (1 - idx) * 0.2,
              }}
            >
              <div className="aspect-[3/4]"></div>
            </div>
          ))}

        {/* Main Card */}
        <div
          ref={cardRef}
          className="absolute inset-x-4 bg-white rounded-3xl shadow-2xl cursor-grab active:cursor-grabbing"
          style={{
            top: "20px",
            transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${rotation}deg)`,
            transition: isDragging ? "none" : "all 0.3s ease-out",
            opacity: opacity,
            zIndex: 20,
          }}
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
        >
          {/* Like/Nope Indicators */}
          {dragOffset.x > 50 && (
            <div className="absolute top-8 right-8 bg-green-500 text-white px-6 py-3 rounded-2xl font-bold text-2xl rotate-12 z-30 border-4 border-green-500">
              LIKE
            </div>
          )}
          {dragOffset.x < -50 && (
            <div className="absolute top-8 left-8 bg-red-500 text-white px-6 py-3 rounded-2xl font-bold text-2xl -rotate-12 z-30 border-4 border-red-500">
              NOPE
            </div>
          )}

          {/* Card Image */}
          <div className="relative aspect-[3/4] rounded-3xl overflow-hidden">
            {/* <img
              src={currentTraveler.profileImage || "https://via.placeholder.com/400x600?text=No+Image"}
              alt={currentTraveler.name}
              className="w-full h-full object-cover"
              draggable="false"
            /> */}
            <img
              src={
                currentTraveler.profileImage &&
                  currentTraveler.profileImage.trim() !== ""
                  ? currentTraveler.profileImage
                  : "https://placehold.co/400x600?text=No+Profile"
              }
              alt={currentTraveler.name || "Traveler"}
              className="w-full h-full object-cover"
              draggable="false"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

            {/* Info Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowDetail(true);
              }}
              className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors z-20"
            >
              <Info className="w-5 h-5 text-gray-700" />
            </button>

            {/* User Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h2 className="text-3xl font-bold mb-2">
                {currentTraveler.name}
              </h2>
              <div className="flex items-center gap-2 text-sm mb-3 opacity-90">
                <MapPin className="w-4 h-4" />
                <span>{currentTraveler.location}</span>
              </div>

              {/* Destination Badge */}
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl p-3 inline-block">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-4 h-4" />
                  <span className="font-semibold">
                    Traveling to {currentTraveler.destination}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs opacity-90">
                  <Calendar className="w-3 h-3" />
                  <span>{currentTraveler.startDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="max-w-md mx-auto px-4 pb-8">
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={handleSkip}
            className="w-16 h-16 rounded-full bg-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center group hover:scale-110"
          >
            <X className="w-8 h-8 text-red-500 group-hover:scale-110 transition-transform" />
          </button>

          <button
            onClick={handleLike}
            className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 shadow-lg hover:shadow-xl transition-all flex items-center justify-center group hover:scale-110"
          >
            <Heart className="w-10 h-10 text-white fill-white group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>

      {/* Detail Modal */}
      {showDetail && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowDetail(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={currentTraveler.profileImage}
                alt={currentTraveler.name}
                className="w-full h-96 object-cover rounded-t-3xl"
              />
              <button
                onClick={() => setShowDetail(false)}
                className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-gray-700" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    {currentTraveler.name}
                  </h2>
                  <p className="text-gray-500 flex items-center gap-1 mt-1">
                    <MapPin className="w-4 h-4" />
                    {currentTraveler.location}
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-4 text-white mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5" />
                  <span className="font-semibold text-lg">
                    Traveling to {currentTraveler.destination}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm opacity-90">
                  <Calendar className="w-4 h-4" />
                  <span>{currentTraveler.startDate}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDetail(false);
                    handleSkip();
                  }}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-4 rounded-2xl font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <X className="w-5 h-5" />
                  Skip
                </button>
                <button
                  onClick={() => {
                    setShowDetail(false);
                    handleLike();
                  }}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-4 rounded-2xl font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <Heart className="w-5 h-5" />
                  Connect
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
//.............................................
