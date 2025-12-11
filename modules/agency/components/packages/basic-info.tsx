import { useFetchPackages } from "../../hooks/use-fetch-packages";
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
  return (
    <>
      {showForm && (
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">
            {editingPackage ? "Edit Package" : "Add New Package"}
          </h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Package Title *
                </label>
                <input
                  type="text"
                  required
                  name="title"
                  value={packageData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Destination *
                </label>
                <input
                  type="text"
                  required
                  name="destination"
                  value={packageData.destination}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Price Per Person *
                </label>
                <input
                  type="number"
                  required
                  name="price"
                  value={packageData.price}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Total Days *
                </label>
                <input
                  type="number"
                  required
                  name="duration"
                  value={packageData.duration}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Package Summary *
              </label>
              <textarea
                required
                name="description"
                value={packageData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Itineraries
              </label>
              {packageData.itinerary.map((item, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 mb-3 bg-gray-50"
                >
                  <h4 className="font-semibold mb-2">Day {item.day}</h4>

                  <input
                    type="text"
                    name="activities"
                    placeholder="Activities"
                    value={item.activities}
                    onChange={(e) => handleItineraryChange(e, index)}
                    className="w-full mb-2 px-3 py-2 border rounded-lg"
                  />

                  <input
                    type="text"
                    name="meals"
                    placeholder="Meals"
                    value={item.meals}
                    onChange={(e) => handleItineraryChange(e, index)}
                    className="w-full mb-2 px-3 py-2 border rounded-lg"
                  />

                  <input
                    type="text"
                    name="accommodation"
                    placeholder="Accommodation"
                    value={item.accommodation}
                    onChange={(e) => handleItineraryChange(e, index)}
                    className="w-full mb-2 px-3 py-2 border rounded-lg"
                  />
                </div>
              ))}

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
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
              >
                + Add Itinerary
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Key Highlights & Attractions
              </label>
              {/* {packageData.highlights.map((item, index) => ( */}
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  name="highlights"
                  value={packageData.highlights}
                  onChange={handleInputChange}
                  placeholder="Highlight or attraction"
                  className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                {/* {packageData.highlights.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayField("highlights", index)}
                        className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                      >
                        <X size={18} />
                      </button>
                    )} */}
              </div>
              {/* ))} */}
              <button
                type="button"
                onClick={() => {
                  setPackageData({
                    ...packageData,
                    highlights: Array.isArray(packageData.highlights) ? [...packageData.highlights, ""] : [packageData.highlights, ""],
                  });
                }}
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
              >
                + Add Highlight
              </button>
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
                    className={`flex flex-col items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${packageData.vehicle === value
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-gray-200 hover:bg-indigo-50 hover:border-indigo-300"
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
                  name="pickup_point"
                  value={packageData.pickup_point}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Drop Point
                </label>
                <input
                  type="text"
                  name="drop_point"
                  value={packageData.drop_point}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Transportation Details
              </label>
              <textarea
                name="details"
                value={packageData.details}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Package Gallery
              </label>

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="w-full px-4 py-2 border rounded-lg"
              />

              <div className="grid grid-cols-3 gap-2 mt-3">
                {packageData.picture.map((url, index) => (
                  <div key={index} className="relative">
                    <img
                      src={typeof url === 'string' ? url : URL.createObjectURL(url)}
                      alt={`Image ${index + 1}`}
                      className="w-full h-28 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayField("gallery", index)}
                      className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full px-2 py-1"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handlePublish}
                type="submit"
                className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition font-medium"
              >
                {isPublishing && <span className="loader-border w-5 h-5 border-2 border-white rounded-full animate-spin"></span>}
                {editingPackage ? "Update Package" : "Create Package"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  // setEditingPackage(null);
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
                    // bookings: [],
                    id: "",
                  });
                }}
                className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
