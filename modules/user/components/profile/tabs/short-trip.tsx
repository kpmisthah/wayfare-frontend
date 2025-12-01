import React, { useState } from "react";
import {
  Calendar,
  MapPin,
  Building2,
  Sparkles,
  Eye,
  Edit,
  Trash2,
  Phone,
  Share2,
  ChevronRight,
  Clock,
  DollarSign,
  Star,
  Hotel,
  Map,
  Utensils,
  Camera,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  usefetchAiTripPlan,
  useAiTripPlan,
} from "@/modules/user/hooks/use-ai-trip-plan";
import { TravelItineraryProps } from "@/modules/user/types/Ai-trip-plan.type";

const ShortTrip = () => {
  const [activeTab, setActiveTab] = useState("trips");
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedTrip, setSelectedTrip] = useState(null);
  const { shortTrip } = usefetchAiTripPlan();
  const router = useRouter();
  const getActivityIcon = (iconName: any) => {
    const icons = {
      hotel: <Hotel className="w-4 h-4" />,
      camera: <Camera className="w-4 h-4" />,
      utensils: <Utensils className="w-4 h-4" />,
      map: <Map className="w-4 h-4" />,
    };
    return icons[iconName] || <MapPin className="w-4 h-4" />;
  };

  const ShortTripCard = ({ trip }: { trip: TravelItineraryProps }) => {
    const hotel = trip.hotels[0];
    const days = parseInt(trip.duration);

    return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="flex flex-col md:flex-row">
          {/* Thumbnail */}
          <div className="relative w-full md:w-64 h-48 md:h-auto">
            <img
              src="/27478f342a4f36852244127ebf48b485.jpg"
              alt={trip.destination}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1 rounded-full flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-xs font-medium text-white">
                AI Itinerary
              </span>
            </div>
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg">
              <span className="text-xs font-bold text-gray-900">
                {trip.duration}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {trip.destination}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {trip.travelerType} • {days}-day itinerary
                </p>

                <div className="flex flex-wrap gap-3 mb-3">
                  <div className="flex items-center gap-1.5 text-sm text-gray-700 bg-gray-50 px-3 py-1.5 rounded-lg">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span>{trip.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-gray-700 bg-gray-50 px-3 py-1.5 rounded-lg">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span>{trip.budget}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-gray-700 bg-gray-50 px-3 py-1.5 rounded-lg">
                    <Hotel className="w-4 h-4 text-purple-600" />
                    <span>{hotel.hotelName}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-gray-700 bg-gray-50 px-3 py-1.5 rounded-lg">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span>{hotel.rating}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-3">
                  <span className="font-medium">Hotel:</span>{" "}
                  {hotel.description}
                </p>

                <div className="text-sm text-gray-500">
                  Created on{" "}
                  {/* {new Date(trip.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })} */}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="font-medium">
                  {trip.itinerary.length} days planned
                </span>
                <span>•</span>
                <span>
                  {trip.itinerary.reduce(
                    (acc, day) => acc + day.plan.length,
                    0
                  )}{" "}
                  activities
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-1.5">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                <button
                  onClick={() => setSelectedTrip(trip)}
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover: to-cyan-700 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Eye className="w-4 h-4" />
                  View Full Itinerary
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ItineraryModal = ({ trip, onClose }: any) => {
    if (!trip) return null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="relative h-48 bg-gradient-to-r from-purple-600 to-pink-600">
            <img
              src={trip.thumbnail}
              alt={trip.destination}
              className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-3xl font-bold mb-2">{trip.destination}</h2>
                <p className="text-lg">
                  {trip.duration} • {trip.travelerType} Trip
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Hotel Info */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-5 border-b">
            <div className="flex items-start gap-4">
              <div className="bg-white p-3 rounded-lg">
                <Hotel className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-1">
                  {trip.hotels[0].name}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {trip.hotels[0].description}
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-medium">
                      {trip.hotels[0].rating}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-purple-600">
                    ${trip.hotels[0].price}/night
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Itinerary */}

          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              {trip.itinerary.map((day: any, index: any) => (
                <div key={index} className="relative">
                  {/* Day Header */}
                  <div className="sticky top-0 bg-white pb-3 z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-bold">
                        {day.day.startsWith("Day") ? day.day : `Day ${day.day}`}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {day.title || `${day.day}`}
                      </h3>
                    </div>
                  </div>

                  {/* Activities Timeline */}
                  <div className="relative pl-8 space-y-4">
                    {/* Timeline line */}
                    <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-200 to-pink-200"></div>

                    {day.plan.map((activity: any, actIndex: any) => (
                      <div key={actIndex} className="relative">
                        {/* Timeline dot */}
                        <div className="absolute -left-5 top-3 w-6 h-6 bg-white border-2 border-purple-600 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                        </div>

                        {/* Activity card */}
                        <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                          <div className="flex items-start gap-3">
                            <div className="bg-white p-2 rounded-lg text-purple-600">
                              {getActivityIcon(activity.icon)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded">
                                  {activity.time ||
                                    activity.timeToVisit ||
                                    activity.timeToSpend ||
                                    "N/A"}
                                </span>
                              </div>
                              <p className="text-sm font-medium text-gray-900">
                                {activity.placeName || activity.activity}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {activity.placeDetails}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                {activity.ticketPrice ||
                                  activity.ticketPricing ||
                                  ""}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t p-5 bg-gray-50 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Total Budget:{" "}
              <span className="font-bold text-gray-900">{trip.budget}</span>
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  const ShortTripsContent = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              AI-Generated Short Trip Itineraries
            </h2>
            <p className="text-gray-600 mt-1">
              Quick getaway plans created just for you
            </p>
          </div>
          {/* <button className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover: to-cyan-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Generate New Trip
          </button> */}
        </div>

        {shortTrip.length > 0 ? (
          <div className="space-y-4">
            {shortTrip.map((trip) => (
              <ShortTripCard key={trip.id} trip={trip} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <Sparkles className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No short trips yet
            </h3>
            <p className="text-gray-600 mb-6">
              Generate your first AI-powered short trip itinerary
            </p>
            <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors"
            onClick={()=>router.push('/plan-trip')}
            >
              Create Itinerary
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-8">
        <ShortTripsContent />
      </div>

      {/* Itinerary Modal */}
      {selectedTrip && (
        <ItineraryModal
          trip={selectedTrip}
          onClose={() => setSelectedTrip(null)}
        />
      )}
    </div>
  );
};

export default ShortTrip;
