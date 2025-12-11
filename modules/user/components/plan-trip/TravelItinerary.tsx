"use client";
import { ItineraryOverview } from "./ItineraryOverview";
import { HotelCard } from "./HotelCard";
import { DayItinerary } from "./Dayitinerary";
import { useAiTripPlan, useFetchtravellers } from "../../hooks/use-ai-trip-plan";
import { Header } from "@/shared/components/layout/Header";
import { useState } from "react";
import { Users } from "lucide-react";
import { ProfileModal, TravelCompanionProfile } from "./mathing-profile";
import { useRouter } from "next/navigation";

type Traveler = {
  id: string,
  destination: string,
  startDate: string,
  name: string,
  profileImage: string,
  location: string
};

export function TravelItinerary({ id, destination }: { id: string, destination: string }) {
  const { travellersData } = useFetchtravellers(destination)
  const { tripPlan } = useAiTripPlan(id, destination);
  const router = useRouter()
  const [selectedTraveler, setSelectedTraveler] = useState<Traveler | null>(
    null
  );
  const [connectionStatuses, setConnectionStatuses] = useState<
    Record<string, string>
  >({});
  const [showAll, setShowAll] = useState(false);

  const handleViewProfile = (traveler: Traveler) => {
    setSelectedTraveler(traveler);
  };

  const handleConnect = (travelerId: string) => {
    setConnectionStatuses((prev) => ({
      ...prev,
      [travelerId]: "pending",
    }));

    setTimeout(() => {
      setConnectionStatuses((prev) => ({
        ...prev,
        [travelerId]: "connected",
      }));
    }, 2000);

    console.log("Connection request sent to:", travelerId);
  };

  const getConnectionStatus = (travelerId: string) => {
    return connectionStatuses[travelerId] || "none";
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <ItineraryOverview
          destination={tripPlan.destination}
          duration={tripPlan.duration}
          budget={tripPlan.budget}
          travelerType={tripPlan.travelerType}
        />

        {/* Hotels Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              Recommended Hotels
            </h2>
            <div className="h-px bg-border flex-1" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {tripPlan.hotels.map((hotel, index) => (
              <HotelCard key={index} hotel={hotel} />
            ))}
          </div>
        </div>

        {/* Itinerary Section */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              Your Daily Itinerary
            </h2>
            <div className="h-px bg-border flex-1" />
          </div>
          <div className="space-y-6">
            {tripPlan.itinerary.map((dayPlan, index) => (
              <DayItinerary
                key={index}
                day={dayPlan.day}
                places={dayPlan.plan}
                isOpen={index === 0}
              />
            ))}
          </div>
        </div>

        {/* Travel Companions Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">
              Connect with Fellow Travelers
            </h2>
            <div className="h-px bg-border flex-1" />
          </div>
          <p className="text-muted-foreground mb-6">
            Meet other travelers heading to {tripPlan.destination}. Click on a
            profile to learn more and connect!
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-4">
            {travellersData.map((traveler) => (
              <TravelCompanionProfile
                key={traveler.id}
                traveler={traveler}
                onViewProfile={handleViewProfile}
              />
            ))}
          </div>
          <div className="text-center">
            <button
              onClick={() => router.push('/connection')}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              View All
            </button>
          </div>
        </div>
      </div>
      {/* Profile Modal */}
      {selectedTraveler && (
        <ProfileModal
          traveler={selectedTraveler}
          onClose={() => setSelectedTraveler(null)}
          onConnect={handleConnect}
          connectionStatus={getConnectionStatus(selectedTraveler.id) as "none" | "pending" | "connected"}
        />
      )}
    </div>
  );
}
