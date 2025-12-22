"use client";

import { Header } from "@/shared/components/layout/Header";
import { useUserProfile } from "../../hooks/use-userprofile";
import { UserProfileTabs } from "./tabs";
import { ProfileHeader } from "./profile-header";
import { ProfileCompletionCard } from "./Profile-completion-card";
import { useAuthStore } from "@/store/Auth";
import { withAuth } from "@/shared/components/HOC/withAuth";

const UserProfilePage: React.FC = () => {
  const {
    // userProfile,
    fileInputRef,
    avatarInputRef,
    handleBannerUpload,
    handleAvatarUpload,
    isEditingBanner,
    bannerUpload,
    setIsEditingBanner,
    // handleSaveBanner,
    setBannerUpload,
    isUploadingBanner,
    isUploadingAvatar
  } = useUserProfile();
  const { user } = useAuthStore()

  const isProfileIncomplete =
    !user?.location

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Header />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {isProfileIncomplete && <ProfileCompletionCard />}

        {/* Profile Header */}
        <ProfileHeader
          isEditingBanner={isEditingBanner}
          bannerUpload={bannerUpload}
          setIsEditingBanner={setIsEditingBanner}
          setBannerUpload={setBannerUpload}
          fileInputRef={fileInputRef}
          avatarInputRef={avatarInputRef}
          isUploadingBanner={isUploadingBanner}
          isUploadingAvatar={isUploadingAvatar}
        />
        <UserProfileTabs />

        {/* Hidden File Inputs */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleBannerUpload}
          className="hidden"
        />
        <input
          ref={avatarInputRef}
          type="file"
          accept="image/*"
          onChange={handleAvatarUpload}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default withAuth(UserProfilePage)
