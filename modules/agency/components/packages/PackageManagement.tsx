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
"use client";
import { BookingsView } from "./Booking";
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
  CheckCircle,
  Ban,
} from "lucide-react";
import { useFetchPackages } from "../../hooks/use-fetch-packages";
import { PackageData } from "../../types/package.type";
import { useAddPackage } from "../../hooks/use-add-package";
import { AddPackageForm } from "./basic-info";
import { Button } from "@/shared/components/ui/button";
import { PackageStatus } from "../../types/package.enum";
import { updatePackageStatus } from "../../services/package.api";

export const PackageManagement = () => {
  const {
    packages,
    setPackages,
    nextPage,
    prevPage,
    setPage,
    page,
    totalPage,
    loading,
  } = useFetchPackages();
  console.log(packages,'packagess')
  const {
    showForm,
    setShowForm,
    setEditingPackage,
    setFormData,
    initialFormData,
    handleEdit,
    // handleDelete,
    formData,
    editingPackage,
    handlePublish,
    handleFileChange,
    handleInputChange,
    packageData,
    setPackageData,
    handleItineraryChange,
    removeArrayField,
    isPublishing,
    agency,
  } = useAddPackage(setPackages);
  const [viewingPackage, setViewingPackage] = useState<PackageData | null>(
    null
  );
  const [showBookings, setShowBookings] = useState(null);
  const handleBlock = async (pkg: PackageData) => {
    const newStatus =
      pkg.status === PackageStatus.ACTIVE
        ? PackageStatus.INACTIVE
        : PackageStatus.ACTIVE;
    try {
      await updatePackageStatus(newStatus, pkg.id);
      setPackages((prev) =>
        prev.map((item) =>
          item.id == pkg.id ? { ...item, status: newStatus } : item
        )
      );
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  if (!agency) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-800">
            Complete Your Profile
          </h2>
          <p className="text-gray-600 mt-2">
            To create a travel package, please complete your agency profile
            first.
          </p>
          {/* <a
            href="/agency/edit"
            className="inline-block mt-6 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow hover:bg-indigo-700 transition"
          >
            Complete Profile
          </a> */}
        </div>
      </div>
    );
  }
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
          <div className="min-h-screen">
            {loading ? (
        
              <div className="col-span-full flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              </div>
            ) : (
           
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
                {packages.length === 0 ? (
                  <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-600">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/4076/4076500.png"
                      alt="No packages"
                      className="w-24 h-24 mb-4 opacity-70"
                    />

                    <h3 className="text-xl font-semibold">
                      No Packages Available
                    </h3>
                    <p className="text-sm mt-2">
                      Click “Add Package” to create your first travel package.
                    </p>

                    <button
                      onClick={() => {
                        setShowForm(true);
                        setEditingPackage(null);
                        setFormData(initialFormData);
                      }}
                      className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition"
                    >
                      <Plus size={18} /> Add Package
                    </button>
                  </div>
                ) : (
              
                  packages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition"
                    >
                      {/* Image */}
                      <div className="h-48 bg-gradient-to-r from-indigo-500 to-purple-600">
                        {pkg.picture?.[0] ? (
                          <img
                            src={pkg.picture[0]}
                            alt={pkg.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full flex items-center justify-center text-white text-lg">
                            No Image
                          </div>
                        )}
                      </div>

                      {/* Body */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-3">{pkg.title}</h3>

                        <div className="space-y-3 mb-4 text-sm">
                          <div className="flex items-center gap-2">
                            <MapPin size={18} className="text-indigo-600" />
                            <span>{pkg.destination}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <DollarSign size={18} className="text-green-600" />
                            <span className="font-semibold">
                              ${pkg.price} per person
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Calendar size={18} className="text-blue-600" />
                            <span>{pkg.duration} days</span>
                          </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-2 mb-2">
                          <Button
                            onClick={() => setViewingPackage(pkg)}
                            className="flex-1"
                            variant="secondary"
                            size="sm"
                          >
                            <Eye size={16} className="mr-1" /> View
                          </Button>

                          <Button
                            onClick={() => setShowBookings(pkg)}
                            className="flex-1"
                            variant="secondary"
                            size="sm"
                          >
                            <Users size={16} className="mr-1" /> Bookings
                          </Button>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleEdit(pkg)}
                            variant="outline"
                            size="sm"
                            className="flex-1"
                          >
                            <Edit2 size={16} className="mr-1" /> Edit
                          </Button>

                          <Button
                            onClick={() => handleBlock(pkg)}
                            variant={
                              pkg.status === PackageStatus.INACTIVE
                                ? "default"
                                : "destructive"
                            }
                            size="sm"
                            className="flex-1 relative"
                            disabled={loading}
                          >
                            {pkg.status === PackageStatus.INACTIVE ? (
                              <>
                                <CheckCircle size={16} className="mr-1" />{" "}
                                Unblock
                              </>
                            ) : (
                              <>
                                <Ban size={16} className="mr-1" /> Block
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}

        {/* Pagination - Only show if more than one page */}
        {!showForm &&
          !viewingPackage &&
          !showBookings &&
          packages.length > 0 &&
          totalPage > 1 && (
            <div className="flex justify-center items-center gap-6 mt-12 pb-8">
              <Button
                variant="outline"
                size="lg"
                disabled={page === 1 || loading}
                onClick={prevPage}
              >
                ← Previous
              </Button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPage }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-10 h-10 rounded-full transition ${
                      page === p
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>

              <span className="text-sm text-gray-600 hidden sm:block">
                Page {page} of {totalPage}
              </span>

              <Button
                variant="outline"
                size="lg"
                disabled={page === totalPage || loading}
                onClick={nextPage}
              >
                Next →
              </Button>
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

              {Array.isArray(viewingPackage?.picture) &&
                viewingPackage.picture.filter(Boolean).length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Gallery</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {viewingPackage.picture
                        .filter((url): url is string => !!url) // TypeScript-friendly filter
                        .map((url, index) => (
                          <div
                            key={index}
                            className="aspect-video bg-gray-200 rounded-lg overflow-hidden"
                          >
                            <img
                              src={url}
                              alt={`Gallery ${index + 1}`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src =
                                  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23ddd" width="100" height="100"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle"%3EImage%3C/text%3E%3C/svg%3E';
                              }}
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
