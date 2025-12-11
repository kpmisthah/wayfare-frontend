"use client";

import { useEffect, useState } from "react";
import { AgencyProfile } from "../types/agency.type";
import { createAgency, fetchAgency, updateAgencyProfile } from "../services/agency.api";

export const useAgencyProfile = () => {
  const [profileExists, setProfileExists] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<Partial<AgencyProfile>>();
  useEffect(() => {
    const setBasicDetails = async () => {
      try {
        const result = await fetchAgency();
        console.log(result, 'fetched agency profile');
        setProfileData(result);
        if (result && result.licenseNumber) {
          setProfileExists(true);
        }
      } catch (error) {
        console.error("Failed to fetch agency profile", error);
      }
    };
    setBasicDetails();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateProfile = async () => {
    // Here you would make API call to create agency profile
    const agency = await createAgency({
      description: profileData?.description ?? null,
      specialization: profileData?.specialization ?? [],
      address: profileData?.address ?? '',
      licenseNumber: profileData?.licenseNumber ?? '',
      ownerName: profileData?.ownerName ?? '',
      websiteUrl: profileData?.websiteUrl ?? ''
    })
    console.log(agency, 'agency in create profile');
    setProfileData(agency)
    setProfileExists(true);
    setIsCreating(false);
  };

  const handleEditProfile = () => {

    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    // Here you would make API call to update agency profile
    if (profileData) {
      const updateProfile = await updateAgencyProfile(profileData)
      setProfileData(updateProfile);
      setProfileExists(true)
    }

    setIsEditing(false);

  };

  const handleCancel = () => {
    setIsCreating(false);
    setIsEditing(false);
  };
  return {
    profileData,
    setProfileData,
    profileExists,
    setProfileExists,
    isCreating,
    setIsCreating,
    isEditing,
    setIsEditing,
    handleInputChange,
    handleCreateProfile,
    handleEditProfile,
    handleSaveEdit,
    handleCancel,
  };
};
