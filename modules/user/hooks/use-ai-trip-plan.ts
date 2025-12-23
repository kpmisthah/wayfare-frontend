"use client";
import { useEffect, useState } from "react";
import { TravelItineraryProps, Travellers } from "../types/Ai-trip-plan.type";
import {
  fetchTrip,
  generateLongTrip,
  generateTrip,
} from "../services/generate-trip.ai.api";
import { useRouter } from "next/navigation";
import { fetchShortTripDetails } from "@/modules/agency/services/booking.api";
import { fetchTravellersData } from "../services/fetchTravellers.api";

export const useAiTripPlan = (id: string, destination: string) => {
  const [tripPlan, setTripPlan] = useState<TravelItineraryProps>({
    destination: "",
    duration: "",
    budget: "",
    travelerType: "",
    hotels: [],
    itinerary: [],
  });
  useEffect(() => {
    const loadTrip = async () => {
      const result = await fetchTrip(id, destination);
      setTripPlan(result);
    };
    loadTrip();
  }, [id]);

  return {
    tripPlan
  };
};

export const usefetchAiTripPlan = () => {
  const [shortTrip, setShortTrip] = useState<TravelItineraryProps[]>([]);
  useEffect(() => {
    const fetchShortTrip = async () => {
      try {
        const result = await fetchShortTripDetails();
        setShortTrip(result);
        return result;
      } catch (error) {
      }
    };
    fetchShortTrip();
  }, []);

  return {
    shortTrip
  }
}

