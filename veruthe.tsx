// import React, { useState } from 'react';
// import { MapPin, Edit3, Check, X } from 'lucide-react';

// const Card = ({ children, className = "" }) => (
//   <div className={`bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden ${className}`}>
//     {children}
//   </div>
// );

// const CardHeader = ({ children, className = "" }) => (
//   <div className={`px-6 py-5 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100 ${className}`}>
//     {children}
//   </div>
// );

// const CardTitle = ({ children, className = "" }) => (
//   <h3 className={`text-xl font-bold text-gray-800 flex items-center gap-2 ${className}`}>
//     <MapPin className="h-5 w-5 text-blue-600" />
//     {children}
//   </h3>
// );

// const CardContent = ({ children, className = "" }) => (
//   <div className={`p-6 ${className}`}>
//     {children}
//   </div>
// );

// const Badge = ({ children, variant = "outline", className = "", onClick, ...props }) => {
//   const baseClasses = "inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
//   const variantClasses = {
//     default: "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md hover:shadow-lg hover:from-blue-600 hover:to-indigo-700 focus:ring-blue-500",
//     outline: "bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 focus:ring-blue-500 shadow-sm"
//   };
  
//   return (
//     <span 
//       className={`${baseClasses} ${variantClasses[variant]} ${className}`}
//       onClick={onClick}
//       {...props}
//     >
//       {children}
//     </span>
//   );
// };

// const TravelPreferencesCard = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [userProfile, setUserProfile] = useState({
//     preferences: ['Adventure', 'Beach', 'Cultural Sites', 'Fine Dining']
//   });

//   const availablePreferences = [
//     'Adventure', 'Beach', 'Cultural Sites', 'Fine Dining', 'Nightlife',
//     'Shopping', 'Nature', 'Photography', 'History', 'Art & Museums',
//     'Local Cuisine', 'Wellness', 'Family Friendly', 'Budget Travel',
//     'Luxury', 'Backpacking', 'City Breaks', 'Road Trips'
//   ];

//   const handlePreferenceToggle = (preference) => {
//     setUserProfile(prev => ({
//       ...prev,
//       preferences: prev.preferences.includes(preference)
//         ? prev.preferences.filter(p => p !== preference)
//         : [...prev.preferences, preference]
//     }));
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-4 bg-gray-50 min-h-screen">
//       <div className="space-y-6">
//         <Card className="hover:shadow-xl transition-shadow duration-300">
//           <CardHeader>
//             <div className="flex items-center justify-between">
//               <CardTitle>Travel Preferences</CardTitle>
//               <button
//                 onClick={() => setIsEditing(!isEditing)}
//                 className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
//                   isEditing 
//                     ? 'bg-green-100 text-green-700 hover:bg-green-200' 
//                     : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
//                 }`}
//               >
//                 {isEditing ? (
//                   <>
//                     <Check className="h-4 w-4" />
//                     Save
//                   </>
//                 ) : (
//                   <>
//                     <Edit3 className="h-4 w-4" />
//                     Edit
//                   </>
//                 )}
//               </button>
//             </div>
//             {isEditing && (
//               <p className="text-sm text-gray-600 mt-2 flex items-center gap-1">
//                 <span className="inline-block w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
//                 Click on preferences to add or remove them from your profile
//               </p>
//             )}
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               <div className="flex items-center justify-between">
//                 <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
//                   Your Selected Preferences ({userProfile.preferences.length})
//                 </h4>
//                 {!isEditing && (
//                   <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
//                     {userProfile.preferences.length > 5 ? 'Diverse traveler' : 'Focused preferences'}
//                   </span>
//                 )}
//               </div>
              
//               <div className="flex flex-wrap gap-3">
//                 {availablePreferences.map((preference) => {
//                   const isSelected = userProfile.preferences.includes(preference);
//                   return (
//                     <Badge
//                       key={preference}
//                       variant={isSelected ? "default" : "outline"}
//                       className={`cursor-pointer select-none ${
//                         isEditing 
//                           ? 'hover:scale-110 active:scale-95' 
//                           : isSelected 
//                             ? 'opacity-100' 
//                             : 'opacity-60 hover:opacity-80'
//                       } ${
//                         isSelected && !isEditing 
//                           ? 'ring-2 ring-blue-200 ring-offset-2' 
//                           : ''
//                       }`}
//                       onClick={() => isEditing && handlePreferenceToggle(preference)}
//                     >
//                       {preference}
//                       {isSelected && !isEditing && (
//                         <Check className="ml-1 h-3 w-3" />
//                       )}
//                     </Badge>
//                   );
//                 })}
//               </div>
              
//               {userProfile.preferences.length === 0 && (
//                 <div className="text-center py-8 text-gray-500">
//                   <MapPin className="h-12 w-12 mx-auto mb-3 opacity-30" />
//                   <p className="text-lg font-medium">No preferences selected</p>
//                   <p className="text-sm">Click "Edit" to choose your travel preferences</p>
//                 </div>
//               )}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default TravelPreferencesCard;
