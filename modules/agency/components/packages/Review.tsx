import { AlertCircle, Award, Clock, DollarSign, Eye, MapPin, Star, TrendingUp, Users } from "lucide-react";
import { RenderStepProps } from "../../types/agency.type";

export const RenderStep7: React.FC<RenderStepProps> = ({ packageData }) => {

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Eye className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Review & Publish</h2>
        <p className="text-gray-600">
          Final review before publishing your package
        </p>
      </div>



      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Package Summary */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Star className="w-6 h-6 mr-2 text-yellow-500" />
            {packageData?.title || "Package Title"}
          </h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-gray-500 mr-2 flex-shrink-0" />
              <span className="text-gray-700">
                {packageData?.destination || "Destination not set"}
              </span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-gray-500 mr-2 flex-shrink-0" />
              <span className="text-gray-700">
                {packageData?.duration || "Duration not set"}
              </span>
            </div>
            <div className="flex items-center">
              <Users className="w-5 h-5 text-gray-500 mr-2 flex-shrink-0" />
            </div>
            <div className="flex items-center">
              <DollarSign className="w-5 h-5 text-gray-500 mr-2 flex-shrink-0" />
              <span className="text-2xl font-bold text-gray-900">
                ₹{packageData?.price || "0"}
              </span>
              <span className="text-gray-500 ml-1">per person</span>
            </div>
            <div className="flex items-center">
              <TrendingUp className="w-5 h-5 text-gray-500 mr-2 flex-shrink-0" />
              <span className="text-gray-700">
                {/* {packageData.category || "Category not set"} */}
              </span>
            </div>
            <div className="flex items-center">
              <Award className="w-5 h-5 text-gray-500 mr-2 flex-shrink-0" />
              <span className="text-gray-700">Difficult</span>
            </div>
          </div>
        </div>

        {/* Package Statistics */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Package Statistics
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">
                {packageData?.itinerary.length}
              </p>
              <p className="text-sm text-blue-700">Itinerary Days</p>
            </div>
            <div className="text-center">
              {/* <p className="text-3xl font-bold text-purple-600">{Object.values(uploadedPhotos).reduce((sum, category) => sum + category.length, 0)}</p> */}
              <p className="text-sm text-purple-700">Photos Uploaded</p>
            </div>
          </div>
        </div>
      </div>

      {/* Package Preview */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Package Preview
        </h3>
        <div className="space-y-4">
          {packageData?.description && (
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">
                Description
              </h4>
              <p className="text-gray-600 text-sm">
                {packageData.description.substring(0, 200)}...
              </p>
            </div>
          )}
          {packageData?.highlights && (
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">
                Key Highlights
              </h4>
              <div className="text-gray-600 text-sm">
                {(Array.isArray(packageData.highlights)
                  ? packageData.highlights
                  : packageData.highlights.split("\n"))
                  .slice(0, 3)
                  .map((highlight, index) => (
                    <p key={index}>{highlight}</p>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};