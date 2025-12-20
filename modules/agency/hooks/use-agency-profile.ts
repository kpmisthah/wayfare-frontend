"use client";

import { useEffect, useState } from "react";
import { AgencyProfile } from "../types/agency.type";
import { createAgency, fetchAgency, updateAgencyProfile } from "../services/agency.api";
import { toast } from "sonner";

interface ValidationErrors {
  ownerName?: string;
  licenseNumber?: string;
  address?: string;
  description?: string;
  websiteUrl?: string;
}

export const useAgencyProfile = () => {
  const [profileExists, setProfileExists] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [profileData, setProfileData] = useState<Partial<AgencyProfile>>();
  const [errors, setErrors] = useState<ValidationErrors>({});

  useEffect(() => {
    const setBasicDetails = async () => {
      setIsLoadingProfile(true);
      try {
        const result = await fetchAgency();
        console.log(result, 'fetched agency profile');
        setProfileData(result);
        if (result && result.licenseNumber) {
          setProfileExists(true);
        }
      } catch (error) {
        console.error("Failed to fetch agency profile", error);
      } finally {
        setIsLoadingProfile(false);
      }
    };
    setBasicDetails();
  }, []);

  const validateField = (name: string, value: string | undefined): string | undefined => {
    const trimmedValue = value?.trim() || '';

    switch (name) {
      case 'ownerName':
        if (!trimmedValue) return 'Owner name is required';
        if (trimmedValue.length < 2) return 'Owner name must be at least 2 characters';
        if (trimmedValue.length > 100) return 'Owner name must be less than 100 characters';
        if (!/^[a-zA-Z\s.'-]+$/.test(trimmedValue)) return 'Owner name can only contain letters, spaces, and basic punctuation';
        break;
      case 'licenseNumber':
        if (!trimmedValue) return 'License number is required';
        if (trimmedValue.length < 3) return 'License number must be at least 3 characters';
        if (trimmedValue.length > 50) return 'License number must be less than 50 characters';
        break;
      case 'address':
        if (!trimmedValue) return 'Address is required';
        if (trimmedValue.length < 10) return 'Address must be at least 10 characters';
        if (trimmedValue.length > 500) return 'Address must be less than 500 characters';
        break;
      case 'description':
        if (!trimmedValue) return 'Description is required';
        if (trimmedValue.length < 20) return 'Description must be at least 20 characters';
        if (trimmedValue.length > 2000) return 'Description must be less than 2000 characters';
        break;
      case 'websiteUrl':
        if (trimmedValue && !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/.test(trimmedValue)) {
          return 'Please enter a valid website URL';
        }
        break;
    }
    return undefined;
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    newErrors.ownerName = validateField('ownerName', profileData?.ownerName);
    newErrors.licenseNumber = validateField('licenseNumber', profileData?.licenseNumber);
    newErrors.address = validateField('address', profileData?.address);
    newErrors.description = validateField('description', profileData?.description);
    newErrors.websiteUrl = validateField('websiteUrl', profileData?.websiteUrl);

    // Remove undefined errors
    Object.keys(newErrors).forEach(key => {
      if (newErrors[key as keyof ValidationErrors] === undefined) {
        delete newErrors[key as keyof ValidationErrors];
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof ValidationErrors]) {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const handleCreateProfile = async () => {
    // Validate form before submitting
    if (!validateForm()) {
      toast.error('Please fix the errors before submitting');
      return;
    }

    setIsSubmitting(true);
    try {
      const agency = await createAgency({
        description: profileData?.description ?? null,
        specialization: profileData?.specialization ?? [],
        address: profileData?.address ?? '',
        licenseNumber: profileData?.licenseNumber ?? '',
        ownerName: profileData?.ownerName ?? '',
        websiteUrl: profileData?.websiteUrl ?? ''
      });
      console.log(agency, 'agency in create profile');
      setProfileData(agency);
      setProfileExists(true);
      setIsCreating(false);
      setErrors({});
      toast.success('Agency profile created successfully!');
    } catch (error) {
      console.error("Failed to create agency profile", error);
      toast.error('Failed to create agency profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditProfile = () => {
    setErrors({});
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    // Validate form before submitting
    if (!validateForm()) {
      toast.error('Please fix the errors before saving');
      return;
    }

    setIsSubmitting(true);
    try {
      if (profileData) {
        const updateProfile = await updateAgencyProfile(profileData);
        setProfileData(updateProfile);
        setProfileExists(true);
        setErrors({});
        toast.success('Agency profile updated successfully!');
      }
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update agency profile", error);
      toast.error('Failed to update agency profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setIsCreating(false);
    setIsEditing(false);
    setErrors({});
  };

  const clearFieldError = (fieldName: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[fieldName as keyof ValidationErrors];
      return newErrors;
    });
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
    isSubmitting,
    isLoadingProfile,
    errors,
    handleInputChange,
    handleCreateProfile,
    handleEditProfile,
    handleSaveEdit,
    handleCancel,
    clearFieldError,
  };
};
