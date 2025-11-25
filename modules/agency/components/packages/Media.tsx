// import { Activity, Bed, Camera, CameraIcon, Coffee, Hotel, Sunset, TreePine, Upload, Utensils, Waves,Image, Info } from "lucide-react";
// import { RenderStepProps } from "../../types/agency.type";

//   export const RenderStep7:React.FC<RenderStepProps> = ({handleFileChange}) => (
//     <div className="space-y-8">
//       <div className="text-center mb-8">
//         <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
//           <Camera className="w-8 h-8 text-white" />
//         </div>
//         <h2 className="text-2xl font-bold text-gray-900">Package Gallery</h2>
//         <p className="text-gray-600">
//           Upload stunning photos to showcase your package
//         </p>
//       </div>

//       <div className="space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Main Package Photos */}
//           <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-gradient-to-br from-gray-50 to-blue-50 hover:border-blue-400 transition-all duration-200">
//             <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Upload className="w-8 h-8 text-white" />
//             </div>
//             <p className="text-gray-700 mb-2 font-medium">
//               Main Package Photos
//             </p>
//             <p className="text-sm text-gray-500 mb-4">
//               Destination highlights, landscapes, attractions
//             </p>
//             <input
//               type="file"
//               multiple
//               accept="image/*"
//               className="hidden"
//               id="main-photos"
//               // onChange={(e) => handlePhotoUpload('main', e)}
//             />
//             <label
//               htmlFor="main-photos"
//               className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 cursor-pointer transition-all duration-200 shadow-lg hover:shadow-xl"
//             >
//               <CameraIcon className="w-5 h-5 mr-2" />
//               Upload Main Photos
//             </label>
//             {/* {uploadedPhotos.main.length > 0 && ( */}
//             <div className="mt-4">
//               {/* <p className="text-sm text-green-600 mb-2">{uploadedPhotos.main.length} photos uploaded</p> */}
//               <p className="text-sm text-green-600 mb-2">0 photos uploaded</p>
//               <div className="flex flex-wrap gap-2">
//                 {/* {uploadedPhotos.main.map((photo, index) => (
//                     <div key={index} className="relative">
//                       <img src={photo.url} alt={photo.name} className="w-16 h-16 object-cover rounded-lg" />
//                       <button
//                         onClick={() => removePhoto('main', index)}
//                         className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
//                       >
//                         <X className="w-3 h-3" />
//                       </button>
//                     </div>
//                   ))} */}
//               </div>
//             </div>
//             {/* )} */}
//           </div>

//           {/* Accommodation Photos */}
//           <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-gradient-to-br from-green-50 to-teal-50 hover:border-green-400 transition-all duration-200">
//             <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Hotel className="w-8 h-8 text-white" />
//             </div>
//             <p className="text-gray-700 mb-2 font-medium">
//               Accommodation Photos
//             </p>
//             <p className="text-sm text-gray-500 mb-4">
//               Hotels, rooms, amenities, dining areas
//             </p>
//             <input
//               type="file"
//               multiple
//               accept="image/*"
//               className="hidden"
//               id="accommodation-photos"
//               onChange={(e) => handleFileChange}
//             />
//             <label
//               htmlFor="accommodation-photos"
//               className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-xl hover:from-green-600 hover:to-teal-700 cursor-pointer transition-all duration-200 shadow-lg hover:shadow-xl"
//             >
//               <Bed className="w-5 h-5 mr-2" />
//               Upload Stay Photos
//             </label>
//             {/* {uploadedPhotos.accommodation.length > 0 && ( */}
//             <div className="mt-4">
//               {/* <p className="text-sm text-green-600 mb-2">{uploadedPhotos.accommodation.length} photos uploaded</p> */}
//               <p className="text-sm text-green-600 mb-2">photos uploaded</p>
//               {/* <div className="flex flex-wrap gap-2">
//                   {uploadedPhotos.accommodation.map((photo, index) => (
//                     <div key={index} className="relative">
//                       <img src={photo.url} alt={photo.name} className="w-16 h-16 object-cover rounded-lg" />
//                       <button
//                         onClick={() => removePhoto('accommodation', index)}
//                         className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
//                       >
//                         <X className="w-3 h-3" />
//                       </button>
//                     </div>
//                   ))}
//                 </div> */}
//             </div>
//             {/* )} */}
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {/* Food Photos */}
//           <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center bg-gradient-to-br from-orange-50 to-red-50 hover:border-orange-400 transition-all duration-200">
//             <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
//               <Utensils className="w-6 h-6 text-white" />
//             </div>
//             <p className="text-gray-700 mb-2 font-medium">Food & Dining</p>
//             <p className="text-sm text-gray-500 mb-3">
//               Local cuisine, restaurants, meals
//             </p>
//             <input
//               type="file"
//               multiple
//               accept="image/*"
//               className="hidden"
//               id="food-photos"
//               onChange={(e) => handleFileChange}
//             />
//             <label
//               htmlFor="food-photos"
//               className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 cursor-pointer transition-all duration-200 text-sm"
//             >
//               <Coffee className="w-4 h-4 mr-1" />
//               Upload
//             </label>
//             {/* {uploadedPhotos.food.length > 0 && ( */}
//             <div className="mt-3">
//               {/* <p className="text-xs text-green-600">{uploadedPhotos.food.length} photos</p> */}
//               <p className="text-xs text-green-600">photos</p>
//             </div>
//             {/* )} */}
//           </div>

