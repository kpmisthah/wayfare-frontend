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
  IndianRupee,
  X,
  CheckCircle,
  Ban,
  Search,
} from "lucide-react";
import { useFetchPackages } from "../../hooks/use-fetch-packages";
import { PackageData } from "../../types/package.type";
import { useAddPackage } from "../../hooks/use-add-package";
import { AddPackageForm } from "./basic-info";
import { Button } from "@/shared/components/ui/button";
import { PackageStatus } from "../../types/package.enum";
import { updatePackageStatus } from "../../services/package.api";
import Modal from "@/shared/components/common/Modal";

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
    search,
    setSearch,
  } = useFetchPackages();
  const {
    showForm,
    setShowForm,
    setEditingPackage,
    setFormData,
    initialFormData,
    handleEdit,
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
  const [showBookings, setShowBookings] = useState<PackageData | null>(null);
  const [blockModal, setBlockModal] = useState<{
    isOpen: boolean;
    pkg: PackageData | null;
    action: "block" | "unblock";
  }>({
    isOpen: false,
    pkg: null,
    action: "block",
  });
  const openBlockModal = (pkg: PackageData) => {
    const action = pkg.status === PackageStatus.ACTIVE ? "block" : "unblock";
    setBlockModal({ isOpen: true, pkg, action });
  };

  const closeBlockModal = () => {
    setBlockModal({ isOpen: false, pkg: null, action: "block" });
  };

  const confirmBlockAction = async () => {
    if (!blockModal.pkg) return;

    const newStatus =
      blockModal.action === "block"
        ? PackageStatus.INACTIVE
        : PackageStatus.ACTIVE;

    try {
      await updatePackageStatus(newStatus, blockModal.pkg.id);
      setPackages((prev) =>
        prev.map((item) =>
          item.id === blockModal.pkg!.id ? { ...item, status: newStatus } : item
        )
      );
      closeBlockModal();
    } catch (error) {
      alert("Failed to update package status. Please try again.");
      console.error(error);
    }
  }

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
              setPackageData({
                title: "",
                itinerary: [],
                description: "",
                destination: "",
                duration: "",
                highlights: [],
                picture: [],
                price: "",
                status: PackageStatus.ACTIVE,
                vehicle: "",
                pickup_point: "",
                drop_point: "",
                details: "",
                id: "",
              });
            }}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition"
          >
            <Plus size={20} /> Add Package
          </button>
        </div>

        {/* Package List */}
        {!showForm && !viewingPackage && !showBookings && (
          <div className="min-h-screen">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search packages by title or destination..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white shadow-sm"
                />
              </div>
            </div>

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
                        // Reset packageData to empty state
                        setPackageData({
                          title: "",
                          itinerary: [],
                          description: "",
                          destination: "",
                          duration: "",
                          highlights: [],
                          picture: [],
                          price: "",
                          status: PackageStatus.ACTIVE,
                          vehicle: "",
                          pickup_point: "",
                          drop_point: "",
                          details: "",
                          id: "",
                        });
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
                        <h3 className="text-xl font-bold mb-3">
                          {pkg.title}
                        </h3>

                        <div className="space-y-3 mb-4 text-sm">
                          <div className="flex items-center gap-2">
                            <MapPin size={18} className="text-indigo-600" />
                            <span>{pkg.destination}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <IndianRupee
                              size={18}
                              className="text-green-600"
                            />
                            <span className="font-semibold">
                              ₹{pkg.price} per person
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
                            onClick={() => openBlockModal(pkg)}
                            variant={
                              pkg.status === PackageStatus.INACTIVE
                                ? "default"
                                : "destructive"
                            }
                            size="sm"
                            className="flex-1 relative"
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
                {Array.from({ length: totalPage }, (_, i) => i + 1).map(
                  (p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-10 h-10 rounded-full transition ${page === p
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                        }`}
                    >
                      {p}
                    </button>
                  )
                )}
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
                    ₹{viewingPackage.price}
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
                <h3 className="text-xl font-semibold mb-2">
                  Package Summary
                </h3>
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
                      className={`flex flex-col items-center p-4 border-2 rounded-xl transition-all duration-200 ${viewingPackage.vehicle === value
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-gray-200 bg-gray-50"
                        }`}
                    >
                      <input
                        type="radio"
                        name="transportMode"
                        className="sr-only"
                        value={value}
                        checked={viewingPackage.vehicle === value}
                        disabled
                        readOnly
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
                    value={viewingPackage.pickup_point || "Not specified"}
                    readOnly
                    className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Drop Point
                  </label>
                  <input
                    type="text"
                    value={viewingPackage.drop_point || "Not specified"}
                    readOnly
                    className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-gray-700"
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
                        .filter((url): url is string => !!url)
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
        {/* Block/Unblock Confirmation Modal */}
        <Modal
          isOpen={blockModal.isOpen}
          onClose={closeBlockModal}
          title={
            blockModal.action === "block"
              ? "Block Package"
              : "Unblock Package"
          }
          subtitle={blockModal.pkg?.title || ""}
          size="md"
        >
          <div className="space-y-6 py-4">
            <div className="text-center">
              <div
                className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${blockModal.action === "block"
                  ? "bg-red-100"
                  : "bg-green-100"
                  }`}
              >
                {blockModal.action === "block" ? (
                  <Ban className="w-8 h-8 text-red-600" />
                ) : (
                  <CheckCircle className="w-8 h-8 text-green-600" />
                )}
              </div>

              <h3 className="text-xl font-semibold mt-4">Are you sure?</h3>

              <p className="text-gray-600 mt-3 max-w-xs mx-auto">
                {blockModal.action === "block" ? (
                  <>
                    This package will no longer be visible to customers
                  </>
                ) : (
                  <>
                    This package will become{" "}
                    <strong className="text-green-600">visible again</strong>
                    and customers will be able to book it.
                  </>
                )}
              </p>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={closeBlockModal}
                className="px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>

              <button
                onClick={confirmBlockAction}
                className={`px-6 py-2.5 rounded-lg text-white font-medium transition ${blockModal.action === "block"
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-green-600 hover:bg-green-700"
                  }`}
              >
                Yes, {blockModal.action === "block" ? "Block" : "Unblock"}{" "}
                Package
              </button>
            </div>
          </div>
        </Modal>
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

