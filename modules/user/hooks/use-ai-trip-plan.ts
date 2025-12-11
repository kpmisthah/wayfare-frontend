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
        console.log(result, 'of fetchShrotTrippppp');
        setShortTrip(result);
        return result;
      } catch (error) {
        console.log(error);
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
    visibleToOthers: boolean
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
    visibleToOthers: false
  });
  useEffect(() => {
    console.log(formData, "fromDate");
  }, []);
  const handleInputChange = (field: string, value: string | number | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const generateShortTrip = async () => {
    if (Number(formData.duration) > 5) {
      alert("Please plan trip for less than 5 days");
    }
    console.log(formData);
    try {
      setLoading(true);
      let result = await generateTrip({
        destination: formData.destination,
        duration: formData.duration,
        travelerType: formData.travelWith,
        budget: formData.budget,
        startDate: formData.startDate,
        visiblity: formData.visibleToOthers
      });
      console.log(result, "result after ai model geenrate itineraries");
      router.push(`/trip/${result.id}/${result.destination}`);
    } catch (error) {
      console.log(error);
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
      console.log(error);
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
    generateShortTrip,
    handleInputChange,
    handleTravelersChange,
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
      console.log(result, 'result from fethcingTravelllerres')
      setTravellersData(result)
    }
    fetchTravellers()
  }, [])
  useEffect(() => {
    console.log(travellersData, 'travellrssssDataa');
  }, [travellersData])
  return {
    travellersData
  }
}