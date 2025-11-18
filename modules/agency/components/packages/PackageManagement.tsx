// import { useState } from "react";
// import { Column, Table } from "@/shared/components/common/Table";
// import { Button } from "@/shared/components/ui/button";
// import { Edit } from "lucide-react";
// import { useFetchPackages } from "../../hooks/use-fetch-packages";
// import { Package, PackageData, PackageListing } from "../../types/package.type";
// import { EditPackageModal } from "./Edit-package-modal";
// import { updatedPackage } from "../../services/package.api";
// import { PackageStatus } from "../../types/package.enum";

// export const PackageManagement = () => {
// const { packages, setPackages,nextPage,prevPage,setPage,page,totalPage } = useFetchPackages();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedPackage, setSelectedPackage] = useState<PackageListing | null>(
//     null
//   );
//   const handleEditUser = (pkg: PackageListing) => {
//     setSelectedPackage(pkg);
//     setIsModalOpen(true);
//   };

//   const handleToggleBlockUser = (pkg: PackageListing) => {
//     // Implement your toggle logic here
//     console.log("Toggle status for:", pkg);
//   };

//   const handleSavePackage = async (updatepkg: Partial<Package>) => {
//     console.log(updatepkg, "updatapkks");
//     console.log("selected pacakge", selectedPackage?.id);
//     const response = await updatedPackage(updatepkg, selectedPackage?.id);
//     setPackages((prev) =>
//       prev.map((pkg) =>
//         pkg.id == selectedPackage?.id ? { ...pkg, ...response } : pkg
//       )
//     );
//   };

//   const columns: Column<PackageListing>[] = [
//     {
//       header: "Itinerary Name",
//       accessor: "title",
//     },
//     {
//       header: "Destination",
//       accessor: "destination",
//     },
//     {
//       header: "Duration",
//       accessor: "duration",
//     },
//     {
//       header: "Status",
//       accessor: "status",
//     },
//     {
//       header: "Actions",
//       renderProps: (pkg: PackageListing) => (
//         <div className="flex items-center space-x-2">
//           <Button variant="ghost" size="sm" onClick={() => handleEditUser(pkg)}>
//             <Edit className="w-4 h-4" />
//           </Button>
//           <Button
//             variant={
//               pkg.status === PackageStatus.ACTIVE ? "default" : "destructive"
//             }
//             size="sm"
//             onClick={() => handleToggleBlockUser(pkg)}
//           >
//             {pkg.status === PackageStatus.ACTIVE ? "Inactive" : "Active"}
//           </Button>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <>
//       <Table
//         title="Package Management"
//         description="Manage your Travel Packages and Itineraries"
//         col={columns}
//         data={packages}
//       />
//       <div className="flex justify-between items-center mt-6">
//         <Button
//           disabled={page === 1}
//           onClick={prevPage}
//           variant="outline"
//         >
//           Previous
//         </Button>
//         <span className="text-sm text-gray-600">
//           Page {page} of {totalPage}
//         </span>
//         <Button
//           disabled={page == totalPage}
//           onClick={nextPage}
//           variant="outline"
//         >
//           Next
//         </Button>
//       </div>
//       <EditPackageModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         package={selectedPackage}
//         onSave={handleSavePackage}
//       />
//     </>
//   );
// };
//....................................................
import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  Users,
  Calendar,
  MapPin,
  DollarSign,
  X,
} from "lucide-react";
import { useFetchPackages } from "../../hooks/use-fetch-packages";
import { PackageData } from "../../types/package.type";
import { useAddPackage } from "../../hooks/use-add-package";
import { AddPackageForm } from "./basic-info";
import { BookingsView } from "./Booking";

