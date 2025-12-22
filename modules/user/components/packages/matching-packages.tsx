"use client";
import React, { useEffect, useState } from "react";
import {
  Star,
  MapPin,
  Users,
  Clock,
  ChevronLeft,
  ChevronRight,
  Car,
  Train,
  Plane,
  MapPin as LocationPin,
  Utensils,
  Bed,
  Activity,
  Search,
  X,
  SlidersHorizontal,
} from "lucide-react";
import { Header } from "@/shared/components/layout/Header";
import { useGenerateTrip } from "../../hooks/use-ai-trip-plan";
import { useSearchParams } from "next/navigation";

const TravelPackages = () => {
  interface TravelPackage {
    id: string;
    title: string;
    destination: string;
    description: string;
    highlights: string;
    duration: number;
    picture: string[];
    price: number;
    itinerary: {
      day: string;
      activities: string;
      meals: string;
      accommodation: string;
    }[];
    status: "ACTIVE" | "INACTIVE";
    vehicle: string;
    pickup_point: string;
    drop_point: string;
    details: string;
    rating: number;
    reviews: number;
    agency: string;
    groupSize: string;
    category: string;
  }

  const { generateTravel, handleBookNow } = useGenerateTrip();
  const searchParams = useSearchParams();
  const destination = searchParams.get("destination");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const minBudget = searchParams.get("minBudget");
  const maxBudget = searchParams.get("maxBudget");
  const travelers = searchParams.get("travelers");

  const [selectedPackage, setSelectedPackage] = useState<TravelPackage | null>(null);
  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [showDetails, setShowDetails] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [durationFilter, setDurationFilter] = useState<string>("all");

  const [loading, setLoading] = useState(false);
  const [totalPackages, setTotalPackages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const packagesPerPage = 9;

  const fetchTravel = async () => {
    setLoading(true);
    try {
      let result = await generateTravel({
        destination: destination ?? "",
        startDate: startDate ?? "",
        endDate: endDate ?? "",
        minBudget: minBudget ?? 0,
        maxBudget: maxBudget ?? 0,
        travelers: travelers ?? 0,
        search: searchTerm,
        durationFilter: durationFilter === "all" ? undefined : durationFilter,
        page: currentPage,
        limit: packagesPerPage,
      });
      setPackages(result?.data || []);
      setTotalPackages(result?.total || 0);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTravel();
  }, [searchTerm, priceRange, durationFilter, currentPage]);

  const handleDetailsClick = (pkg: TravelPackage) => {
    setSelectedPackage(pkg);
    setShowDetails(true);
  };

  const getVehicleIcon = (vehicle: string) => {
    switch (vehicle?.toLowerCase()) {
      case "train":
        return <Train className="w-5 h-5" />;
      case "flight":
      case "plane":
        return <Plane className="w-5 h-5" />;
      case "bus":
      case "car":
      default:
        return <Car className="w-5 h-5" />;
    }
  };

 
  const currentPackages = packages;
  const totalPages = Math.ceil(totalPackages / packagesPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setPriceRange([0, 100000]);
    setDurationFilter("all");
    setCurrentPage(1);
  };

  if (showDetails && selectedPackage) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                <div className="relative">
                  <img
                    src={
                      selectedPackage.picture[0] ||
                      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=400&fit=crop"
                    }
                    alt={selectedPackage.title}
                    className="w-full h-64 md:h-80 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${selectedPackage.status === "ACTIVE"
                        ? "bg-green-500 text-white"
                        : "bg-gray-500 text-white"
                        }`}
                    >
                      {selectedPackage.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {selectedPackage.title}
                    </h2>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{selectedPackage.destination}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{selectedPackage.duration} Days</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        <span>{selectedPackage.groupSize}</span>
                      </div>
                      <div className="flex items-center">
                        {getVehicleIcon(selectedPackage.vehicle)}
                        <span className="ml-1">{selectedPackage.vehicle}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 mb-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-medium">
                        {selectedPackage.rating}
                      </span>
                      <span className="text-sm text-gray-500">
                        ({selectedPackage.reviews} reviews)
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {selectedPackage.agency}
                    </p>
                  </div>
                </div>

                <div className="border-t pt-4 mb-4">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Description
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedPackage.description}
                  </p>
                </div>

                <div className="border-t pt-4 mb-4">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Highlights
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedPackage.highlights
                      .split(",")
                      .map((highlight, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                        >
                          {highlight.trim()}
                        </span>
                      ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <LocationPin className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium text-gray-900">
                          Pickup Point
                        </p>
                        <p className="text-sm text-gray-600">
                          {selectedPackage.pickup_point}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <LocationPin className="w-5 h-5 text-red-600" />
                      <div>
                        <p className="font-medium text-gray-900">Drop Point</p>
                        <p className="text-sm text-gray-600">
                          {selectedPackage.drop_point}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Day-wise Itinerary
                </h3>
                <div className="space-y-4">
                  {selectedPackage.itinerary.map((day, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {day.day}
                        </div>
                        <h4 className="ml-3 font-semibold text-gray-900">
                          Day {day.day}
                        </h4>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-start space-x-2">
                          <Activity className="w-4 h-4 text-blue-600 mt-1" />
                          <div>
                            <p className="font-medium text-gray-900 text-sm">
                              Activities
                            </p>
                            <p className="text-gray-600 text-sm">
                              {day.activities}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-2">
                          <Utensils className="w-4 h-4 text-green-600 mt-1" />
                          <div>
                            <p className="font-medium text-gray-900 text-sm">
                              Meals
                            </p>
                            <p className="text-gray-600 text-sm">{day.meals}</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-2">
                          <Bed className="w-4 h-4 text-purple-600 mt-1" />
                          <div>
                            <p className="font-medium text-gray-900 text-sm">
                              Stay
                            </p>
                            <p className="text-gray-600 text-sm">
                              {day.accommodation}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1 flex justify-center">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6 w-full max-w-sm">
                <div className="text-center border-b pb-4 mb-4">
                  <div className="text-3xl font-bold text-gray-900">
                    ₹{selectedPackage.price.toLocaleString()}
                  </div>
                  <p className="text-gray-600">per person</p>
                </div>

                <div className="space-y-3">
                  <button
                    className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium"
                    onClick={() => handleBookNow(selectedPackage.id, startDate, travelers)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Matched Packages</h1>
          <p className="text-gray-600 mt-2">
            {packages.length} {packages.length === 1 ? 'package' : 'packages'} found based on your preferences
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search packages by name, destination, or agency..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-colors ${showFilters
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                }`}
            >
              <SlidersHorizontal className="h-5 w-5" />
              Filters
            </button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Price Range - Backend filtering for price is already handled by start parameters, skipping additional UI filter for now as it duplicates logic */}
                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange[0] || ""}
                      onChange={(e) => {
                        setPriceRange([Number(e.target.value) || 0, priceRange[1]]);
                        setCurrentPage(1);
                      }}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange[1] || ""}
                      onChange={(e) => {
                        setPriceRange([priceRange[0], Number(e.target.value) || 100000]);
                        setCurrentPage(1);
                      }}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div> */}

                {/* Duration Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration
                  </label>
                  <select
                    value={durationFilter}
                    onChange={(e) => {
                      setDurationFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Durations</option>
                    <option value="short">Short (1-3 days)</option>
                    <option value="medium">Medium (4-7 days)</option>
                    <option value="long">Long (8+ days)</option>
                  </select>
                </div>

                {/* Clear Filters */}
                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className="w-full px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>

              <div className="mt-3 text-sm text-gray-600">
                Showing {packages.length} of {totalPackages} packages
              </div>
            </div>
          )}
        </div>

        {/* Package Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              <div className="relative">
                <img
                  src={
                    pkg.picture && pkg.picture[0]
                      ? pkg.picture[0]
                      : "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&h=250&fit=crop"
                  }
                  alt={pkg.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${pkg.status === "ACTIVE"
                      ? "bg-green-500 text-white"
                      : "bg-gray-500 text-white"
                      }`}
                  >
                    {pkg.status}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {pkg.title}
                  </h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700">
                      {pkg.rating}
                    </span>
                    <span className="text-xs text-gray-500">
                      ({pkg.reviews})
                    </span>
                  </div>
                </div>

                <div className="flex items-center text-gray-600 text-sm mb-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{pkg.destination}</span>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{pkg.duration} Days</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{pkg.groupSize}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {pkg.highlights.split(",").map((highlight, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                    >
                      {highlight.trim()}
                    </span>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-gray-900">
                          ₹{pkg.price.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600">per person</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {pkg.agency}
                      </p>
                      <p className="text-xs text-gray-600">Travel Agency</p>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      onClick={() => handleDetailsClick(pkg)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg ${currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-lg ${currentPage === page
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                  }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg ${currentPage === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TravelPackages;