import { Plus, Trash2, Users, X, Check, Clock, XCircle } from "lucide-react";
import { useState } from "react";
import { BookingData } from "../../types/booking.type";
import { useUpdateBookingStatus, useViewBookings } from "../../hooks/use-booking";
import { BookingStatus } from "../../types/booking.enum";

export const BookingsView = ({ pkg, onClose }) => {
  const { booking,setBooking } = useViewBookings(pkg.id);
  const {changeStatus} = useUpdateBookingStatus(setBooking);
  const [selectedBooking, setSelectedBooking] = useState<string|null>(null);

  // const totalRevenue = (pkg.bookings || []).reduce(
  //   (sum, b) => sum + b.numberOfPeople * pkg.pricePerPerson,
  //   0
  // );
  // const totalGuests = (pkg.bookings || []).reduce(
  //   (sum, b) => sum + parseInt(b.numberOfPeople),
  //   0
  // );

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return <Check className="w-3 h-3" />;
      case "pending":
        return <Clock className="w-3 h-3" />;
      case "cancelled":
        return <XCircle className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const handleStatusChange = async (bookingId:string, newStatus:BookingStatus) => {
    await changeStatus(bookingId, newStatus);
    console.log(`Update booking ${bookingId} to status: ${newStatus}`);
    setSelectedBooking(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            {pkg.title} - Bookings
          </h2>
          <p className="text-gray-600 mt-1">
            {pkg.destination} • {pkg.totalDays} days
          </p>
        </div>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>
      </div>

      {/* <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Total Bookings</p>
          <p className="text-2xl font-bold text-purple-600">
            {pkg.bookings?.length || 0}
          </p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Total Guests</p>
          <p className="text-2xl font-bold text-blue-600">{totalGuests}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Total Revenue</p>
          <p className="text-2xl font-bold text-green-600">${totalRevenue}</p>
        </div>
      </div> */}
      
      <div className="space-y-4">
        {booking && booking.length > 0 ? (
          booking.map((booking: BookingData) => (
            <div
              key={booking.id}
              className="bg-white border-2 border-gray-200 p-6 rounded-lg hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h4 className="text-xl font-semibold text-gray-800">
                      {booking.customerName}
                    </h4>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getStatusColor(
                        booking.status || "confirmed"
                      )}`}
                    >
                      {getStatusIcon(booking.status || "confirmed")}
                      {(booking.status || "confirmed").charAt(0).toUpperCase() +
                        (booking.status || "confirmed").slice(1)}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-gray-800">{booking.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="text-gray-800">{booking.phone}</p>
                    </div>
                         <div>
                      <p className="text-sm text-gray-500">Destination</p>
                      <p className="text-gray-800">{booking.destination}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Guests</p>
                      <p className="text-gray-800 font-semibold">
                        {booking.totalPeople}{" "}
                        {booking.totalPeople > 1 ? "people" : "person"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Travel Date</p>
                      <p className="text-gray-800">
                        {booking.travelDate}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total Amount</p>
                      <p className="text-gray-800 font-bold text-green-600">
                        ${booking.totalAmount}
                      </p>
                    </div>
                    <div>
                      {/* <p className="text-sm text-gray-500">Booked On</p> */}
                      {/* <p className="text-gray-800">
                        {booking.bookedAt
                          ? new Date(booking.bookedAt).toLocaleDateString()
                          : "-"}
                      </p> */}
                    </div>
                  </div>
                </div>

                <div className="ml-4 flex items-center gap-2">
                  <div className="relative">
                    <button
                      onClick={() =>
                        setSelectedBooking(
                          selectedBooking === booking.id ? null : booking.id
                        )
                      }
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                    >
                      Change Status
                    </button>

                    {selectedBooking === booking.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                        <button
                          onClick={() =>
                            handleStatusChange(booking.id, BookingStatus.CONFIRMED)
                          }
                          className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-2 text-sm"
                        >
                          <Check className="w-4 h-4 text-green-600" />
                          <span>Confirm Booking</span>
                        </button>
                        <button
                          onClick={() =>
                            handleStatusChange(booking.id,BookingStatus.PENDING)
                          }
                          className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-2 text-sm border-t"
                        >
                          <Clock className="w-4 h-4 text-yellow-600" />
                          <span>Mark as Pending</span>
                        </button>
                        <button
                          onClick={() =>
                            handleStatusChange(booking.id,BookingStatus.CANCELLED)
                          }
                          className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-2 text-sm border-t"
                        >
                          <XCircle className="w-4 h-4 text-red-600" />
                          <span>Cancel Booking</span>
                        </button>
                                  <button
                          onClick={() =>
                            handleStatusChange(booking.id,BookingStatus.COMPLETED)
                          }
                          className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-2 text-sm border-t"
                        >
                          <XCircle className="w-4 h-4 text-red-600" />
                          <span>Completed Booking</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Users size={48} className="mx-auto text-gray-400 mb-3" />
            <p className="text-gray-600 text-lg">No bookings yet</p>
            <p className="text-gray-500 text-sm mt-1">
              Add your first booking to get started
            </p>
          </div>
        )}
      </div>
    </div>
  );
};