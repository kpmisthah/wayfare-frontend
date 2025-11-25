import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";
import { Camera, ImageIcon, Save, Upload } from "lucide-react";
import { ProfileCard } from "./profile-info-card";
import { Prop } from "../../types/profile.type";
import { useAuthStore } from "@/store/Auth";
export const ProfileHeader:React.FC<Prop> = ({isEditingBanner,bannerUpload,setIsEditingBanner,setBannerUpload,fileInputRef,avatarInputRef}) => {
  const {user} = useAuthStore()
  console.log(user,'userProfile from header zustand');
    console.log(user?.profileImage,'userProfileImage from header');
    
  
  return (
    <div className="relative mb-6 sm:mb-8">
      {/* Cover Image */}
      <div className="relative h-48 sm:h-64 lg:h-80 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 rounded-2xl overflow-hidden group">
        {user?.bannerImage && (
          <img
            src={user.bannerImage}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        )}
        {isEditingBanner && bannerUpload && (
          <img
            src={bannerUpload}
            alt="Banner Preview"
            className="w-full h-full object-cover"
          />
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-white/10" />

        {/* Banner Edit Controls */}
        <div className="absolute top-4 right-4 flex gap-2">
          
            <Button
              onClick={() => setIsEditingBanner(true)}
              size="sm"
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
            >
              <Camera className="w-4 h-4 mr-2" />
              Edit Banner
            </Button>
          
        </div>

        {/* Upload Banner Interface */}
        {isEditingBanner && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="p-8 border-2 border-dashed border-white/50 rounded-xl mb-4">
                <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-75" />
                <p className="text-lg mb-2">Upload New Banner</p>
                <p className="text-sm opacity-75 mb-4">
                  Recommended: 1200x400px
                </p>
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Choose Image
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Profile Info Section */}
      <div className="relative -mt-20 px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end gap-6">
          {/* Avatar Section with Edit */}
          <div className="relative group mx-auto sm:mx-0">
            <Avatar className="w-32 h-32 border-4 border-white shadow-2xl ring-4 ring-blue-100">
              <AvatarImage
                src={user?.profileImage}
                // alt={userProfile?.name}
              />
              
              <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                {user?.name
                  ? user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                  : "U"}
              </AvatarFallback>
            </Avatar>

            {/* Avatar Edit Overlay */}
            <div
              className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
              onClick={() => avatarInputRef.current?.click()}
            >
              <Camera className="w-6 h-6 text-white" />
            </div>

            {/* Verification Badge */}
            {/* {userProfile.verified && (
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                )} */}
          </div>

          {/* Profile Info Card */}
          {/* ivide profile card */}
          <ProfileCard />
        </div>
      </div>
    </div>
  );
};
