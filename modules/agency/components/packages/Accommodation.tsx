import { Bus, Car, MapPin, Plane, Train } from "lucide-react";
import { RenderStepProps } from "../../types/agency.type";

export const RenderStep4: React.FC<RenderStepProps> = ({
  packageData,
  handleInputChange,
}) => (
  <div className="space-y-8">
    {/* Transportation Section */}
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900 flex items-center">
        <Car className="w-6 h-6 mr-2 text-blue-500" />
        Transportation Details
      </h3>

      {/* Primary Transport Mode */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Primary Transport Mode
        </label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: "Flight", icon: Plane, desc: "Air Travel" },
            { value: "Train", icon: Train, desc: "Railway" },
            { value: "Bus", icon: Bus, desc: "Road Transport" },
            { value: "Private Vehicle", icon: Car, desc: "Private Car/Van" },
          ].map(({ value, icon: Icon, desc }) => (
            <label
              key={value}
              className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                packageData?.vehicle === value
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:bg-blue-50 hover:border-blue-300"
                }`}
            >
              <input
                type="radio"
                name="vehicle"
                className="sr-only"
                value={value}
                checked={packageData?.vehicle == value}
                onChange={handleInputChange}
              />
              <Icon className="w-6 h-6 mr-3 text-blue-500" />
              <div>
                <div className="font-semibold">{value}</div>
                <div className="text-xs text-gray-500">{desc}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Pickup / Drop Points */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Pickup Point
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              name="pickup_point"
              value={packageData?.pickup_point}
              type="text"
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200"
              placeholder="Mumbai Airport / Railway Station"
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Drop Point
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              name="drop_point"
              value={packageData?.drop_point}
              type="text"
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200"
              placeholder="Mumbai Airport / Railway Station"
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      {/* Transport Details */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Transportation Details
        </label>
        <textarea
          name="details"
          value={packageData?.details}
          rows={5}
          className="w-full px-4 py-4 bg-white border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 resize-none"
          placeholder="• Round-trip economy flights included&#10;• Airport transfers by coach&#10;• Local sightseeing by private vehicle"
          onChange={handleInputChange}
        />
      </div>
    </div>
  </div>
);