//           {/* Activity Photos */}
//           <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center bg-gradient-to-br from-purple-50 to-pink-50 hover:border-purple-400 transition-all duration-200">
//             <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-3">
//               <Activity className="w-6 h-6 text-white" />
//             </div>
//             <p className="text-gray-700 mb-2 font-medium">Activities</p>
//             <p className="text-sm text-gray-500 mb-3">
//               Adventures, experiences, sports
//             </p>
//             <input
//               type="file"
//               multiple
//               accept="image/*"
//               className="hidden"
//               id="activity-photos"
//               onChange={(e) => handleFileChange}
//             />
//             <label
//               htmlFor="activity-photos"
//               className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 cursor-pointer transition-all duration-200 text-sm"
//             >
//               <Waves className="w-4 h-4 mr-1" />
//               Upload
//             </label>
//             {/* {uploadedPhotos.activities.length > 0 && ( */}
//             <div className="mt-3">
//               <p className="text-xs text-green-600">photos</p>
//             </div>
//             {/* )} */}
//           </div>

//           {/* Scenic Photos */}
//           <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center bg-gradient-to-br from-yellow-50 to-orange-50 hover:border-yellow-400 transition-all duration-200">
//             <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
//               <Sunset className="w-6 h-6 text-white" />
//             </div>
//             <p className="text-gray-700 mb-2 font-medium">Scenic Views</p>
//             <p className="text-sm text-gray-500 mb-3">
//               Sunsets, landscapes, nature
//             </p>
//             <input
//               type="file"
//               multiple
//               accept="image/*"
//               className="hidden"
//               id="scenic-photos"
//               onChange={(e) => handleFileChange}
//             />
//             <label
//               htmlFor="scenic-photos"
//               className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-lg hover:from-yellow-600 hover:to-orange-700 cursor-pointer transition-all duration-200 text-sm"
//             >
//               <TreePine className="w-4 h-4 mr-1" />
//               Upload
//             </label>
//             {/* {uploadedPhotos.scenic.length > 0 && ( */}
//             <div className="mt-3">
//               <p className="text-xs text-green-600">0 photos</p>
//             </div>
//             {/* )} */}
//           </div>
//         </div>

//         {/* Photo Gallery Preview */}
//         {/* {Object.values(uploadedPhotos).some(category => category.length > 0) && ( */}
//         <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg">
//           <h4 className="font-bold text-gray-900 mb-4 flex items-center">
//             <Image className="w-5 h-5 mr-2" />
//             Photo Gallery Preview
//           </h4>
//           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
//             {/* {Object.entries().map(([category, photos]) =>
//                 photos.map((photo, index) => (
//                   <div key={`${category}-${index}`} className="relative group">
//                     <img
//                       src={photo.url}
//                       alt={photo.name}
//                       className="w-full h-24 object-cover rounded-lg"
//                     />
//                     <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
//                       <button
//                         onClick={() => removePhoto(category, index)}
//                         className="text-white hover:text-red-400 transition-colors duration-200"
//                       >
//                         <Trash2 className="w-5 h-5" />
//                       </button>
//                     </div>
//                     <div className="absolute top-1 right-1">
//                       <span className="bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
//                         {category}
//                       </span>
//                     </div>
//                   </div>
//                 ))
//               )} */}
//           </div>
//           {/* <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
//               <span>Total Photos: {Object.values(uploadedPhotos).reduce((sum, category) => sum + category.length, 0)}</span>
//               <span>
//                 Size: {Object.values(uploadedPhotos)
//                   .flat()
//                   .reduce((sum, photo) => sum + parseFloat(photo.size), 0)
//                   .toFixed(1)} MB
//               </span>
//             </div> */}
//         </div>
//         {/* )} */}

//         {/* Photo Guidelines */}
//         <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
//           <h4 className="font-bold text-blue-800 mb-3 flex items-center">
//             <Info className="w-5 h-5 mr-2" />
//             Photo Upload Guidelines
//           </h4>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-blue-700">
//             <div>
//               <h5 className="font-semibold mb-2">Technical Requirements:</h5>
//               <ul className="space-y-1">
//                 <li>• High resolution images (minimum 1920x1080)</li>
//                 <li>• JPG, PNG, WebP formats accepted</li>
//                 <li>• Maximum 10MB per image</li>
//                 <li>• Minimum 5 photos required for publishing</li>
//                 <li>• Optimal aspect ratio: 16:9 or 4:3</li>
//               </ul>
//             </div>
//             <div>
//               <h5 className="font-semibold mb-2">Content Guidelines:</h5>
//               <ul className="space-y-1">
//                 <li>• Showcase main attractions and highlights</li>
//                 <li>• Include accommodation interiors and amenities</li>
//                 <li>• Capture local culture, food, and experiences</li>
//                 <li>• Avoid blurry, dark, or low-quality images</li>
//                 <li>
//                   • Ensure photos are recent and represent current offerings
//                 </li>
//               </ul>
//             </div>
//           </div>
//           <div className="mt-4 p-4 bg-blue-100 rounded-lg">
//             <p className="text-blue-800 text-sm">
//               <strong>Tip:</strong> Upload photos in order of importance. The
//               first photo in each category will be used as the primary image for
//               that section.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );