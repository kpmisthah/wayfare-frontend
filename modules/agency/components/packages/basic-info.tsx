import { X, Plus, Upload, Image as ImageIcon, Calendar, MapPin as MapPinIcon, DollarSign, Clock, Trash2 } from "lucide-react";
import { AddPackageFormProps } from "../../types/package.type";
import { PackageStatus } from "../../types/package.enum";

export const AddPackageForm: React.FC<AddPackageFormProps> = ({
  showForm,
  setShowForm,
  editingPackage,
  formData,
  setFormData,
  handlePublish,
  handleFileChange,
  packageData,
  setPackageData,
  handleItineraryChange,
  removeArrayField,
  initialFormData,
  handleInputChange,
  isPublishing
}) => {
  if (!showForm) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start sm:items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-2xl shadow-2xl w-full max-w-5xl my-4 sm:my-8 max-h-[95vh] flex flex-col">
        {/* Header - Sticky */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 sm:px-8 py-4 sm:py-6 rounded-t-2xl flex items-center justify-between flex-shrink-0">
          <div className="flex-1 pr-4">
            <h2 className="text-xl sm:text-3xl font-bold text-white">
              {editingPackage ? " Edit Package" : "Create New Package"}
            </h2>
            <p className="text-blue-100 mt-1 text-xs sm:text-sm">Fill in the details to create an amazing travel experience</p>
          </div>
          <button
            onClick={() => setShowForm(false)}
            className="w-10 h-10 flex-shrink-0 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </button>
        </div>

        {/* Scrollable Form Content */}
        <form className="p-4 sm:p-8 space-y-6 sm:space-y-8 overflow-y-auto flex-1">
          {/* Basic Information */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <MapPinIcon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Package Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  name="title"
                  value={packageData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Magical Kerala Backwaters Tour"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Destination <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  name="destination"
                  value={packageData.destination}
                  onChange={handleInputChange}
                  placeholder="e.g., Kerala, India"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Price Per Person <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  name="price"
                  value={packageData.price}
                  onChange={handleInputChange}
                  placeholder="5000"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Total Days <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  name="duration"
                  value={packageData.duration}
                  onChange={handleInputChange}
                  placeholder="5"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                />
              </div>
            </div>

            <div className="mt-4 sm:mt-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Package Summary <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                name="description"
                value={packageData.description}
                onChange={handleInputChange}
                rows={4}
                placeholder="Describe your package... What makes it special?"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
              />
            </div>
          </div>

          {/* Package Gallery - Multiple Photos */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 flex flex-wrap items-center gap-2">
              <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
              Package Gallery
              <span className="text-xs sm:text-sm font-normal text-gray-500">(Upload multiple photos)</span>
            </h3>

            <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 sm:p-6 hover:border-blue-500 transition-colors">
              <label className="flex flex-col items-center cursor-pointer">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mb-2 sm:mb-3">
                  <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-gray-700 mb-1 text-center">Click to upload images</span>
                <span className="text-[10px] sm:text-xs text-gray-500 text-center px-2">or drag and drop (JPG, PNG up to 10MB each)</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Image Preview Grid */}
            {packageData.picture.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 mt-4 sm:mt-6">
                {packageData.picture.map((url, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={typeof url === 'string' ? url : URL.createObjectURL(url)}
                      alt={`Package ${index + 1}`}
                      className="w-full h-24 sm:h-32 object-cover rounded-lg shadow-md"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayField("gallery", index)}
                      className="absolute top-1 sm:top-2 right-1 sm:right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 sm:p-1.5 opacity-0 group-hover:opacity-100 transition-all shadow-lg"
                    >
                      <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                    <div className="absolute bottom-1 sm:bottom-2 left-1 sm:left-2 bg-black/60 text-white text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                      Photo {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Itinerary */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-green-600" />
                Day-by-Day Itinerary
              </h3>
              <button
                type="button"
                onClick={() => {
                  setPackageData({
                    ...packageData,
                    itinerary: [
                      ...packageData.itinerary,
                      {
                        day: packageData.itinerary.length + 1,
                        activities: "",
                        meals: "",
                        accommodation: "",
                      },
                    ],
                  });
                }}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Day
              </button>
            </div>

            <div className="space-y-4">
              {packageData.itinerary.map((item, index) => (
                <div
                  key={index}
                  className="border-2 border-gray-200 rounded-xl p-5 bg-gradient-to-r from-gray-50 to-white hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-lg text-gray-900">Day {item.day}</h4>
                    {packageData.itinerary.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          setPackageData({
                            ...packageData,
                            itinerary: packageData.itinerary.filter((_, i) => i !== index)
                          });
                        }}
                        className="text-red-600 hover:text-red-700 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="space-y-3">
                    <input
                      type="text"
                      name="activities"
                      placeholder="🎯 Activities (e.g., Visit Eiffel Tower, Seine River Cruise)"
                      value={item.activities}
                      onChange={(e) => handleItineraryChange(e, index)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none"
                    />

                    <input
                      type="text"
                      name="meals"
                      placeholder="🍽️ Meals (e.g., Breakfast, Lunch, Dinner)"
                      value={item.meals}
                      onChange={(e) => handleItineraryChange(e, index)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none"
                    />

                    <input
                      type="text"
                      name="accommodation"
                      placeholder="🏨 Accommodation (e.g., 5-star hotel in city center)"
                      value={item.accommodation}
                      onChange={(e) => handleItineraryChange(e, index)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none"
                    />
                  </div>
                </div>
              ))}

              {packageData.itinerary.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No itinerary added yet. Click "Add Day" to start.</p>
                </div>
              )}
            </div>
          </div>

          {/* Transport & Logistics */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">🚗 Transport & Logistics</h3>

            <div className="mb-4 sm:mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Primary Transport Mode
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                {[
                  { value: "Flight", icon: "✈️", desc: "Air Travel" },
                  { value: "Train", icon: "🚆", desc: "Railway" },
                  { value: "Bus", icon: "🚌", desc: "Road Transport" },
                  { value: "Private Vehicle", icon: "🚗", desc: "Private Car/Van" },
                ].map(({ value, icon, desc }) => (
                  <label
                    key={value}
                    className={`flex flex-col items-center p-3 sm:p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${packageData.vehicle === value
                        ? "border-blue-500 bg-blue-50 shadow-md"
                        : "border-gray-200 hover:bg-blue-50 hover:border-blue-300"
                      }`}
                  >
                    <input
                      type="radio"
                      name="vehicle"
                      className="sr-only"
                      value={value}
                      checked={packageData.vehicle === value}
                      onChange={handleInputChange}
                    />
                    <span className="text-3xl sm:text-4xl mb-2">{icon}</span>
                    <div className="text-center">
                      <div className="font-semibold text-xs sm:text-sm">{value}</div>
                      <div className="text-[10px] sm:text-xs text-gray-500">{desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Pickup Point
                </label>
                <input
                  type="text"
                  name="pickup_point"
                  value={packageData.pickup_point}
                  onChange={handleInputChange}
                  placeholder="e.g., Airport Terminal 3"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Drop Point
                </label>
                <input
                  type="text"
                  name="drop_point"
                  value={packageData.drop_point}
                  onChange={handleInputChange}
                  placeholder="e.g., City Railway Station"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Transportation Details
              </label>
              <textarea
                name="details"
                value={packageData.details}
                onChange={handleInputChange}
                rows={3}
                placeholder="Additional transport information, timings, etc."
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none scroll-mt-20"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
            <button
              onClick={handlePublish}
              type="submit"
              disabled={isPublishing}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 sm:px-8 py-3 sm:py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isPublishing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : (
                <>
                  {editingPackage ? "Update Package" : "Create Package"}
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
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
              className="sm:w-auto px-4 sm:px-8 py-3 sm:py-4 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all font-semibold text-base sm:text-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
