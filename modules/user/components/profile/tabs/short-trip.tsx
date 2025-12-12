import React, { useState, useEffect } from "react";
import {
  Calendar,
  MapPin,
  Building2,
  Sparkles,
  Eye,
  Edit,
  Trash2,
  Phone,
  ChevronRight,
  Clock,
  DollarSign,
  Star,
  Hotel,
  Map,
  Utensils,
  Camera,
  Search,
  ChevronLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { TravelItineraryProps, DayPlan, Place } from "@/modules/user/types/Ai-trip-plan.type";

const ShortTrip = () => {
  const [activeTab, setActiveTab] = useState("trips");
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedTrip, setSelectedTrip] = useState<TravelItineraryProps | null>(null);
  const [shortTrips, setShortTrips] = useState<TravelItineraryProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const fetchTrips = async (currentPage: number, search: string) => {
    setLoading(true);
    try {
      const response = await api.get("/trip", {
        params: {
          page: currentPage,
          limit: 6,
          search,
        },
      });
      setShortTrips(response.data.trips || []);
      setTotalPages(response.data.totalPages || 1);
      setTotal(response.data.total || 0);
    } catch (error) {
      console.error("Error fetching trips:", error);
      setShortTrips([]);
      setTotalPages(1);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips(page, searchQuery);
  }, [page]);

  // Debounced search effect
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (page === 1) {
        fetchTrips(1, searchQuery);
      } else {
        setPage(1);
      }
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [searchQuery]);

  const getActivityIcon = (iconName: string) => {
    const icons: Record<string, React.ReactNode> = {
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
            <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-500 to-cyan-500 px-3 py-1 rounded-full flex items-center gap-1.5">
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
                    <Hotel className="w-4 h-4 text-blue-600" />
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
                <button
                  onClick={() => setSelectedTrip(trip)}
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-lg transition-colors flex items-center gap-1.5"
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

  const ItineraryModal = ({ trip, onClose }: { trip: TravelItineraryProps | null; onClose: () => void }) => {
    if (!trip) return null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="relative h-48 bg-gradient-to-r from-blue-600 to-cyan-600">
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

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Hotel Info */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-5 rounded-xl mb-6">
              <div className="flex items-start gap-4">
                <div className="bg-white p-3 rounded-lg">
                  <Hotel className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">
                    {trip.hotels[0].name || trip.hotels[0].hotelName}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {trip.hotels[0].hotelAddress}
                  </p>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-medium">{trip.hotels[0].rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium">{trip.hotels[0].price}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{trip.hotels[0].description}</p>
                </div>
              </div>
            </div>

            {/* Itinerary */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                Day-by-Day Itinerary
              </h3>

              {trip.itinerary.map((day: DayPlan, dayIndex: number) => (
                <div key={dayIndex} className="border border-gray-200 rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                      {dayIndex + 1}
                    </div>
                    <h4 className="text-lg font-bold text-gray-900">{day.day}</h4>
                  </div>

                  <div className="space-y-4">
                    {day.plan.map((activity: Place, activityIndex: number) => (
                      <div
                        key={activityIndex}
                        className="flex gap-4 p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        <div className="flex-shrink-0">
                          <div className="bg-white p-2 rounded-lg border border-gray-200">
                            {getActivityIcon(activity.icon || "map")}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h5 className="font-bold text-gray-900 mb-1">
                            {activity.placeName}
                          </h5>
                          <p className="text-sm text-gray-600 mb-2">
                            {activity.placeDetails}
                          </p>
                          <div className="flex flex-wrap gap-3 text-xs text-gray-600">
                            {activity.timeToVisit && (
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>{activity.timeToVisit}</span>
                              </div>
                            )}
                            {activity.ticketPrice && (
                              <div className="flex items-center gap-1">
                                <DollarSign className="w-3 h-3" />
                                <span>{activity.ticketPrice}</span>
                              </div>
                            )}
                            {activity.rating && (
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                <span>{activity.rating}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            My Short Trips
          </h1>
          <p className="text-gray-600">
            View and manage your AI-generated trip itineraries
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search destinations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Results Info */}
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-gray-600">
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  Searching...
                </span>
              ) : (
                <>
                  Showing <span className="font-semibold text-gray-900">{shortTrips.length}</span> of{" "}
                  <span className="font-semibold text-gray-900">{total}</span> trips
                  {searchQuery && (
                    <span className="text-blue-600">
                      {" "}matching "<span className="font-medium">{searchQuery}</span>"
                    </span>
                  )}
                </>
              )}
            </span>
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setPage(1);
                }}
                className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear search
              </button>
            )}
          </div>
        </div>

        {/* Trips Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : shortTrips.length === 0 ? (
          <div className="text-center py-20">
            <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No trips found
            </h3>
            <p className="text-gray-600">
              {searchQuery
                ? "Try a different search term"
                : "Start planning your first trip!"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {shortTrips.map((trip, index) => (
              <ShortTripCard key={trip.id || index} trip={trip} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`px-4 py-2 rounded-lg ${page === pageNum
                    ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white"
                    : "border border-gray-300 hover:bg-gray-50"
                    }`}
                >
                  {pageNum}
                </button>
              ))}
            </div>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedTrip && (
        <ItineraryModal trip={selectedTrip} onClose={() => setSelectedTrip(null)} />
      )}
    </div>
  );
};

export default ShortTrip;
