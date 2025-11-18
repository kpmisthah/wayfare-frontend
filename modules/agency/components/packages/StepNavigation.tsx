import React from "react";
import { Save, CheckCircle } from "lucide-react";

interface StepNavigationProps {
  currentStep: number;
  prevStep: () => void;
  nextStep: () => void;
  handlePublish: () => Promise<void> | void;
  isPublishing: boolean;
  isPublished: boolean;
  /** Step index where the Publish button should appear (default: 7) */
  publishStep?: number;
  /** Total number of steps (used to disable Next) (default: 8) */
  totalSteps?: number;
}

export const StepNavigation: React.FC<StepNavigationProps> = ({
  currentStep,
  prevStep,
  nextStep,
  handlePublish,
  isPublishing,
  isPublished,
  publishStep = 7,
  // totalSteps = 8,
}) => {
  const isFirst = currentStep <= 1;
  const isLast = currentStep >= 7;
  const showPublish = currentStep === publishStep;

  return (
    <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
      {/* Left: Previous */}
      <div>
        <button
          type="button"
          onClick={prevStep}
          disabled={isFirst}
          className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 ${
            isFirst
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Previous
        </button>
      </div>

      {/* Center: Save Draft + Publish (when on publish step) */}
      <div className="flex items-center space-x-3">
        <button
          type="button"
          className="px-6 py-3 bg-white border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200 flex items-center"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Draft
        </button>

        {showPublish && (
          <button
            type="button"
            onClick={handlePublish}
            disabled={isPublishing || isPublished}
            aria-live="polite"
            className={`px-8 py-3 rounded-xl transition-all duration-200 shadow-lg font-medium flex items-center ${
              isPublished
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700"
            } ${isPublishing || isPublished ? "opacity-90 cursor-not-allowed" : ""}`}
          >
            {isPublishing ? (
              <>
                <span className="w-4 h-4 mr-2 rounded-full border-2 border-white border-t-transparent animate-spin" />
                Publishing...
              </>
            ) : isPublished ? (
              <>
                <CheckCircle className="w-5 h-5 mr-2" />
                Published!
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5 mr-2" />
                Publish Package
              </>
            )}
          </button>
        )}
      </div>

      {/* Right: Next Step */}
      <div>
        <button
          type="button"
          onClick={nextStep}
          disabled={isLast}
          className={`px-8 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 ${
            isLast
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700"
          }`}
        >
          Next Step
        </button>
      </div>
    </div>
  );
};


