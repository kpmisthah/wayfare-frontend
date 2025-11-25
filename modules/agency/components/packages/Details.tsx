import React, { useState, useEffect } from 'react';
import { Calendar, Info, Plus, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { RenderStepProps2 } from '../../types/agency.type';
import { Itinerary } from '../../types/package.type';

export const RenderStep2:React.FC<RenderStepProps2> = ({packageData,handleInputChange,addDay,handleTotalDaysChange,goToNextDay,goToPrevDay,goToday,currentDayIndex,handleItineraryChange}) => {
  // const removeDay = (dayIndex: number) => {
  //   if (packageData?.itinerary.length <= 1) return;
    
  //   const updatedItinerary = packageData?.itinerary.filter((_, index) => index !== dayIndex);
  //   Re-number the days
  //   const renumberedItinerary = updatedItinerary.map((day, index) => ({
  //     ...day,
  //     dayNumber: index + 1,
  //     dayTitle: day.dayTitle.includes('Day ') ? `Day ${index + 1}` : day.dayTitle
  //   }));
    
  //   setPackageData(prev => ({  
  //     ...prev,
  //     totalDays: prev.totalDays - 1,
  //     itinerary: renumberedItinerary
  //   }));
    
  //   Adjust current day index if necessary
  //   if (currentDayIndex >= renumberedItinerary.length) {
  //     setCurrentDayIndex(renumberedItinerary.length - 1);
  //   }
  // };

  const currentDay: Itinerary = packageData?.itinerary[currentDayIndex] ?? {
  day: currentDayIndex+1,
  activities: '',
  meals: '',
  accommodation: ''
};
   
  const daysWithActivities = packageData.itinerary.filter(day => day.activities.trim()).length;
  const daysWithAccommodation = packageData.itinerary.filter(day => day.accommodation.trim()).length;

  return (
    <div className="space-y-8 max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calendar className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          Day-wise Itinerary
        </h2>
        <p className="text-gray-600">
          Plan detailed activities for each day of the trip
        </p>
      </div>

      {/* Total Days Controller */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Total Days for Trip
        </label>
        <div className="flex items-center space-x-4">
          <input
            type="number"
            min="1"
            max="30"
            name='duration'
            value={packageData?.duration}
            onChange={(e) => handleTotalDaysChange(parseInt(e.target.value) || 1)}
            className="w-20 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <span className="text-gray-600">days</span>
        </div>
      </div>

      {/* Day Navigation */}
      {packageData?.itinerary.length! > 0 && (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Day Navigation</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={goToPrevDay}
                disabled={currentDayIndex === 0}
                className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={goToNextDay}
                disabled={currentDayIndex === packageData?.itinerary.length - 1}
                className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Day Pills */}
          <div className="flex flex-wrap gap-2">
            {packageData?.itinerary.map((day, index) => (
              <button
                key={index}
                onClick={() => goToday(index)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  index === currentDayIndex
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {/* Day {day.dayNumber} */}
                {day.day}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Current Day Editor */}
      {packageData?.itinerary.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200 relative">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">{currentDay.day}</span>
              </div>
              Day {currentDay.day}
            </h3>
            <div className="flex items-center space-x-2">
              {packageData?.itinerary.length > 1 && (
                <button
                  // onClick={() => removeDay(currentDayIndex)}
                  className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-all duration-200"
                  title="Remove Day"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Day Title
                </label>
                <input
                  type="text"
                  name='day'
                  value={currentDay.day|| ''}
                  onChange={(e)=>handleItineraryChange(e,currentDayIndex)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Arrival & Beach Exploration"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Activities & Timeline
                </label>
                <textarea
                  name='activities'
                  value={currentDay.activities|| ''}
                  onChange={(e)=>handleItineraryChange(e,currentDayIndex)}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="9:00 AM - Arrival and hotel check-in&#10;11:00 AM - Welcome breakfast and orientation&#10;1:00 PM - Beach walk and photography session&#10;3:00 PM - Water sports activities (jet ski, parasailing)&#10;6:00 PM - Sunset viewing and beach games"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Meals & Dining
                </label>
                <textarea
                  name='meals'
                  value={currentDay.meals || ''}
                  onChange={(e)=>handleItineraryChange(e,currentDayIndex)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="Breakfast: Hotel continental buffet&#10;Lunch: Beachside seafood restaurant&#10;Dinner: Traditional Goan cuisine at local taverna"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Accommodation & Rest
                </label>
                <textarea
                  name='accommodation'
                  value={currentDay.accommodation || ''}
                  onChange={(e)=>handleItineraryChange(e,currentDayIndex)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="Beach Resort Goa - Deluxe Room with sea view&#10;Free WiFi, AC, mini-bar, balcony&#10;Pool access, spa services available"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Another Day Button */}
      {/* <button
        onClick={addDay}
        className="w-full py-4 border-2 border-dashed border-blue-300 rounded-xl text-blue-600 hover:border-blue-500 hover:text-blue-700 hover:bg-blue-50 transition-all duration-200 flex items-center justify-center group"
      >
        <Plus className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
        Add Another Day
      </button> */}

      {/* Itinerary Summary */}
      {packageData?.itinerary.length > 0 && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
          <div className="flex items-center mb-3">
            <Info className="w-5 h-5 text-green-600 mr-2" />
            <h4 className="font-semibold text-green-800">Itinerary Summary</h4>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-green-600">
                {packageData?.itinerary.length}
              </p>
              <p className="text-sm text-green-700">Total Days</p>
            </div>
            <div>
               <p className="text-2xl font-bold text-blue-600">{daysWithActivities}</p> <p className="text-2xl font-bold text-blue-600"></p>
              <p className="text-sm text-blue-700">Days with Activities</p>
            </div>
            <div>
               <p className="text-2xl font-bold text-purple-600">{daysWithAccommodation}</p> 
              <p className="text-sm text-purple-700">Accommodation Days</p>
            </div>
          </div>
        </div>
      )}

      {/* Debug Info (Remove in production) */}
      <div className="bg-gray-50 p-4 rounded-lg text-sm">
        <p><strong>Current Day:</strong> {currentDayIndex + 1} of {packageData.itinerary.length}</p>
        <p><strong>Total Days:</strong> {packageData.duration}</p>
      </div>
    </div>
  );
};
