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
import { DestinationAutocomplete } from "@/shared/components/ui/destination-autocomplete";

const PlanTrip = () => {
  const [activeTab, setActiveTab] = useState("short");
  const {
    loading,
    formData,
    errors,
    generateShortTrip,
    handleInputChange,
    handleTravelersChange,
    handlePreferenceChange,
    toggleActivity,
    toggleInterest,
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
              className={`px-8 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${activeTab === "short"
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
              className={`px-8 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${activeTab === "long"
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
                    <DestinationAutocomplete
                      value={formData.destination}
                      onChange={(value) => handleInputChange("destination", value)}
                      placeholder="Where do you want to go?"
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm ${errors.destination ? "border-red-300" : "border-gray-200"
                        }`}
                    />
                    {errors.destination && (
                      <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                        <span className="font-medium">⚠</span> {errors.destination}
                      </p>
                    )}
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
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm ${errors.startDate ? "border-red-300" : "border-gray-200"
                        }`}
                    />
                    {errors.startDate && (
                      <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                        <span className="font-medium">⚠</span> {errors.startDate}
                      </p>
                    )}
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
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm ${errors.duration ? "border-red-300" : "border-gray-200"
                        }`}
                      placeholder="e.g. 3"
                      min="1"
                      max="5"
                    />
                    {errors.duration && (
                      <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                        <span className="font-medium">⚠</span> {errors.duration}
                      </p>
                    )}
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
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm ${errors.budget ? "border-red-300" : "border-gray-200"
                        }`}
                    >
                      <option value="">Select Budget</option>
                      <option value="low">Cheap</option>
                      <option value="medium">Moderate</option>
                      <option value="high">Luxury</option>
                    </select>
                    {errors.budget && (
                      <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                        <span className="font-medium">⚠</span> {errors.budget}
                      </p>
                    )}
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
                        type="button"
                        onClick={() =>
                          handleInputChange("travelWith", option.id)
                        }
                        className={`flex flex-col items-center justify-center p-6 rounded-2xl border transition-all duration-300 shadow-sm
                            ${formData.travelWith === option.id
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
                  {errors.travelWith && (
                    <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
                      <span className="font-medium">⚠</span> {errors.travelWith}
                    </p>
                  )}
                </div>

                {/* Error Messages Section */}
                {(errors.duplicate || errors.submit) && (
                  <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-red-800">
                          {errors.duplicate || errors.submit}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* User Preferences Section */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-blue-600" />
                    Trip Preferences (Optional)
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Help our AI customize your itinerary to match your interests
                  </p>

                  {/* Activity Preferences */}
                  <div className="mb-5">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      What activities interest you?
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {[
                        { id: "sightseeing", label: "Sightseeing", icon: "🏛️" },
                        { id: "adventure", label: "Adventure", icon: "🏔️" },
                        { id: "relaxation", label: "Relaxation", icon: "🧘" },
                        { id: "food", label: "Food & Dining", icon: "🍽️" },
                        { id: "shopping", label: "Shopping", icon: "🛍️" },
                        { id: "nightlife", label: "Nightlife", icon: "🎭" },
                        { id: "culture", label: "Culture", icon: "🎨" },
                        { id: "nature", label: "Nature", icon: "🌳" },
                        { id: "photography", label: "Photography", icon: "📸" },
                      ].map((activity) => (
                        <button
                          key={activity.id}
                          type="button"
                          onClick={() => toggleActivity(activity.id)}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${formData.preferences.activities.includes(activity.id)
                            ? "bg-blue-500 text-white shadow-md border-2 border-blue-600"
                            : "bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-300"
                            }`}
                        >
                          <span>{activity.icon}</span>
                          <span className="text-xs">{activity.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Travel Pace */}
                  <div className="mb-5">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      What's your preferred travel pace?
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: "relaxed", label: "Relaxed", desc: "2-3 activities/day" },
                        { id: "moderate", label: "Moderate", desc: "4-5 activities/day" },
                        { id: "packed", label: "Packed", desc: "6+ activities/day" },
                      ].map((pace) => (
                        <button
                          key={pace.id}
                          type="button"
                          onClick={() => handlePreferenceChange("pace", pace.id)}
                          className={`p-3 rounded-xl text-center transition-all duration-200 ${formData.preferences.pace === pace.id
                            ? "bg-blue-500 text-white shadow-md border-2 border-blue-600"
                            : "bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-300"
                            }`}
                        >
                          <div className="font-semibold text-sm">{pace.label}</div>
                          <div className="text-xs mt-1 opacity-90">{pace.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Special Interests */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Any special interests?
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { id: "history", label: "History" },
                        { id: "art", label: "Art & Museums" },
                        { id: "wildlife", label: "Wildlife" },
                        { id: "beaches", label: "Beaches" },
                        { id: "mountains", label: "Mountains" },
                        { id: "local-cuisine", label: "Local Cuisine" },
                        { id: "festivals", label: "Festivals" },
                        { id: "wellness", label: "Wellness" },
                      ].map((interest) => (
                        <button
                          key={interest.id}
                          type="button"
                          onClick={() => toggleInterest(interest.id)}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${formData.preferences.interests.includes(interest.id)
                            ? "bg-blue-500 text-white shadow-md"
                            : "bg-white text-gray-700 border border-gray-200 hover:border-blue-300"
                            }`}
                        >
                          {interest.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Visibility Toggle */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div
                      className={`w-14 h-8 rounded-full transition-all duration-300 cursor-pointer relative ${formData.visibleToOthers
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
                        className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${formData.visibleToOthers ? "right-1" : "left-1"
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
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating...
                    </span>
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
                  <DestinationAutocomplete
                    value={formData.destination}
                    onChange={(value) => handleInputChange("destination", value)}
                    placeholder="Where do you want to go?"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all shadow-sm"
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
                    disabled={loading}
                    className={`bg-gradient-to-r bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-12 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 mx-auto ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
                    onClick={onSubmit}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Finding Packages...
                      </span>
                    ) : (
                      <>
                        <MessageCircle className="w-5 h-5" />
                        <span>Connect with Travel Agency</span>
                      </>
                    )}
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
