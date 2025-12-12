"use client";
import { BookingStatus } from "@/modules/agency/types/booking.enum";
import { useUserProfile } from "@/modules/user/hooks/use-userprofile";
import Modal from "@/shared/components/common/Modal";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { TabsContent } from "@/shared/components/ui/tabs";
import {
  AlertCircle,
  Clock,
  Download,
  Filter,
  Plane,
  Plus,
  RefreshCw,
  Shield,
  Star,
  Users,
  X,
  Search,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const Trips = () => {
  const {
    trips,
    cancelBooking,
    handleCancelClick,
    selectedTripForCancel,
    cancelDialogOpen,
    setCancelDialogOpen,
    page,
    totalPages,
    loadMore,
    isLoadingTrips,
    tripSearch,
    setTripSearch,
    tripStatus,
    setTripStatus,
    totalTrips,
  } = useUserProfile();

  const router = useRouter();
  const filteredTrips = trips;
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-orange-100 text-orange-800 border-orange-300";
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const getTripStatusCount = (status: string) => {
    return trips.filter((trip) => trip.bookingStatus === status).length;
  };
  return (
    <>
      {cancelDialogOpen && selectedTripForCancel && (
        <Modal
          isOpen={cancelDialogOpen}
          onClose={() => setCancelDialogOpen(false)}
          title="Cancellation Policy"
          size="md"
        >
          <p className="mb-4">
            You are cancelling{" "}
            <strong>{selectedTripForCancel?.destination}</strong> trip.
            <br />
            100% refund if cancelled more than 7 days before the trip. 50%
            refund if cancelled between 4 to 7 days before the trip. No refund
            if cancelled less than 4 days before the trip.
          </p>

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setCancelDialogOpen(false)}
            >
              Close
            </Button>

            <Button
              variant="destructive"
              onClick={async () => {
                await cancelBooking(selectedTripForCancel?.id);
                setCancelDialogOpen(false);
              }}
            >
              Confirm
            </Button>
          </div>
        </Modal>
      )}

      <TabsContent value="trips" className="space-y-6">
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by destination, agency, or booking code..."
              value={tripSearch}
              onChange={(e) => setTripSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {tripSearch && (
              <button
                onClick={() => setTripSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => setTripStatus("all")}
              variant={tripStatus === "all" ? "default" : "outline"}
              size="sm"
            >
              <Filter className="w-4 h-4 mr-2" />
              All ({totalTrips})
            </Button>

          </div>
        </div>

        {/* Trips Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrips.map((trip) => (
            <Card
              key={trip.id}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-48">
                <img
                  src={trip.photo?.[0]}
                  alt={trip.destination}
                  className="w-full h-full object-cover"
                />
                <Badge
                  className={`absolute top-3 right-3 ${getStatusColor(
                    trip.bookingStatus
                  )}`}
                >
                  {trip.bookingStatus}
                </Badge>
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">{trip.destination}</h3>
                </div>

                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Plane className="w-4 h-4 mr-2" />
                    <span>{trip.agencyName}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    <span>
                      {trip.travellers} traveler{trip.travellers > 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Plane className="w-4 h-4 mr-2" />
                    <span>Planned Date:{trip.travelDate}</span>
                  </div>
                </div>

                {trip.highlights && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {/* {trip.highlights.map((highlight, index) => ( */}
                      <Badge variant="secondary" className="text-xs">
                        {trip.highlights}
                      </Badge>
                      {/* ))} */}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {trip.bookingStatus === BookingStatus.COMPLETED && (
                    <Button size="sm" variant="outline" className="flex-1">
                      <Download className="w-4 h-4 mr-1" />
                      Receipt
                    </Button>
                  )}

                  {/* Pending Payment - Retry Option */}
                  {trip.bookingStatus === BookingStatus.PENDING && (
                    <div className="w-full space-y-2">
                      <div className="flex items-center gap-2 p-2 bg-orange-50 border border-orange-200 rounded-lg">
                        <AlertCircle className="w-4 h-4 text-orange-600 flex-shrink-0" />
                        <span className="text-xs text-orange-700">
                          Payment pending. Complete payment to confirm your booking.
                        </span>
                      </div>
                      <a
                        href={`/booking/retry-payment/${trip.id}`}
                        className="flex items-center justify-center gap-2 w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                      >
                        <RefreshCw className="w-4 h-4" />
                        Complete Payment
                      </a>
                    </div>
                  )}

                  {trip.bookingStatus == BookingStatus.CONFIRMED && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => handleCancelClick(trip)}
                      >
                        <X className="w-4 h-4 mr-1" />
                        Cancel
                      </Button>
                    </>
                  )}

                  {trip.bookingStatus === BookingStatus.CANCELLED && (
                    <div className="w-full text-center">
                      <span className="text-sm text-red-600">
                        Booking Cancelled
                      </span>
                    </div>
                  )}
                </div>

                {/* Cancellation Warning for confirmed trips only */}
                {trip.bookingStatus === BookingStatus.CONFIRMED && (
                  <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded text-xs">
                    <div className="flex items-center text-blue-700">
                      <Shield className="w-3 h-3 mr-1" />
                      <span>Cancel for a refund based on our cancellation policy</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        {page < totalPages && (
          <div className="text-center mt-6">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={loadMore}
            >
              Load More
            </button>
          </div>
        )}
        {filteredTrips.length === 0 && (
          <div className="text-center py-12">
            <Plane className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              No trips found
            </h3>
            <p className="text-gray-500">
              {tripStatus === "all"
                ? "You haven't booked any trips yet."
                : `No ${tripStatus} trips found.`}
            </p>
            {tripStatus === "all" && (
              <Button className="mt-4" onClick={() => router.push("/plan-trip")}>
                <Plus className="w-4 h-4 mr-2" />
                Plan New Trip
              </Button>
            )}
          </div>
        )}
      </TabsContent>
    </>
  );
};
