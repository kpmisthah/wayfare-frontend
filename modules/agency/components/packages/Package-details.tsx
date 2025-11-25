import { Star } from "lucide-react";
import { RenderStepProps } from "../../types/agency.type";

 export const RenderStep3:React.FC<RenderStepProps> = ({packageData,handleInputChange,handleAddHighlight}) => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Star className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Package Details</h2>
        <p className="text-gray-600">
          Tell us more about this amazing experience
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Package Summary
          </label>
          <textarea
            name="description"
            value={packageData?.description}
            onChange={handleInputChange}
            rows={5}
            className="w-full px-4 py-4 bg-white border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 resize-none"
            placeholder="Describe the overall package experience, what makes it special, and what travelers can expect..."
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Key Highlights & Attractions
          </label>
          <textarea
            name="highlights"
            value={packageData?.highlights}
            onChange={handleAddHighlight}
            rows={6}
            className="w-full px-4 py-4 bg-white border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 resize-none"
            placeholder="• Beach activities and water sports&#10;• Local sightseeing tours&#10;• Cultural experiences&#10;• Adventure activities&#10;• Special dining experiences"
          />
        </div>
      </div>
    </div>
  );