"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";
import { Camera, ImageIcon, X, Upload, Loader2, Check } from "lucide-react";
import { ProfileCard } from "./profile-info-card";
import { Prop } from "../../types/profile.type";
import { useAuthStore } from "@/store/Auth";

interface ProfileHeaderProps extends Prop {
  isUploadingBanner?: boolean;
  isUploadingAvatar?: boolean;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  isEditingBanner,
  bannerUpload,
  setIsEditingBanner,
  setBannerUpload,
  fileInputRef,
  avatarInputRef,
  isUploadingBanner = false,
  isUploadingAvatar = false,
}) => {
  const { user } = useAuthStore();

  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="relative mb-6 sm:mb-8">
      {/* Cover Image */}
      <div className="relative h-48 sm:h-64 lg:h-80 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 rounded-2xl overflow-hidden group">
        {/* Existing Banner Image */}
        {user?.bannerImage && !isEditingBanner && (
          <img
            src={user.bannerImage}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        )}

        {/* Banner Preview during editing */}
        {isEditingBanner && bannerUpload && (
          <img
            src={bannerUpload}
            alt="Banner Preview"
            className="w-full h-full object-cover"
          />
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-white/10" />

        {/* Banner Loading Overlay */}
        {isUploadingBanner && (
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center z-10">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin" />
              <Upload className="w-6 h-6 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <p className="text-white mt-4 font-medium">Uploading banner...</p>
            <p className="text-white/70 text-sm mt-1">Please wait</p>
          </div>
        )}

        {/* Banner Edit Controls - Only show when not uploading */}
        {!isUploadingBanner && (
          <div className="absolute top-4 right-4 flex gap-2">
            {isEditingBanner ? (
              <Button
                onClick={() => {
                  setIsEditingBanner(false);
                  setBannerUpload("");
                }}
                size="sm"
                variant="destructive"
                className="shadow-lg"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            ) : (
              <Button
                onClick={() => setIsEditingBanner(true)}
                size="sm"
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
              >
                <Camera className="w-4 h-4 mr-2" />
                {user?.bannerImage ? "Change Banner" : "Add Banner"}
              </Button>
            )}
          </div>
        )}

        {/* Upload Banner Interface */}
        {isEditingBanner && !isUploadingBanner && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
            <div className="text-center text-white max-w-md mx-4">
              <div
                className="p-8 border-2 border-dashed border-white/50 rounded-2xl mb-4 hover:border-white/80 hover:bg-white/5 transition-all duration-300 cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                  <ImageIcon className="w-8 h-8 text-white" />
                </div>
                <p className="text-xl font-semibold mb-2">Upload Cover Photo</p>
                <p className="text-sm text-white/70 mb-4">
                  Recommended size: 1200 × 400 pixels
                </p>
                <p className="text-xs text-white/50 mb-4">
                  Supports: JPG, PNG, WEBP (Max 5MB)
                </p>
                <Button
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
            {/* Avatar Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-sm opacity-60" />

            <Avatar className="relative w-32 h-32 border-4 border-white shadow-2xl ring-4 ring-blue-100/50">
              <AvatarImage
                src={user?.profileImage}
                className="object-cover"
              />
              <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                {getInitials(user?.name)}
              </AvatarFallback>
            </Avatar>

            {/* Avatar Loading Overlay */}
            {isUploadingAvatar && (
              <div className="absolute inset-0 bg-black/70 rounded-full flex flex-col items-center justify-center">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
              </div>
            )}

            {/* Avatar Edit Overlay - Only show when not uploading */}
            {!isUploadingAvatar && (
              <div
                className="absolute inset-0 bg-black/50 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
                onClick={() => avatarInputRef.current?.click()}
              >
                <Camera className="w-6 h-6 text-white mb-1" />
                <span className="text-white text-xs font-medium">Change</span>
              </div>
            )}

            {/* Success indicator after upload */}
            {user?.profileImage && !isUploadingAvatar && (
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}
          </div>

          {/* Profile Info Card */}
          <ProfileCard />
        </div>
      </div>
    </div>
  );
};

