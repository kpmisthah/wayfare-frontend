"use client";
import { BookingStatus } from "@/modules/agency/types/booking.enum";
import { useUserProfile } from "@/modules/user/hooks/use-userprofile";
import { Trip } from "@/modules/user/types/profile.type";
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
} from "lucide-react";
import { useState } from "react";

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
  } = useUserProfile();
  const [tripFilter, setTripFilter] = useState("all");
  // const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  // const [selectedTripForCancel, setSelectedTripForCancel] =
  //   useState<Trip | null>(null);

  const filteredTrips =
    tripFilter === "all"
      ? trips
      : trips.filter((trip) => trip.bookingStatus === tripFilter);
  console.log(filteredTrips, "filtered Tripss");
  const getStatusColor = (status: string) => {
    switch (status) {
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
        {/* Trip Stats */}
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {getTripStatusCount("upcoming")}
            </div>
            <div className="text-sm text-gray-600">Upcoming</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {getTripStatusCount("completed")}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {getTripStatusCount("confirmed")}
            </div>
            <div className="text-sm text-gray-600">Confirmed</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {getTripStatusCount("cancelled")}
            </div>
            <div className="text-sm text-gray-600">Cancelled</div>
          </Card>
        </div> */}

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => setTripFilter("all")}
            variant={tripFilter === "all" ? "default" : "outline"}
            size="sm"
          >
            <Filter className="w-4 h-4 mr-2" />
            All ({trips.length})
          </Button>
          {/* <Button
            onClick={() => setTripFilter("upcoming")}
            variant={tripFilter === "upcoming" ? "default" : "outline"}
            size="sm"
          >
            <Clock className="w-4 h-4 mr-2" />
            Upcoming ({getTripStatusCount("upcoming")})
          </Button> */}
          {/* <Button
            onClick={() => setTripFilter("confirmed")}
            variant={tripFilter === "confirmed" ? "default" : "outline"}
            size="sm"
          >
            <Shield className="w-4 h-4 mr-2" />
            Confirmed ({getTripStatusCount("confirmed")})
          </Button> */}
          {/* <Button
            onClick={() => setTripFilter("completed")}
            variant={tripFilter === "completed" ? "default" : "outline"}
            size="sm"
          >
            <Star className="w-4 h-4 mr-2" />
            Completed ({getTripStatusCount("completed")})
          </Button> */}
          {/* <Button
            onClick={() => setTripFilter("cancelled")}
            variant={tripFilter === "cancelled" ? "default" : "outline"}
            size="sm"
          >
            <X className="w-4 h-4 mr-2" />
            Cancelled ({getTripStatusCount("cancelled")})
          </Button> */}
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
                  {/* <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>
                          {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                        </span>
                      </div> */}
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
                  {/* <div className="flex items-center justify-between">
                        <span className="font-semibold text-lg text-blue-600">${trip.price}</span>
                        {trip.rating && (
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-500 mr-1" />
                            <span>{trip.rating}</span>
                          </div>
                        )}
                      </div> */}
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

                  {/* {trip.bookingStatus === BookingStatus.PENDING && ( */}
                  {trip.bookingStatus == BookingStatus.CONFIRMED && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => handleCancelClick(trip)}
                      >
                        <RefreshCw className="w-4 h-4 mr-1" />
                        Cancel
                      </Button>
                    </>
                  )}

                  {trip.bookingStatus === BookingStatus.CANCELLED && (
                    <div className="w-full text-center">
                      <span className="text-sm text-red-600">
                        {/* Cancelled on {new Date(trip.cancellationDeadline).toLocaleDateString()} */}
                        cancelled
                      </span>
                      <div className="text-sm text-gray-600">Refund:</div>
                    </div>
                  )}
                </div>

                {/* Cancellation Warning for upcoming trips */}
                {(trip.bookingStatus === BookingStatus.PENDING ||
                  trip.bookingStatus === BookingStatus.CONFIRMED) && (
                  <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs">
                    {/* <div className="flex items-center text-yellow-800">
                      <AlertCircle className="w-3 h-3 mr-1" /> */}
                    {/* Cancel by {new Date(trip.cancellationDeadline).toLocaleDateString()} for {trip.refundPercentage}% refund */}
                    {/* cancel by new Date and this percentage */}
                    {/* </div> */}
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
              {tripFilter === "all"
                ? "You haven't booked any trips yet."
                : `No ${tripFilter} trips found.`}
            </p>
            {tripFilter === "all" && (
              <Button className="mt-4">
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
