import { Clock, DollarSign, Eye, MapPin,Image } from "lucide-react";
import { RenderStepProps } from "../../types/agency.type";

  export const RenderStep6:React.FC<RenderStepProps> = ({packageData}) => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Eye className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Review & Publish</h2>
        <p className="text-gray-600">
          Review your package details before publishing
        </p>
      </div>

      <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          {packageData?.title || "Package Title"}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-gray-500 mr-2" />
              <span className="text-gray-700">
                {packageData?.destination || "Destination"}
              </span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-gray-500 mr-2" />
              <span className="text-gray-700">
                {packageData?.duration || "Duration"}
              </span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center">
              <DollarSign className="w-5 h-5 text-gray-500 mr-2" />
              <span className="text-xl font-bold text-gray-900">
                ₹{packageData?.price || "0"}
              </span>
            </div>
            <div className="flex items-center">
              <Image className="w-5 h-5 text-gray-500 mr-2" />
              <span className="text-gray-700">
                {packageData?.picture.length} photos uploaded
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
