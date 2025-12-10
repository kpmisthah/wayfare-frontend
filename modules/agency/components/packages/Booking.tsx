import { useState } from "react";
import { Check, Clock, XCircle, AlertCircle, X } from "lucide-react";
import { BookingData } from "../../types/booking.type";
import {
  useUpdateBookingStatus,
  useViewBookings,
} from "../../hooks/use-booking";
import { BookingStatus } from "../../types/booking.enum";
import Modal from "@/shared/components/common/Modal";

export const BookingsView = ({
  pkg,
  onClose,
}: {
  pkg: any;
  onClose: () => void;
}) => {
  const { booking, setBooking } = useViewBookings(pkg.id);
  const {
    openConfirmModal,
    modal,
    confirmStatusChange,
    closeModal,
    loading,
    errorModal,
    closeErrorModal,
  } = useUpdateBookingStatus(setBooking);

  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  const getStatusConfig = (status: BookingStatus) => {
    switch (status) {
      case BookingStatus.CONFIRMED:
        return { color: "green", icon: Check, label: "Confirm Booking" };
      case BookingStatus.PENDING:
        return { color: "yellow", icon: Clock, label: "Mark as Pending" };
      case BookingStatus.CANCELLED:
        return { color: "red", icon: XCircle, label: "Cancel Booking" };
      case BookingStatus.COMPLETED:
        return { color: "blue", icon: Check, label: "Mark as Completed" };
      default:
        return { color: "gray", icon: AlertCircle, label: "Unknown" };
    }
  };

  const getStatusBadge = (status: BookingStatus) => {
    const config = getStatusConfig(status);
    const Icon = config.icon;
    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 bg-${config.color}-100 text-${config.color}-700`}
      >
        <Icon className="w-3 h-3" />
        {status.charAt(0) + status.slice(1).toLowerCase()}
      </span>
    );
  };

  return (
    <>
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
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          {booking && booking.length > 0 ? (
            booking.map((bookingItem: BookingData) => (
              <div
                key={bookingItem.id}
                className="bg-white border-2 border-gray-200 p-6 rounded-lg hover:shadow-md transition"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h4 className="text-xl font-semibold text-gray-800">
                        {bookingItem.customerName}
                      </h4>
                      {getStatusBadge(bookingItem.status)}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Email</p>
                        <p className="text-gray-800">{bookingItem.email}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Phone</p>
                        <p className="text-gray-800">{bookingItem.phone}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Guests</p>
                        <p className="font-semibold">
                          {bookingItem.totalPeople}{" "}
                          {bookingItem.totalPeople > 1 ? "people" : "person"}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Amount</p>
                        <p className="font-bold text-green-600">
                          ${bookingItem.totalAmount}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Change Status Button + Dropdown */}
                  <div className="relative ml-4">
                    <button
                      onClick={() =>
                        setDropdownOpen(
                          dropdownOpen === bookingItem.id
                            ? null
                            : bookingItem.id
                        )
                      }
                      className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition"
                    >
                      Change Status
                    </button>

                    {/* Dropdown Menu */}
                    {dropdownOpen === bookingItem.id && (
                      <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl z-20 overflow-hidden">
                        {Object.values(BookingStatus).map((status) => {
                          const config = getStatusConfig(status);
                          const Icon = config.icon;

                          return (
                            <button
                              key={status}
                              onClick={(e) => {
                                e.stopPropagation();
                                openConfirmModal(bookingItem, status); // correct variable!
                                setDropdownOpen(null); // close dropdown
                              }}
                              className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3 text-sm transition"
                            >
                              <Icon
                                className={`w-4 h-4 text-${config.color}-600`}
                              />
                              <span>{config.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-xl">
              <p className="text-xl text-gray-600">No bookings yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Confirm Modal */}
      <Modal
        isOpen={modal.isOpen}
        onClose={closeModal}
        title="Confirm Status Change"
        subtitle={`Booked by ${modal.booking?.customerName}`}
        size="md"
      >
        <div className="space-y-6 py-4">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold mt-4">Are you sure?</h3>
            <p className="text-gray-600 mt-2">
              You want to change this booking to
              <strong className="mx-1">
                {modal.newStatus && getStatusConfig(modal.newStatus).label}
              </strong>
            </p>
            {modal.newStatus === BookingStatus.CANCELLED && (
              <p className="text-red-600 font-medium mt-3">
                This action cannot be undone.
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={closeModal}
              disabled={loading}
              className="px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={confirmStatusChange}
              disabled={loading}
              className={`px-6 py-2.5 rounded-lg text-white font-medium flex items-center gap-2 ${
                modal.newStatus === BookingStatus.CANCELLED
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Updating..." : "Yes, Confirm"}
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={errorModal.isOpen}
        onClose={closeErrorModal}
        title="Cannot Change Status"
        size="sm"
      >
        <div className="text-center py-6">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
          <p className="text-gray-700 max-w-xs mx-auto">{errorModal.message}</p>
          <button
            onClick={closeErrorModal}
            className="mt-6 px-6 py-2.5 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
          >
            Got it
          </button>
        </div>
      </Modal>
    </>
  );
};
