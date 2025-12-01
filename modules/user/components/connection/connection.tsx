"use client";
import React, { useState } from "react";
import {
  MapPin,
  Calendar,
  Heart,
  X,
  MessageCircle,
  Video,
  ArrowLeft,
  Star,
} from "lucide-react";
import { Header } from "@/shared/components/layout/Header";
import { useMatchedTravellers } from "../../hooks/use-connection";
import { Travellers } from "../../types/Ai-trip-plan.type";
import { sendConnectionRequest } from "../../services/connection.api";

export default function TravelConnections() {

  const { travelers } = useMatchedTravellers();

  const [selectedUser, setSelectedUser] = useState<Travellers | null>(null);
  const [likedUsers, setLikedUsers] = useState<string[]>([]);

  const handleLike = (userId:string) => {
    setLikedUsers([...likedUsers, userId]);
  };

  const handleSkip = (userId:string) => {
    // Skip logic
  };
  const handleConnect = async (userId: string) => {
  const response = await sendConnectionRequest(userId);
  console.log(response,'in connection')
  if (response) {
    setLikedUsers((prev) => [...prev, userId]);
    alert("Connection request sent!");
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Header */}
      <Header />
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-cyan-600 bg-clip-text text-transparent">
                Travel Buddies
              </h1>
              <p className="text-sm text-gray-500">
                Find your perfect travel companion
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-cyan-100 text-cyan-600 px-4 py-2 rounded-full text-sm font-semibold">
                {travelers.length} travelers
              </div>
            </div>
          </div>
        </div>

      {/* User Detail Modal */}
      {selectedUser && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedUser(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* User Image */}
            <div className="relative">
              <img
                src={selectedUser.profileImage}
                alt={selectedUser.name}
                className="w-full h-96 object-cover rounded-t-3xl"
              />
              <button
                onClick={() => setSelectedUser(null)}
                className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-gray-700" />
              </button>
              {/* {selectedUser.verified && (
                <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <Star className="w-4 h-4 fill-white" />
                  Verified
                </div>
              )} */}
            </div>

            {/* User Details */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    {selectedUser.name},
                  </h2>
                  <p className="text-gray-500 flex items-center gap-1 mt-1">
                    <MapPin className="w-4 h-4" />
                    {selectedUser.location}
                  </p>
                </div>
              </div>

              {/* Destination Info */}
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-4 text-white mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5" />
                  <span className="font-semibold text-lg">
                    Traveling to {selectedUser.destination}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm opacity-90">
                  <Calendar className="w-4 h-4" />
                  <span>{selectedUser.startDate}</span>
                </div>
              </div>

              {/* Bio */}
              {/* <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">About</h3>
                <p className="text-gray-600 leading-relaxed">{selectedUser.bio}</p>
              </div> */}

              {/* Interests */}
              {/* <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedUser.interests.map((interest, idx) => (
                    <span key={idx} className="bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm font-medium">
                      {interest}
                    </span>
                  ))}
                </div>
              </div> */}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedUser(null)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-4 rounded-2xl font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <X className="w-5 h-5" />
                  Skip
                </button>
                <button
                disabled={likedUsers.includes(selectedUser.id)}
                  onClick={() => {
                    handleConnect(selectedUser.id)
                  }}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-4 rounded-2xl font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <Heart className="w-5 h-5" />
                  Connect
                </button>
              </div>

              {/* {likedUsers.includes(selectedUser.id) && ( */}
                {/* <div className="mt-3 flex gap-3">
                  <button className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-2xl font-semibold transition-colors flex items-center justify-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Chat
                  </button>
                  <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-2xl font-semibold transition-colors flex items-center justify-center gap-2">
                    <Video className="w-5 h-5" />
                    Video Call
                  </button>
                </div> */}
              {/* )} */}
            </div>
          </div>
        </div>
      )}

      {/* Travelers Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {travelers.map((traveler) => (
            <div
              key={traveler.id}
              onClick={() => setSelectedUser(traveler)}
              className="relative rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
            >
              {/* User Image */}
              <div className="aspect-[3/4] relative">
                <img
                  src={traveler.profileImage}
                  alt={traveler.name}
                  className="w-full h-full object-cover"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                {/* Verified Badge */}
                {/* {traveler.verified && ( */}
                {/* // <div className="absolute top-3 right-3 bg-blue-500 p-1.5 rounded-full"> */}
                {/* <Star className="w-4 h-4 text-white fill-white" /> */}
                {/* </div> */}
                {/* )} */}

                {/* User Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-lg font-bold mb-1">{traveler.name}</h3>
                  <div className="flex items-center gap-1 text-sm mb-2 opacity-90">
                    <MapPin className="w-3 h-3" />
                    <span>{traveler.destination}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs opacity-75">
                    <Calendar className="w-3 h-3" />
                    <span>{traveler.startDate}</span>
                  </div>
                </div>

               
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
