import { Camera, Plus, Upload } from "lucide-react";
import { RenderStepProps } from "../../types/agency.type";

  export const RenderStep5:React.FC<RenderStepProps> = ({handleFileChange}) => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Camera className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Package Gallery</h2>
        <p className="text-gray-600">
          Upload stunning photos to showcase your package
        </p>
      </div>

      <div className="space-y-6">
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-gradient-to-br from-gray-50 to-blue-50 hover:border-blue-400 transition-all duration-200">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Upload className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-700 mb-2 font-medium">
            Upload destination photos
          </p>
          <p className="text-sm text-gray-500 mb-4">JPG, PNG up to 10MB each</p>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="photo-upload"
          />
          <label
            htmlFor="photo-upload"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 cursor-pointer transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5 mr-2" />
            Choose Photos
          </label>
        </div>
      </div>
    </div>
  );