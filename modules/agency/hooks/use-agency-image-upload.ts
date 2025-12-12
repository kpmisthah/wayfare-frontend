"use client";
import { useRef, useState } from "react";
import { uploadUserProfileImage } from "@/modules/user/services/userProfile.api";
import { useAuthStore } from "@/store/Auth";

export const useAgencyImageUpload = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const avatarInputRef = useRef<HTMLInputElement>(null);
    const [isUploadingBanner, setIsUploadingBanner] = useState(false);
    const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
    const { setUpdateUser } = useAuthStore();

    const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        try {
            setIsUploadingBanner(true);
            const { imageUrl } = await uploadUserProfileImage(file, "banner");
            setUpdateUser({ bannerImage: imageUrl });
        } catch (error) {
            console.error("Error uploading banner:", error);
        } finally {
            setIsUploadingBanner(false);
        }
    };

    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setIsUploadingAvatar(true);
            const { imageUrl } = await uploadUserProfileImage(file, "profile");
            setUpdateUser({ profileImage: imageUrl });
        } catch (error) {
            console.error("Error uploading avatar:", error);
        } finally {
            setIsUploadingAvatar(false);
        }
    };

    return {
        fileInputRef,
        avatarInputRef,
        handleBannerUpload,
        handleAvatarUpload,
        isUploadingAvatar,
        isUploadingBanner,
    };
};