export const useGenerateTrip = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();
  type FormData = {
    destination: string;
    travelers: number;
    budget: string;
    duration: string;
    travelWith: string;
    startDate: string;
    endDate: string;
    minBudget: number;
    maxBudget: number;
    visibleToOthers: boolean;
    preferences: {
      activities: string[];
      pace: string;
      interests: string[];
    };
  };
  const [formData, setFormData] = useState<FormData>({
    destination: "",
    travelers: 1,
    budget: "",
    duration: "",
    travelWith: "",
    startDate: "",
    endDate: "",
    minBudget: 0,
    maxBudget: 0,
    visibleToOthers: false,
    preferences: {
      activities: [],
      pace: "moderate",
      interests: [],
    },
  });

  useEffect(() => {
  }, []);

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handlePreferenceChange = (field: string, value: string | string[]) => {
    setFormData((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [field]: value,
      },
    }));
  };

  const toggleActivity = (activity: string) => {
    setFormData((prev) => {
      const currentActivities = prev.preferences.activities;
      const newActivities = currentActivities.includes(activity)
        ? currentActivities.filter((a) => a !== activity)
        : [...currentActivities, activity];
      return {
        ...prev,
        preferences: {
          ...prev.preferences,
          activities: newActivities,
        },
      };
    });
  };

  const toggleInterest = (interest: string) => {
    setFormData((prev) => {
      const currentInterests = prev.preferences.interests;
      const newInterests = currentInterests.includes(interest)
        ? currentInterests.filter((i) => i !== interest)
        : [...currentInterests, interest];
      return {
        ...prev,
        preferences: {
          ...prev.preferences,
          interests: newInterests,
        },
      };
    });
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Required field validations
    if (!formData.destination.trim()) {
      newErrors.destination = "Destination is required";
    }

    if (!formData.duration) {
      newErrors.duration = "Trip duration is required";
    } else {
      const duration = Number(formData.duration);
      if (duration < 1) {
        newErrors.duration = "Duration must be at least 1 day";
      } else if (duration > 5) {
        newErrors.duration = "Short trips are limited to 5 days maximum";
      }
    }

    if (!formData.budget) {
      newErrors.budget = "Budget range is required";
    }

    if (!formData.travelWith) {
      newErrors.travelWith = "Please select who you're traveling with";
    }

    if (!formData.startDate) {
      newErrors.startDate = "Start date is required";
    } else {
      const startDate = new Date(formData.startDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (startDate < today) {
        newErrors.startDate = "Start date cannot be in the past";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const checkDuplicateTrip = async (): Promise<boolean> => {
    try {
      // Fetch existing trips for the user
      const existingTrips = await fetchShortTripDetails();

      // Calculate end date based on start date and duration
      const startDate = new Date(formData.startDate);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + Number(formData.duration));

      // Check for overlapping trips to the same destination
      const duplicate = existingTrips.some((trip: TravelItineraryProps) => {
        if (trip.destination.toLowerCase() !== formData.destination.toLowerCase()) {
          return false;
        }

        // Parse existing trip dates (you may need to adjust based on your data structure)
        const existingStart = new Date(trip.startDate || "");
        const existingDuration = parseInt(trip.duration) || 0;
        const existingEnd = new Date(existingStart);
        existingEnd.setDate(existingEnd.getDate() + existingDuration);

        // Check for date overlap
        return (
          (startDate >= existingStart && startDate <= existingEnd) ||
          (endDate >= existingStart && endDate <= existingEnd) ||
          (startDate <= existingStart && endDate >= existingEnd)
        );
      });

      if (duplicate) {
        setErrors((prev) => ({
          ...prev,
          duplicate: "You already have a trip planned to this destination during these dates. Please choose different dates or destination.",
        }));
        return true;
      }

      return false;
    } catch (error) {
      console.error("Error checking duplicate trips:", error);
      return false;
    }
  };

  const generateShortTrip = async () => {
    // Validate form
    if (!validateForm()) {
      return;
    }

    // Check for duplicate trips
    const isDuplicate = await checkDuplicateTrip();
    if (isDuplicate) {
      return;
    }

    try {
      setLoading(true);
      setErrors({});

      const result = await generateTrip({
        destination: formData.destination,
        duration: formData.duration,
        travelerType: formData.travelWith,
        budget: formData.budget,
        startDate: formData.startDate,
        visiblity: formData.visibleToOthers,
        preferences: formData.preferences,
      });

      router.push(`/trip/${result.id}/${result.destination}`);
    } catch (error: any) {
      console.error("Error generating trip:", error);
      setErrors({
        submit: error?.response?.data?.message || "Failed to generate trip. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateTravel = async (data: {
    destination: string;
    startDate: string;
    endDate: string;
    minBudget: string | number;
    maxBudget: string | number;
    travelers: string | number;
    search?: string;
    vehicle?: string;
    durationFilter?: string;
    page?: number;
    limit?: number;
  }) => {
    try {
      setLoading(true);
      const result = await generateLongTrip({
        destination: data.destination,
        startDate: data.startDate,
        endDate: data.endDate,
        travelers: data.travelers,
        minBudget: data.minBudget,
        maxBudget: data.maxBudget,
        search: data.search,
        vehicle: data.vehicle,
        durationFilter: data.durationFilter,
        page: data.page,
        limit: data.limit,
      });
      return result;
    } catch (error) {
    }
  };
  const handleTravelersChange = (increment: boolean) => {
    const currentTravelers = formData.travelers || 1;
    const newValue = increment
      ? currentTravelers + 1
      : Math.max(1, currentTravelers - 1);
    handleInputChange("travelers", newValue);
  };

  const onSubmit = () => {
    setLoading(true);
    router.push(
      `/packages/travel-packages?destination=${formData.destination}&startDate=${formData.startDate}&endDate=${formData.endDate}&minBudget=${formData.minBudget}&maxBudget=${formData.maxBudget}&travelers=${formData.travelers}`
    );
  };
  const handleBookNow = (
    packageId: string,
    startDate: string | null,
    travelers: string | null
  ) => {
    router.push(
      `/booking/${packageId}?startDate=${startDate}&travelers=${travelers}`
    );
  };

  return {
    loading,
    formData,
    errors,
    generateShortTrip,
    handleInputChange,
    handleTravelersChange,
    handlePreferenceChange,
    toggleActivity,
    toggleInterest,
    generateTravel,
    onSubmit,
    handleBookNow,
  };
};

export const useFetchtravellers = (destination: string) => {
  const [travellersData, setTravellersData] = useState<Travellers[]>([])
  useEffect(() => {
    const fetchTravellers = async () => {
      const result = await fetchTravellersData(destination)
      setTravellersData(result)
    }
    fetchTravellers()
  }, [])
  useEffect(() => {
  }, [travellersData])
  return {
    travellersData
  }
}