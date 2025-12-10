"use client";
import React, { useState } from "react";
import {
  MapPin,
  Users,
  Clock,
  Zap,
  DollarSign,
  MessageCircle,
  Sparkles,
  User,
  Home,
  Heart,
  Plus,
  Minus,
  Calendar,
  Eye,
  EyeOff,
  Info,
} from "lucide-react";
import { Header } from "@/shared/components/layout/Header";
import { useGenerateTrip } from "../../hooks/use-ai-trip-plan";
import GooglePlacesAutocomplete from "react-google-autocomplete";

const PlanTrip = () => {
  const [activeTab, setActiveTab] = useState("short");
  const {
    loading,
    formData,
    generateShortTrip,
    handleInputChange,
    handleTravelersChange,
    onSubmit,
  } = useGenerateTrip();
  const travelWithOptions = [
    { id: "solo", label: "Just Me", icon: <User className="w-6 h-6" /> },
    { id: "family", label: "Family", icon: <Home className="w-6 h-6" /> },
    { id: "friends", label: "Friends", icon: <Users className="w-6 h-6" /> },
    { id: "couple", label: "Couple", icon: <Heart className="w-6 h-6" /> },
  ];
  const today = new Date().toISOString().split('T')[0]
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Header */}
      <Header />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Plan Your Perfect Trip
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Whether you want AI-powered quick planning or detailed agency
            assistance, we've got you covered
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 p-1 rounded-xl flex space-x-1">
            <button
              onClick={() => setActiveTab("short")}
              className={`px-8 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${
                activeTab === "short"
                  ? "bg-white text-blue-600 shadow-md transform scale-105"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>Short Trip</span>
              <Sparkles className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTab("long")}
              className={`px-8 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${
                activeTab === "long"
                  ? "bg-white text-blue-600 shadow-md transform scale-105"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>Long Trip</span>
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {activeTab === "short" ? (
            <div className="p-8">
              {/* Short Trip Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <Sparkles className="w-4 h-4" />
                  <span>AI-Powered Planning</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Quick Trip Planning
                </h2>
                <p className="text-gray-600">
                  Let our AI create the perfect itinerary for your short getaway
                </p>
              </div>

              {/* Short Trip Form */}
              <div className="space-y-6">
                {/* Left side form */}
                <div className="grid lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-500" />
                      Destination
                    </label>
                    {/* <GooglePlacesAutocomplete
                    apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY}
                    /> */}

                    <input
                      type="text"
                      value={formData.destination}
                      onChange={(e) =>
                        handleInputChange("destination", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
                      placeholder="Where do you want to go?"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-500" />
                      Trip Start Date
                    </label>
                    <input
                      type="date"
                      value={formData.startDate}
                      min={today}
                      onChange={(e) =>
                        handleInputChange("startDate", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
                    />
                  </div>
                </div>

                {/* Duration and Budget Row */}
                <div className="grid lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-500" />
                      Trip Duration (Days)
                    </label>
                    <input
                      type="number"
                      value={formData.duration}
                      onChange={(e) =>
                        handleInputChange("duration", Number(e.target.value))
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
                      placeholder="e.g. 3"
                      min="1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-blue-500" />
                      Budget Range
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) =>
                        handleInputChange("budget", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                    >
                      <option value="">Select Budget</option>
                      <option value="low">Cheap</option>
                      <option value="medium">Moderate</option>
                      <option value="high">Luxury</option>
                    </select>
                  </div>
                </div>
                {/* </div> */}

                {/* Right side travel-with options */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-4">
                    Who do you prefer to travel with?
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {travelWithOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() =>
                          handleInputChange("travelWith", option.id)
                        }
                        className={`flex flex-col items-center justify-center p-6 rounded-2xl border transition-all duration-300 shadow-sm
                            ${
                              formData.travelWith === option.id
                                ? "bg-blue-500 text-white shadow-lg border-blue-500 scale-105"
                                : "bg-gray-50 text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-gray-100"
                            }`}
                      >
                        {option.icon}
                        <span className="mt-2 font-medium text-sm">
                          {option.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Visibility Toggle */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div
                      className={`w-14 h-8 rounded-full transition-all duration-300 cursor-pointer relative ${
                        formData.visibleToOthers
                          ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                          : "bg-gray-300"
                      }`}
                      onClick={() =>
                        handleInputChange(
                          "visibleToOthers",
                          !formData.visibleToOthers
                        )
                      }
                    >
                      <div
                        className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${
                          formData.visibleToOthers ? "right-1" : "left-1"
                        }`}
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {formData.visibleToOthers ? (
                        <Eye className="w-5 h-5 text-blue-600" />
                      ) : (
                        <EyeOff className="w-5 h-5 text-gray-500" />
                      )}
                      <h3 className="font-semibold text-gray-900">
                        {formData.visibleToOthers
                          ? "Visible to Other Travelers"
                          : "Private Trip"}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {formData.visibleToOthers ? (
                        <>
                          Your trip will be visible to other travelers going to
                          the same destination. Connect with fellow travelers,
                          share experiences, and make your journey more
                          memorable!
                        </>
                      ) : (
                        <>
                          Your trip will be private. Other travelers won't be
                          able to see your profile in the connections section.
                        </>
                      )}
                    </p>
                    {formData.visibleToOthers && (
                      <div className="mt-3 flex items-start gap-2 bg-white/60 rounded-lg p-3">
                        <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-gray-600">
                          Only your name, age, interests, and travel dates will
                          be visible. Your contact information remains private
                          until you choose to connect.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Generate*/}
              <div className="mt-8 text-center">
                <button
                  onClick={generateShortTrip}
                  disabled={loading}
                  className={`bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-12 py-4 rounded-xl font-semibold text-lg shadow-lg 
                   hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 mx-auto
                  ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  {loading ? (
                    <span className="animate-pulse"> Generating...</span>
                  ) : (
                    <>
                      <span>Generate AI Itinerary</span>
                    </>
                  )}
                </button>
                <p className="text-sm text-gray-500 mt-3">
                  Currently free! Premium AI features coming soon with
                  subscription
                </p>
              </div>
            </div>
          ) : (
            <div className="p-8">
              {/* Long Trip Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <Clock className="w-4 h-4" />
                  <span>Professional Planning</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Detailed Trip Planning
                </h2>
                <p className="text-gray-600">
                  Work with our partner agencies for comprehensive trip planning
                </p>
              </div>

              {/* Long Trip Form */}
              <div className="space-y-8">
                {/* Destination */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-purple-500" />
                    Destination
                  </label>
                  <input
                    type="text"
                    value={formData.destination}
                    onChange={(e) =>
                      handleInputChange("destination", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all shadow-sm"
                    placeholder="Where do you want to go?"
                  />
                </div>

                {/* Dates */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-purple-500" />
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={formData.startDate}
                      min={today}
                      onChange={(e) =>
                        handleInputChange("startDate", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-purple-500" />
                      End Date
                    </label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) =>
                        handleInputChange("endDate", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all shadow-sm"
                    />
                  </div>
                </div>

                {/* Number of Travelers with Counter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Users className="w-4 h-4 text-purple-500" />
                    Number of Travelers
                  </label>
                  <div className="flex items-center space-x-4">
                    <button
                      type="button"
                      onClick={() => handleTravelersChange(false)}
                      className="w-10 h-10 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg flex items-center justify-center transition-colors"
                    >
                      <Minus className="w-4 h-4 text-gray-600" />
                    </button>
                    <div className="px-6 py-3 bg-gray-50 border border-gray-200 rounded-lg min-w-[100px] text-center">
                      <span className="text-lg font-semibold text-gray-800">
                        {formData.travelers || 1}
                      </span>
                      <span className="text-sm text-gray-600 ml-1">
                        {(formData.travelers || 1) === 1 ? "Person" : "People"}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleTravelersChange(true)}
                      className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg flex items-center justify-center transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Budget Range */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-purple-500" />
                    Budget Range
                  </label>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">
                        Minimum Budget
                      </label>
                      <input
                        type="number"
                        value={formData.minBudget}
                        onChange={(e) =>
                          handleInputChange("minBudget", Number(e.target.value))
                        }
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all shadow-sm"
                        placeholder="e.g. 1000"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">
                        Maximum Budget
                      </label>
                      <input
                        type="number"
                        value={formData.maxBudget}
                        onChange={(e) =>
                          handleInputChange("maxBudget", Number(e.target.value))
                        }
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all shadow-sm"
                        placeholder="e.g. 5000"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Enter your budget range in USD
                  </p>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="button"
                    className="bg-gradient-to-r bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-12 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 mx-auto"
                    onClick={onSubmit}
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Connect with Travel Agency</span>
                  </button>

                  <p className="text-sm text-gray-500 mt-3">
                    Our partner agencies will contact you within 24 hours
                  </p>
                </div>
              </div>

              {/* Agency Selection */}
              <div className="mt-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Choose Your Travel Agency
                </h3>
                <div className="text-center text-gray-600">
                  <p>Agency selection options will be displayed here</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanTrip;
