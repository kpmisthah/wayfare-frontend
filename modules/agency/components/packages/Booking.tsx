import { Plus, Trash2, Users, X } from "lucide-react";
import { useState } from "react";

export const BookingsView = ({ pkg, onClose }) => {
  //onAddBooking, onDeleteBooking
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    customerName: "",
    email: "",
    phone: "",
    numberOfPeople: 1,
    travelDate: "",
    notes: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // onAddBooking(pkg.id, bookingForm);
    setBookingForm({
      customerName: "",
      email: "",
      phone: "",
      numberOfPeople: 1,
      travelDate: "",
      notes: "",
    });
    setShowBookingForm(false);
  };

  const totalRevenue = (pkg.bookings || []).reduce(
    (sum, b) => sum + b.numberOfPeople * pkg.pricePerPerson,
    0
  );
  const totalGuests = (pkg.bookings || []).reduce(
    (sum, b) => sum + parseInt(b.numberOfPeople),
    0
  );

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

      <div className="grid grid-cols-3 gap-4 mb-6">
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
      </div>

      <button
        onClick={() => setShowBookingForm(!showBookingForm)}
        className="mb-6 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
      >
        <Plus size={18} /> Add Booking
      </button>

      {/* {showBookingForm && (
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold mb-4">New Booking</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Customer Name *
                </label>
                <input
                  type="text"
                  required
                  value={bookingForm.customerName}
                  onChange={(e) =>
                    setBookingForm({
                      ...bookingForm,
                      customerName: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={bookingForm.email}
                  onChange={(e) =>
                    setBookingForm({ ...bookingForm, email: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  required
                  value={bookingForm.phone}
                  onChange={(e) =>
                    setBookingForm({ ...bookingForm, phone: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Number of People *
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={bookingForm.numberOfPeople}
                  onChange={(e) =>
                    setBookingForm({
                      ...bookingForm,
                      numberOfPeople: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Travel Date *
                </label>
                <input
                  type="date"
                  required
                  value={bookingForm.travelDate}
                  onChange={(e) =>
                    setBookingForm({
                      ...bookingForm,
                      travelDate: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Notes</label>
                <input
                  type="text"
                  value={bookingForm.notes}
                  onChange={(e) =>
                    setBookingForm({ ...bookingForm, notes: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Add Booking
              </button>
              <button
                type="button"
                onClick={() => setShowBookingForm(false)}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )} */}

      <div className="space-y-4">
        {pkg.bookings && pkg.bookings.length > 0 ? (
          pkg.bookings.map((booking) => (
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
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                      Confirmed
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
                      <p className="text-sm text-gray-500">Guests</p>
                      <p className="text-gray-800 font-semibold">
                        {booking.numberOfPeople}{" "}
                        {booking.numberOfPeople > 1 ? "people" : "person"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Travel Date</p>
                      <p className="text-gray-800">
                        {new Date(booking.travelDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total Amount</p>
                      <p className="text-gray-800 font-bold text-green-600">
                        ${booking.numberOfPeople * pkg.pricePerPerson}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Booked On</p>
                      <p className="text-gray-800">
                        {new Date(booking.bookedAt).toLocaleDateString()}
                      </p>
                    </div>
                    {booking.notes && (
                      <div className="col-span-2">
                        <p className="text-sm text-gray-500">Notes</p>
                        <p className="text-gray-800">{booking.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => onDeleteBooking(pkg.id, booking.id)}
                  className="ml-4 text-red-600 hover:text-red-800 p-2"
                >
                  <Trash2 size={20} />
                </button>
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