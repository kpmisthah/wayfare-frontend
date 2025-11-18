import React from "react";
import {
  Camera,
  FileText,
  Star,
  Eye,
} from "lucide-react";
import { useAddPackage } from "../../hooks/use-add-package";
import { StepNavigation } from "./StepNavigation";
import { StepContent } from "./StepContent";
import { StepProgress } from "./StepProgress";

export const AddPackage = () => {
  const {
    packageData,
    currentStep,
    setCurrentStep,
    handleFileChange,
    handleAddHighlight,
    handleInputChange,
    handlePublish,
    addDay,
    handleTotalDaysChange,
    goToNextDay,
    goToPreviousDay,
    goToDay,
    currentDayIndex,
    handleItineraryChange,
    agency,
    isPublished,
    isPublishing
  } = useAddPackage();

  const steps = [
    { id: 1, name: "Basic Info", icon: FileText },
    { id: 2, name: "Details", icon: Star },
    { id: 3, name: "Package details", icon: Camera },
    { id: 4, name: "Accomodation", icon: Eye },
    { id: 5, name: "Package", icon: Eye },
    { id: 6, name: "Activities", icon: Eye },
    // { id: 7, name: "Media", icon: Eye },
    { id: 7, name: "Review", icon: Eye },
  ];

  const nextStep = () => {
    if (currentStep < 8) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!agency) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-800">
            Complete Your Profile
          </h2>
          <p className="text-gray-600 mt-2">
            To create a travel package, please complete your agency profile first.
          </p>
          {/* <a
            href="/agency/edit"
            className="inline-block mt-6 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow hover:bg-indigo-700 transition"
          >
            Complete Profile
          </a> */}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Create New Package
          </h1>
          <p className="text-gray-600 mt-1">
            Create an amazing travel experience for your customers
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <StepProgress steps={steps} currentStep={currentStep} />
        </div>

        {/* Form Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
            <StepContent
              currentStep={currentStep}
              packageData={packageData}
              handleInputChange={handleInputChange}
              handleAddHighlight={handleAddHighlight}
              handleFileChange={handleFileChange}
              addDay={addDay}
              handleTotalDaysChange={handleTotalDaysChange}
              goToNextDay={goToNextDay}
              goToPrevDay={goToPreviousDay}
              goToday={goToDay}
              currentDayIndex={currentDayIndex}
              handleItineraryChange={handleItineraryChange}
            />

            <StepNavigation
              currentStep={currentStep}
              prevStep={prevStep}
              nextStep={nextStep}
              handlePublish={handlePublish}
              isPublished={isPublished}
              isPublishing = {isPublishing}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