export const PackageManagement = () => {
  const {
    packages,
    setPackages,
    nextPage,
    prevPage,
    setPage,
    page,
    totalPage,
  } = useFetchPackages();
  const {
    showForm,
    setShowForm,
    setEditingPackage,
    setFormData,
    initialFormData,
    handleEdit,
    handleDelete,
    formData,
    editingPackage,
    handlePublish,
    handleFileChange,
    handleInputChange,
    packageData,
    setPackageData,
    handleItineraryChange,
    removeArrayField,
    isPublishing
  } = useAddPackage(setPackages);
  const [viewingPackage, setViewingPackage] = useState<PackageData | null>(
    null)
  const [showBookings, setShowBookings] = useState(null);
  return (
    <div className="min-h-screen bg-gradient-to-br ">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Travel Package Management
          </h1>
          <button
            onClick={() => {
              setShowForm(true);
              setEditingPackage(null);
              setFormData(initialFormData);
            }}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition"
          >
            <Plus size={20} /> Add Package
          </button>
        </div>

        {/* Package List */}
        {!showForm && !viewingPackage && !showBookings && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(!packages||packages.length === 0) ? (
              <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-600">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4076/4076500.png"
                  alt="No packages"
                  className="w-28 h-28 opacity-80 mb-4"
                />
                <h2 className="text-xl font-semibold mb-2">
                  No Packages Available
                </h2>
                <p className="text-gray-500 mb-4">
                  Start by adding your first travel package.
                </p>

                <button
                  onClick={() => {
                    setShowForm(true);
                    setFormData(initialFormData);
                    setEditingPackage(null)
                  }}
                  className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  + Add Package
                </button>
              </div>
            ) : (
              packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition"
                >
                  <div className="h-48 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                    {pkg.picture && pkg.picture.length > 0 ? (
                      <img
                        src={pkg.picture[0]}
                        alt={pkg.title}
                        className="h-48 w-full object-cover"
                      />
                    ) : (
                      <div className="h-48 flex items-center justify-center text-white text-lg">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin size={18} className="text-indigo-600" />
                        <span>{pkg.destination}</span>
                      </div>

                      <div className="flex items-center gap-2 text-gray-600">
                        <DollarSign size={18} className="text-green-600" />
                        <span className="font-semibold">
                          ${pkg.price} per person
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar size={18} className="text-blue-600" />
                        <span>{pkg.duration} days</span>
                      </div>

                      <div className="flex items-center gap-2 text-gray-600">
                        <Users size={18} className="text-purple-600" />
                        <span className="font-semibold">
                          {/* {pkg.bookings?.length || 0} bookings */}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setViewingPackage(pkg)}
                        className="flex-1 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition flex items-center justify-center gap-1"
                      >
                        <Eye size={16} /> View
                      </button>

                      <button
                        onClick={() => setShowBookings(pkg)}
                        className="flex-1 bg-purple-100 text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-200 transition flex items-center justify-center gap-1"
                      >
                        <Users size={16} /> Bookings
                      </button>
                    </div>

                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleEdit(pkg)}
                        className="flex-1 bg-amber-100 text-amber-700 px-4 py-2 rounded-lg hover:bg-amber-200 transition flex items-center justify-center gap-1"
                      >
                        <Edit2 size={16} /> Edit
                      </button>

                      <button
                        onClick={() => handleDelete(pkg.id)}
                        className="flex-1 bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition flex items-center justify-center gap-1"
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Package Form */}
        <AddPackageForm
          showForm={showForm}
          setShowForm={setShowForm}
          editingPackage={editingPackage}
          formData={formData}
          setFormData={setFormData}
          handlePublish={handlePublish}
          handleFileChange={handleFileChange}
          packageData={packageData}
          setPackageData={setPackageData}
          handleItineraryChange={handleItineraryChange}
          removeArrayField={removeArrayField}
          initialFormData={initialFormData}
          handleInputChange={handleInputChange}
          isPublishing={isPublishing}
        />
        {/* View Package Details */}
        {viewingPackage && (
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-3xl font-bold text-gray-800">
                {viewingPackage.title}
              </h2>
              <button
                onClick={() => setViewingPackage(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Destination</p>
                  <p className="text-xl font-semibold">
                    {viewingPackage.destination}
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Price Per Person</p>
                  <p className="text-xl font-semibold">
                    ${viewingPackage.price}
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="text-xl font-semibold">
                    {viewingPackage.duration} days
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Total Bookings</p>
                  <p className="text-xl font-semibold">
                    {viewingPackage.bookings?.length || 0}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Package Summary</h3>
                <p className="text-gray-700">{viewingPackage.description}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Itinerary</h3>
                <div className="space-y-3">
                  {viewingPackage.itinerary
                    .filter((i) => i)
                    .map((item, index) => (
                      <div
                        key={index}
                        className="border rounded-lg p-3 bg-gray-50"
                      >
                        <div className="flex items-center gap-3 mb-1">
                          <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                            Day {item.day || index + 1}
                          </span>
                          <span className="text-gray-800 font-semibold">
                            {item.activities}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Meals: {item.meals}
                        </p>
                        <p className="text-sm text-gray-600">
                          Stay: {item.accommodation}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Primary Transport Mode
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { value: "Flight", icon: "✈️", desc: "Air Travel" },
                    { value: "Train", icon: "🚆", desc: "Railway" },
                    { value: "Bus", icon: "🚌", desc: "Road Transport" },
                    {
                      value: "Private Vehicle",
                      icon: "🚗",
                      desc: "Private Car/Van",
                    },
                  ].map(({ value, icon, desc }) => (
                    <label
                      key={value}
                      className={`flex flex-col items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                        viewingPackage.vehicle === value
                          ? "border-indigo-500 bg-indigo-50"
                          : "border-gray-200 hover:bg-indigo-50 hover:border-indigo-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="transportMode"
                        className="sr-only"
                        value={value}
                        checked={viewingPackage.vehicle === value}
                        onChange={(e) =>
                          setFormData({ ...formData, vehicle: e.target.value })
                        }
                      />
                      <span className="text-3xl mb-2">{icon}</span>
                      <div className="text-center">
                        <div className="font-semibold text-sm">{value}</div>
                        <div className="text-xs text-gray-500">{desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Pickup Point
                  </label>
                  <input
                    type="text"
                    value={formData.pickupPoint}
                    onChange={(e) =>
                      setFormData({ ...formData, pickupPoint: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="e.g., Mumbai Airport / Railway Station"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Drop Point
                  </label>
                  <input
                    type="text"
                    value={formData.dropPoint}
                    onChange={(e) =>
                      setFormData({ ...formData, dropPoint: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="e.g., Mumbai Airport / Railway Station"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Transportation Details
                </h3>
                <p className="text-gray-700">
                  {viewingPackage.details || "N/A"}
                </p>
              </div>

              {viewingPackage.picture.filter((g) => g).length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-2">Gallery</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {viewingPackage.picture
                      .filter((g) => g)
                      .map((url, index) => (
                        <div
                          key={index}
                          className="aspect-video bg-gray-200 rounded-lg overflow-hidden"
                        >
                          <img
                            src={url}
                            alt={`Gallery ${index + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) =>
                              (e.target.src =
                                'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23ddd" width="100" height="100"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle"%3EImage%3C/text%3E%3C/svg%3E')
                            }
                          />
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Bookings View */}
        {showBookings && (
          <BookingsView
            pkg={showBookings}
            onClose={() => setShowBookings(null)}
            // onAddBooking={addBooking}
            // onDeleteBooking={deleteBooking}
          />
        )}
      </div>
    </div>
  );
};

// const BookingsView = ({ pkg, onClose }) => {
//   //onAddBooking, onDeleteBooking
//   const [showBookingForm, setShowBookingForm] = useState(false);
//   const [bookingForm, setBookingForm] = useState({
//     customerName: "",
//     email: "",
//     phone: "",
//     numberOfPeople: 1,
//     travelDate: "",
//     notes: "",
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // onAddBooking(pkg.id, bookingForm);
//     setBookingForm({
//       customerName: "",
//       email: "",
//       phone: "",
//       numberOfPeople: 1,
//       travelDate: "",
//       notes: "",
//     });
//     setShowBookingForm(false);
//   };

//   const totalRevenue = (pkg.bookings || []).reduce(
//     (sum, b) => sum + b.numberOfPeople * pkg.pricePerPerson,
//     0
//   );
//   const totalGuests = (pkg.bookings || []).reduce(
//     (sum, b) => sum + parseInt(b.numberOfPeople),
//     0
//   );

//   return (
//     <div className="bg-white rounded-xl shadow-lg p-8 max-w-6xl mx-auto">
//       <div className="flex justify-between items-start mb-6">
//         <div>
//           <h2 className="text-3xl font-bold text-gray-800">
//             {pkg.title} - Bookings
//           </h2>
//           <p className="text-gray-600 mt-1">
//             {pkg.destination} • {pkg.totalDays} days
//           </p>
//         </div>
//         <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
//           <X size={24} />
//         </button>
//       </div>

//       <div className="grid grid-cols-3 gap-4 mb-6">
//         <div className="bg-purple-50 p-4 rounded-lg">
//           <p className="text-sm text-gray-600">Total Bookings</p>
//           <p className="text-2xl font-bold text-purple-600">
//             {pkg.bookings?.length || 0}
//           </p>
//         </div>
//         <div className="bg-blue-50 p-4 rounded-lg">
//           <p className="text-sm text-gray-600">Total Guests</p>
//           <p className="text-2xl font-bold text-blue-600">{totalGuests}</p>
//         </div>
//         <div className="bg-green-50 p-4 rounded-lg">
//           <p className="text-sm text-gray-600">Total Revenue</p>
//           <p className="text-2xl font-bold text-green-600">${totalRevenue}</p>
//         </div>
//       </div>

//       <button
//         onClick={() => setShowBookingForm(!showBookingForm)}
//         className="mb-6 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
//       >
//         <Plus size={18} /> Add Booking
//       </button>

//       {showBookingForm && (
//         <div className="bg-gray-50 p-6 rounded-lg mb-6">
//           <h3 className="text-xl font-semibold mb-4">New Booking</h3>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium mb-2">
//                   Customer Name *
//                 </label>
//                 <input
//                   type="text"
//                   required
//                   value={bookingForm.customerName}
//                   onChange={(e) =>
//                     setBookingForm({
//                       ...bookingForm,
//                       customerName: e.target.value,
//                     })
//                   }
//                   className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-2">
//                   Email *
//                 </label>
//                 <input
//                   type="email"
//                   required
//                   value={bookingForm.email}
//                   onChange={(e) =>
//                     setBookingForm({ ...bookingForm, email: e.target.value })
//                   }
//                   className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-2">
//                   Phone *
//                 </label>
//                 <input
//                   type="tel"
//                   required
//                   value={bookingForm.phone}
//                   onChange={(e) =>
//                     setBookingForm({ ...bookingForm, phone: e.target.value })
//                   }
//                   className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-2">
//                   Number of People *
//                 </label>
//                 <input
//                   type="number"
//                   min="1"
//                   required
//                   value={bookingForm.numberOfPeople}
//                   onChange={(e) =>
//                     setBookingForm({
//                       ...bookingForm,
//                       numberOfPeople: e.target.value,
//                     })
//                   }
//                   className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-2">
//                   Travel Date *
//                 </label>
//                 <input
//                   type="date"
//                   required
//                   value={bookingForm.travelDate}
//                   onChange={(e) =>
//                     setBookingForm({
//                       ...bookingForm,
//                       travelDate: e.target.value,
//                     })
//                   }
//                   className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-2">Notes</label>
//                 <input
//                   type="text"
//                   value={bookingForm.notes}
//                   onChange={(e) =>
//                     setBookingForm({ ...bookingForm, notes: e.target.value })
//                   }
//                   className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
//                 />
//               </div>
//             </div>
//             <div className="flex gap-4">
//               <button
//                 type="submit"
//                 className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
//               >
//                 Add Booking
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setShowBookingForm(false)}
//                 className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       <div className="space-y-4">
//         {pkg.bookings && pkg.bookings.length > 0 ? (
//           pkg.bookings.map((booking) => (
//             <div
//               key={booking.id}
//               className="bg-white border-2 border-gray-200 p-6 rounded-lg hover:shadow-md transition"
//             >
//               <div className="flex justify-between items-start">
//                 <div className="flex-1">
//                   <div className="flex items-center gap-3 mb-3">
//                     <h4 className="text-xl font-semibold text-gray-800">
//                       {booking.customerName}
//                     </h4>
//                     <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
//                       Confirmed
//                     </span>
//                   </div>
//                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                     <div>
//                       <p className="text-sm text-gray-500">Email</p>
//                       <p className="text-gray-800">{booking.email}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-500">Phone</p>
//                       <p className="text-gray-800">{booking.phone}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-500">Guests</p>
//                       <p className="text-gray-800 font-semibold">
//                         {booking.numberOfPeople}{" "}
//                         {booking.numberOfPeople > 1 ? "people" : "person"}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-500">Travel Date</p>
//                       <p className="text-gray-800">
//                         {new Date(booking.travelDate).toLocaleDateString()}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-500">Total Amount</p>
//                       <p className="text-gray-800 font-bold text-green-600">
//                         ${booking.numberOfPeople * pkg.pricePerPerson}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-500">Booked On</p>
//                       <p className="text-gray-800">
//                         {new Date(booking.bookedAt).toLocaleDateString()}
//                       </p>
//                     </div>
//                     {booking.notes && (
//                       <div className="col-span-2">
//                         <p className="text-sm text-gray-500">Notes</p>
//                         <p className="text-gray-800">{booking.notes}</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => onDeleteBooking(pkg.id, booking.id)}
//                   className="ml-4 text-red-600 hover:text-red-800 p-2"
//                 >
//                   <Trash2 size={20} />
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="text-center py-12 bg-gray-50 rounded-lg">
//             <Users size={48} className="mx-auto text-gray-400 mb-3" />
//             <p className="text-gray-600 text-lg">No bookings yet</p>
//             <p className="text-gray-500 text-sm mt-1">
//               Add your first booking to get started
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
